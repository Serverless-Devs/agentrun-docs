---
sidebar_position: 2
---

# 快速开始

这是一个端到端的实践指南，将带您在 15 分钟内完成一个智能体的开发和部署。我们会使用 LangChain 框架构建一个支持代码执行能力的对话智能体，并将其部署到 AgentRun 云平台供业务系统调用。

## 前置准备

在开始之前，请确保您的开发环境满足以下要求。首先需要安装 Serverless Devs 工具，这是 AgentRun 使用的项目脚手架和部署工具。如果您的本地环境已经安装了 NodeJS，可以通过 npm 快速完成安装：

```bash
npm install -g @serverless-devs/s
```

如果您不希望安装 NodeJS 环境，也可以直接下载 [Serverless Devs 二进制程序](https://github.com/Serverless-Devs/Serverless-Devs/releases)使用。安装完成后，执行 `s --version` 验证安装是否成功。

另外，请确认您的 Python 版本在 3.10 或以上，这是 AgentRun SDK 的运行要求。可以通过 `python --version` 查看当前版本。

## 创建项目

使用 Serverless Devs 的初始化命令创建一个基于 LangChain 的智能体项目。执行以下命令并按照提示完成项目创建：

```bash
s init agentrun-quick-start-langchain
```

命令执行后会在当前目录生成 `agentrun-quick-start-langchain` 文件夹，这是一个完整的 Agent 项目模板。进入代码目录并安装依赖：

```bash
cd agentrun-quick-start-langchain/code
uv venv && uv pip install -r requirements.txt
```

项目使用 uv 作为 Python 包管理器以提供更快的依赖安装速度。如果您更习惯使用 pip，可以替换为 `python -m venv .venv && pip install -r requirements.txt`。

## 配置认证信息

AgentRun SDK 需要您的阿里云账号凭证来访问云端资源。推荐通过环境变量的方式配置认证信息，这样可以避免在代码中硬编码敏感信息。在项目根目录创建 `.env` 文件：

```bash
AGENTRUN_ACCESS_KEY_ID=your-access-key-id
AGENTRUN_ACCESS_KEY_SECRET=your-access-key-secret
AGENTRUN_ACCOUNT_ID=your-account-id
AGENTRUN_REGION=cn-hangzhou
```

将上述配置项中的值替换为您的真实凭证。其中 `AGENTRUN_ACCESS_KEY_ID` 和 `AGENTRUN_ACCESS_KEY_SECRET` 可以在阿里云控制台的 [AccessKey 管理页面](https://ram.console.aliyun.com/manage/ak)获取，`AGENTRUN_ACCOUNT_ID` 是您的阿里云主账号 ID。

配置完成后，AgentRun SDK 会在初始化时自动读取这些环境变量。如果您希望通过代码显式配置，也可以使用 Config 对象：

```python
from agentrun.utils.config import Config

config = Config(
    access_key_id="your-access-key-id",
    access_key_secret="your-access-key-secret",
    account_id="your-account-id",
    region_id="cn-hangzhou"
)
```

## 理解 Agent 代码结构

打开项目中的 `index.py` 文件，这是智能体的核心实现。代码主要分为三个部分：资源初始化、智能体逻辑和服务启动。

首先是资源初始化部分，这里通过 AgentRun 的集成模块获取 LangChain 可用的模型和工具：

```python
from agentrun.integration.langchain import model, sandbox_toolset
from agentrun.sandbox import TemplateType

# 指定要使用的模型名称（需要提前在控制台创建）
MODEL_NAME = "your-model-name"
# 指定沙箱模板名称（用于执行代码）
SANDBOX_NAME = "your-sandbox-name"

# 获取 LangChain 格式的模型客户端
llm = model(MODEL_NAME)

# 获取代码执行沙箱工具
code_interpreter_tools = sandbox_toolset(
    template_name=SANDBOX_NAME,
    template_type=TemplateType.CODE_INTERPRETER,
    sandbox_idle_timeout_seconds=300
)
```

这段代码展示了 AgentRun 的核心能力之一：通过简单的函数调用将云端资源转换为框架原生对象。`model()` 函数返回的是标准的 LangChain `BaseChatModel` 对象，`sandbox_toolset()` 返回的是 LangChain 工具列表，这意味着您可以无缝使用 LangChain 生态中的任何组件。

接下来是智能体逻辑的实现。项目模板中使用 LangChain 的 Agent 框架构建了一个支持函数调用的对话智能体：

```python
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate

# 定义智能体的系统提示词
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个智能助手，可以帮助用户执行代码。"),
    ("placeholder", "{chat_history}"),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}")
])

# 创建智能体
agent = create_tool_calling_agent(llm, code_interpreter_tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=code_interpreter_tools)

# 定义调用入口函数
def invoke_agent(request: AgentRequest):
    """接收 HTTP 请求并返回智能体响应"""
    user_input = request.messages[-1].content
    result = agent_executor.invoke({"input": user_input})
    return result["output"]
```

这里的 `invoke_agent` 函数是智能体的统一入口，它接收一个 `AgentRequest` 对象（包含对话历史等信息），执行智能体逻辑后返回响应。返回值可以是字符串、生成器（用于流式输出）或者 `AgentResponse` 对象，AgentRun 会自动处理这些不同的返回类型并转换为标准的 OpenAI 协议响应。

最后是服务启动部分，使用 `AgentRunServer` 将智能体封装为 HTTP 服务：

```python
from agentrun.server import AgentRunServer

# 启动 OpenAI 协议兼容的 HTTP 服务
AgentRunServer(invoke_agent=invoke_agent).start()
```

这行代码会启动一个监听在 9000 端口的 HTTP 服务器，自动提供 `/v1/chat/completions` 等 OpenAI 兼容的 API 端点。

## 准备云端资源

在运行代码之前，需要在 AgentRun 控制台创建模型和沙箱模板资源。登录 [AgentRun 控制台](https://functionai.console.aliyun.com/)，按照以下步骤操作。

首先创建模型服务。在左侧菜单中选择"模型管理"，点击"创建模型服务"按钮。填写模型名称（例如 `qwen-max`），选择模型提供商为"通义千问"，配置 API 凭证后保存。如果您希望使用其他模型提供商（如 OpenAI、Anthropic），需要先在"凭证管理"中创建对应的 API Key 凭证。

接下来创建沙箱模板。在左侧菜单中选择"沙箱管理"，点击"创建模板"按钮。选择模板类型为"代码解释器"，填写模板名称（例如 `code-interpreter-python`），选择运行时为 Python 3.10，配置资源规格后保存。沙箱模板创建完成后，智能体就可以在隔离的容器环境中安全地执行用户提交的代码。

完成资源创建后，回到代码中修改 `MODEL_NAME` 和 `SANDBOX_NAME` 为您刚才创建的资源名称。

## 本地测试

现在可以在本地启动智能体服务进行测试。激活虚拟环境后执行：

```bash
source .venv/bin/activate  # Linux/macOS
# .venv\Scripts\activate  # Windows
python index.py
```

服务启动后会看到类似 "Application startup complete" 的日志输出，表示服务已成功运行在 `http://127.0.0.1:9000`。

打开新的终端窗口，使用 curl 命令测试智能体的对话能力：

```bash
curl http://127.0.0.1:9000/v1/chat/completions \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "使用 Python 代码计算 1 到 100 的和"}
    ],
    "stream": true
  }'
```

如果一切正常，您会看到智能体首先分析问题，然后调用代码执行工具运行 Python 代码，最后返回计算结果。响应格式遵循 OpenAI Chat Completions API 标准，这意味着任何支持 OpenAI 协议的客户端都可以直接对接您的智能体服务。

您也可以尝试其他类型的问题，例如数据分析、文件操作等，观察智能体如何利用代码执行能力解决复杂任务。

## 部署到云端

本地测试通过后，可以将智能体部署到 AgentRun 云平台，获得生产级的可扩展性、可观测性和安全能力。

首先需要配置部署凭证。执行 `s config add` 进入交互式配置流程，按照提示输入您的阿里云 Access Key 信息。在配置过程中需要为这组凭证指定一个别名（例如 `agentrun-deploy`），后续部署时会用到这个名称。

接下来修改项目根目录的 `s.yaml` 配置文件。这个文件定义了智能体在云端的运行配置，包括资源规格、环境变量、日志配置等。您需要重点关注 `role` 字段，这是授权给函数计算服务的 RAM 角色：

```yaml
role: acs:ram::{您的阿里云主账号ID}:role/{角色名称}
```

如果您还没有创建过相关角色，可以使用[快速授权链接](https://ram.console.aliyun.com/authorize?request=%7B%22template%22%3A%22OldRoleCommonAuthorize%22%2C%22referrer%22%3A%22https%3A%2F%2Ffunctionai.console.aliyun.com%2Fcn-hangzhou%2Fexplore%22%2C%22payloads%22%3A%5B%7B%22missionId%22%3A%22OldRoleCommonAuthorize.FC%22%2C%22roleName%22%3A%22agentRunRole%22%2C%22roleDescription%22%3A%22AgentRun%20auto%20created%20role.%22%2C%22rolePolicies%22%3A%5B%7B%22policyName%22%3A%22AliyunAgentRunFullAccess%22%7D%2C%7B%22policyName%22%3A%22AliyunDevsFullAccess%22%7D%5D%7D%5D%2C%22callback%22%3A%22https%3A%2F%2Ffunctionai.console.aliyun.com%22%7D)一键创建，创建后的角色 ARN 格式为 `acs:ram::{您的主账号ID}:role/agentRunRole`。

准备工作完成后，执行构建和部署命令。构建步骤会在 Docker 容器中安装项目依赖，确保云端环境的一致性（因此需要确保本地 Docker 服务正在运行）：

```bash
s build
s deploy -a agentrun-deploy
```

其中 `-a agentrun-deploy` 指定使用前面配置的凭证别名。如果您希望避免每次部署都输入这个参数，可以在 `s.yaml` 文件开头添加 `access: agentrun-deploy` 配置项。

部署过程需要几分钟时间，完成后会输出智能体的访问端点信息：

```
endpoints:
  -
    id:   ep-xxxxxx
    name: prod
    url:  https://12345.agentrun-data.cn-hangzhou.aliyuncs.com/agent-runtimes/ar-xxxxxx/endpoints/prod/invocations
```

这个 URL 就是您的智能体在云端的访问地址。与本地测试类似，将实际的 API 路径拼接到这个基础 URL 后即可调用：

```bash
curl https://12345.agentrun-data.cn-hangzhou.aliyuncs.com/agent-runtimes/ar-xxxxxx/endpoints/prod/invocations/v1/chat/completions \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "使用 Python 代码计算斐波那契数列的第 20 项"}
    ],
    "stream": true
  }'
```

云端部署的智能体具备自动扩缩容能力，可以根据请求量动态调整实例数量。您还可以在 AgentRun 控制台查看智能体的运行日志、性能指标和调用统计，便于监控和优化。

## 下一步

完成快速开始后，您已经掌握了 AgentRun 的基本使用流程。根据实际需求，可以继续探索以下主题：

**增强智能体能力**：除了代码执行沙箱，AgentRun 还提供浏览器沙箱（用于网页自动化）、向量数据库（用于 RAG 应用）、HTTP 工具集（用于 API 调用）等多种工具。您可以参考"工具集成实战"教程了解如何组合使用这些工具。

**模型策略优化**：如果您需要在多个模型之间切换（例如根据问题复杂度选择不同模型），或者希望实现模型调用的负载均衡和容错，可以参考"模型集成实战"教程学习模型代理的配置方法。

**多框架集成**：AgentRun 不仅支持 LangChain，还可以与 CrewAI、LangGraph、AgentScope 等主流框架集成。如果您希望使用其他框架或者在项目中切换框架，可以参考"框架集成指南"教程。

**生产环境部署**：在将智能体用于生产环境之前，建议阅读"生产环境部署清单"，了解性能优化、错误处理、安全加固等最佳实践。

如果在使用过程中遇到问题，可以查阅"问题排查指南"或访问 [AgentRun 官方文档](https://docs.agent.run/)获取帮助。