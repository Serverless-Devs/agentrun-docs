---
sidebar_position: 12
---

# 创建第一个 Agent

本教程将引导您在 10 分钟内创建并部署一个完整的 Agent 应用。我们将使用 LangChain 框架构建一个支持代码执行的智能助手，该助手能够通过编写和运行代码来解决各种问题。

## 使用脚手架创建项目

AgentRun 提供了开箱即用的项目模板，可以快速生成包含最佳实践的项目结构。在开始之前，请确保您已按照前面的章节完成了 Serverless Devs 工具的安装。

在终端中执行项目初始化命令：

```bash
s init agentrun-quick-start-langchain
```

这个命令会从模板仓库下载项目脚手架，并在当前目录创建一个名为 `agentrun-quick-start-langchain` 的文件夹。整个过程通常只需要几秒钟。创建完成后，进入项目目录并安装 Python 依赖：

```bash
cd agentrun-quick-start-langchain/code
uv venv && uv pip install -r requirements.txt
```

这里使用 uv 工具创建虚拟环境并安装依赖。如果您的系统没有安装 uv，也可以使用传统的 pip 方式：

```bash
python -m venv venv
source venv/bin/activate  # Windows 上使用 venv\Scripts\activate
pip install -r requirements.txt
```

依赖安装完成后，项目就具备了运行的基础条件。

## 理解项目结构

项目模板的核心文件是 `app.py`，其中定义了 Agent 的主要逻辑。让我们先了解项目的整体结构：

```
agentrun-quick-start-langchain/
├── code/                    # Agent 代码目录
│   ├── app.py              # 主程序入口
│   ├── requirements.txt    # Python 依赖声明
│   └── .env                # 环境变量配置（需要创建）
└── s.yaml                  # Serverless Devs 部署配置
```

打开 `app.py` 文件，您会看到以下关键代码结构：

```python
from agentrun.integration.langchain import model, sandbox_toolset
from agentrun.sandbox import TemplateType
from agentrun.server import AgentRequest, AgentRunServer
from agentrun.utils.log import logger

# 配置模型和沙箱
MODEL_NAME = "<your-model-name>"
SANDBOX_NAME = "<your-sandbox-name>"

if MODEL_NAME.startswith("<"):
    raise ValueError("请将 MODEL_NAME 替换为您已经创建的模型名称")

code_interpreter_tools = []
if SANDBOX_NAME and not SANDBOX_NAME.startswith("<"):
    code_interpreter_tools = sandbox_toolset(
        template_name=SANDBOX_NAME,
        template_type=TemplateType.CODE_INTERPRETER,
        sandbox_idle_timeout_seconds=300,
    )
else:
    logger.warning("SANDBOX_NAME 未设置或未替换，跳过加载沙箱工具。")

# 启动 HTTP Server
AgentRunServer(invoke_agent=invoke_agent).start()
```

这段代码完成了三件事：首先从 AgentRun 获取模型和沙箱工具，然后将它们转换为 LangChain 格式，最后启动一个 HTTP 服务器来接收外部请求。

在实际运行之前，您需要在 AgentRun 平台上创建模型和沙箱资源。模型用于提供大语言模型的推理能力，沙箱则为 Agent 提供安全的代码执行环境。

## 准备云端资源

在使用模板代码之前，您需要在 AgentRun 控制台创建必要的云端资源。登录 AgentRun 控制台，完成以下操作：

创建一个模型服务或模型代理。模型服务用于接入您自己部署的模型，模型代理则用于接入第三方模型 API（如 OpenAI、通义千问等）。创建完成后，记录下模型的名称。

创建一个代码解释器类型的沙箱模板。沙箱模板定义了代码执行环境的配置，包括可用的系统资源、网络访问权限等。创建时选择 Python 3.10 或更高版本作为运行时，确保与您的本地开发环境匹配。

回到项目代码，打开 `app.py` 文件，将 `MODEL_NAME` 和 `SANDBOX_NAME` 的值替换为您刚才创建的资源名称：

```python
MODEL_NAME = "my-model"  # 替换为实际的模型名称
SANDBOX_NAME = "my-sandbox"  # 替换为实际的沙箱模板名称
```

同时，在 `code` 目录下创建 `.env` 文件，配置认证信息：

```bash
AGENTRUN_ACCESS_KEY_ID=your-access-key-id
AGENTRUN_ACCESS_KEY_SECRET=your-access-key-secret
AGENTRUN_ACCOUNT_ID=your-account-id
AGENTRUN_REGION=cn-hangzhou
```

确保这些环境变量的值与您在安装配置章节中设置的一致。

## 本地运行测试

完成配置后，就可以在本地启动 Agent 服务进行测试了。在 `code` 目录下执行：

```bash
python app.py
```

程序启动后，会输出类似以下的日志信息：

```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:9000
```

这表示 HTTP 服务器已成功启动，正在监听 9000 端口。现在打开另一个终端窗口，使用 curl 命令测试 Agent 的功能：

```bash
curl 127.0.0.1:9000/openai/v1/chat/completions \
  -XPOST \
  -H "content-type: application/json" \
  -d '{"messages": [{"role": "user", "content": "通过代码查询现在是几点?"}], "stream":true}'
```

这个请求模拟用户向 Agent 提问"现在是几点"。Agent 会分析这个问题，决定通过编写和执行 Python 代码来获取答案。整个过程大致如下：Agent 收到问题后，会判断需要使用代码解释器工具；然后生成一段 Python 代码（如 `import datetime; print(datetime.datetime.now())`）；将代码提交到沙箱执行；获取执行结果后，将答案返回给用户。

由于我们在请求中设置了 `"stream":true`，响应会以流式方式返回，您可以看到 Agent 的思考和执行过程。如果一切正常，最终会返回当前的时间信息。

测试成功后，可以尝试更多问题来验证 Agent 的能力，例如：

```bash
# 数学计算
curl 127.0.0.1:9000/openai/v1/chat/completions \
  -XPOST \
  -H "content-type: application/json" \
  -d '{"messages": [{"role": "user", "content": "帮我计算斐波那契数列的第20项"}], "stream":true}'

# 数据处理
curl 127.0.0.1:9000/openai/v1/chat/completions \
  -XPOST \
  -H "content-type: application/json" \
  -d '{"messages": [{"role": "user", "content": "生成一个包含10个随机数的列表并计算平均值"}], "stream":true}'
```

本地测试通过后，就可以准备将 Agent 部署到云端了。

## 部署到云端

AgentRun 使用 Serverless Devs 作为部署工具。项目根目录的 `s.yaml` 文件定义了部署配置，包括 Agent 的名称、计算资源规格、环境变量等。在部署之前，需要先配置部署权限。

打开 `s.yaml` 文件，找到 `role` 字段。这个字段指定了 Agent Runtime 运行时使用的 RAM 角色，该角色需要具备访问 AgentRun 服务的权限。如果您还没有创建角色，可以点击[快速授权链接](https://ram.console.aliyun.com/authorize?request=%7B%22template%22%3A%22OldRoleCommonAuthorize%22%2C%22referrer%22%3A%22https%3A%2F%2Ffunctionai.console.aliyun.com%2Fcn-hangzhou%2Fexplore%22%2C%22payloads%22%3A%5B%7B%22missionId%22%3A%22OldRoleCommonAuthorize.FC%22%2C%22roleName%22%3A%22agentRunRole%22%2C%22roleDescription%22%3A%22AgentRun%20auto%20created%20role.%22%2C%22rolePolicies%22%3A%5B%7B%22policyName%22%3A%22AliyunAgentRunFullAccess%22%7D%2C%7B%22policyName%22%3A%22AliyunDevsFullAccess%22%7D%5D%7D%5D%2C%22callback%22%3A%22https%3A%2F%2Ffunctionai.console.aliyun.com%22%7D)自动创建一个名为 `agentRunRole` 的角色。

角色创建完成后，将其 ARN 填入 `s.yaml` 的 `role` 字段：

```yaml
role: acs:ram::{您的阿里云主账号 ID}:role/agentRunRole
```

接下来配置 Serverless Devs 的访问密钥。在项目根目录执行：

```bash
s config add
```

按照提示输入您的阿里云 Access Key ID 和 Access Key Secret，并为这组密钥设置一个名称，例如 `agentrun-deploy`。这组密钥用于 Serverless Devs 调用阿里云 API 进行部署操作，与 Agent Runtime 使用的密钥是独立的。

配置完成后，执行构建和部署命令。构建过程会在 Docker 容器中安装项目依赖，确保部署包与云端运行环境兼容：

```bash
s build
s deploy -a agentrun-deploy
```

其中 `-a agentrun-deploy` 指定使用刚才配置的密钥。如果您将密钥名称写入了 `s.yaml` 的 `access` 字段，则可以省略这个参数。

部署过程可能需要几分钟时间，具体取决于项目的大小和网络状况。部署成功后，终端会输出 Agent 的访问信息。

## 调用您的 Agent

部署完成后，控制台会显示类似以下的输出：

```
endpoints:
      -
        id:          abc123
        arn:         arn:aliyun:agentrun:cn-hangzhou:123456789:agent-runtimes/myagent/endpoints/prod
        name:        prod
        url:         https://12345.agentrun-data.cn-hangzhou.aliyuncs.com/agent-runtimes/myagent/endpoints/prod/invocations
```

其中的 `url` 字段是您的 Agent 基础访问地址。将 API 路径拼接到这个 URL 后面，即可调用云端 Agent。例如，调用 OpenAI 兼容的 Chat Completions API：

```bash
curl https://12345.agentrun-data.cn-hangzhou.aliyuncs.com/agent-runtimes/myagent/endpoints/prod/invocations/openai/v1/chat/completions \
  -XPOST \
  -H "content-type: application/json" \
  -d '{"messages": [{"role": "user", "content": "通过代码查询现在是几点?"}], "stream":true}'
```

这个请求与本地测试时使用的请求完全相同，只是 URL 地址指向了云端服务。Agent 会在 AgentRun 平台上执行，享受平台提供的弹性伸缩、负载均衡、监控告警等企业级能力。

至此，您已经完成了第一个 Agent 的创建、测试和部署。这个 Agent 虽然简单，但已经具备了完整的功能：它可以理解自然语言问题，决策使用合适的工具，在安全的沙箱环境中执行代码，并将结果返回给用户。

在此基础上，您可以进一步扩展 Agent 的能力。例如，添加更多类型的工具（如网络搜索、数据库查询），集成文件存储实现上下文记忆，或者使用更复杂的推理链来处理多步骤任务。后续章节将详细介绍这些高级功能的实现方法。