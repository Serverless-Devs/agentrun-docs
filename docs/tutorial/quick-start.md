---
sidebar_position: 2
---

# 🚀 快速开始

你可以使用任意您喜欢的框架进行 Agent 开发，这里以 langchain 为例

## 1. 安装 Serverless Devs

运行脚手架，您需要使用 Serverless Devs 工具，请参考对应 [安装教程](https://serverless-devs.com/docs/user-guide/install)

> 如果您拥有 NodeJS 开发环境，可以使用 `npm i -g @serverless-devs/s` 快速安装 Serverless Devs
> 您也可以直接下载 [Serverless Devs 二进制程序](https://github.com/Serverless-Devs/Serverless-Devs/releases) 使用 Serverless Devs

## 2. 创建模板

使用快速创建脚手架创建您的 Agent

:::warning
您需要确保您的 python 环境在 3.10 以上
:::

```bash
# 初始化模板
s init agentrun-quick-start-langchain

# 按照实际情况进入代码目录
cd agentrun-quick-start-langchain/code

# 初始化虚拟环境并安装依赖
uv venv && uv pip install -r requirements.txt
```

## 3. 配置认证信息

设置环境变量（建议通过 `.env` 配置您的环境变量）

```bash
export AGENTRUN_ACCESS_KEY_ID="your-access-key-id"
export AGENTRUN_ACCESS_KEY_SECRET="your-access-key-secret"
export AGENTRUN_ACCOUNT_ID="your-account-id"
export AGENTRUN_REGION="cn-hangzhou"
```

## 4. 了解 Agent 如何与 LangChain 集成

使用 `from agentrun.integration.langchain import model, sandbox_toolset` 导入 langchain 的集成能力，这里默认提供了 `model`、`sandbox_toolset`、`toolset`，可以快速创建 langchain 可识别的大模型、工具
同时，通过 AgentRunServer 可以快速开放 HTTP Server 供其他业务集成

```python
from agentrun.integration.langchain import model, sandbox_toolset
from agentrun.sandbox import TemplateType
from agentrun.server import AgentRequest, AgentRunServer
from agentrun.utils.log import logger

# 请替换为您已经创建的 模型 和 沙箱 名称
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

# ...

# 自动启动 http server，提供 OpenAI 协议
AgentRunServer(invoke_agent=invoke_agent).start()
```

## 5. 调用 Agent

```bash
curl 127.0.0.1:9000/openai/v1/chat/completions \
  -XPOST \
  -H "content-type: application/json" \
  -d '{"messages": [{"role": "user", "content": "通过代码查询现在是几点?"}], "stream":true}'
```

## 6. 部署项目

项目中已经存在 `s.yaml` 文件，这是 Serverless Devs 的部署配置文件，通过这个文件，您可以配置当前 Agent 在 Agent Run 上的名称、CPU/内存规格、日志投递信息

在示例情况下，您只需要简单修改该文件即可。修改 `role` 字段为授信给阿里云函数计算（FC）服务，需要拥有AliyunAgentRunFullAccess权限的角色（如果您拥有精细化权限控制的需求，可以根据实际使用的 API 收敛权限）

> 您可以点击此[快速授权链接](https://ram.console.aliyun.com/authorize?request=%7B%22template%22%3A%22OldRoleCommonAuthorize%22%2C%22referrer%22%3A%22https%3A%2F%2Ffunctionai.console.aliyun.com%2Fcn-hangzhou%2Fexplore%22%2C%22payloads%22%3A%5B%7B%22missionId%22%3A%22OldRoleCommonAuthorize.FC%22%2C%22roleName%22%3A%22agentRunRole%22%2C%22roleDescription%22%3A%22AgentRun%20auto%20created%20role.%22%2C%22rolePolicies%22%3A%5B%7B%22policyName%22%3A%22AliyunAgentRunFullAccess%22%7D%2C%7B%22policyName%22%3A%22AliyunDevsFullAccess%22%7D%5D%7D%5D%2C%22callback%22%3A%22https%3A%2F%2Ffunctionai.console.aliyun.com%22%7D)，创建一个符合相关权限的角色agentRunRole。
> 
> 此快速创建角色的RoleArn为：acs:ram::{您的阿里云主账号 ID}:role/agentRunRole

```yaml
role: acs:ram::{您的阿里云主账号 ID}:role/{您的阿里云角色名称}
```

> 如果在未来的使用中遇到了任何 Serverless Devs 相关问题，都可以参考 [Serverless Devs 相关文档](https://serverless-devs.com/docs/overview)

在部署前，您需要配置您的部署密钥，使用 `s config add` 进入交互式密钥管理，并按照引导录入您在阿里云的 Access Key ID 与 Access Key Secret。在录入过程中，您需要短期记忆一下您输入的密钥对名称（假设为 `agentrun-deploy`）

配置完成后，需要首先执行`s build`构建，该步骤依赖本地的`docker`服务，对代码目录下的`requirements.txt`进行构建，以便部署在云端。

随后即可执行`s deploy`进行部署操作。


```bash
s build
s deploy -a agentrun-deploy
# agentrun-deploy 是您使用的密钥对名称，也可以将该名称写入到 s.yaml 开头的 access: 字段中
```

## 7. 在线上进行调用

部署完成后，您可以看到如下格式的输出

```
endpoints:
      -
        id:          ...
        arn:         ...
        name:        ...
        url:         https://12345.agentrun-data.cn-hangzhou.aliyuncs.com/agent-runtimes/abcd/endpoints/prod/invocations
```

此处的 url 为您的 Agent 调用地址，将实际的请求 path 拼接到该 base url 后，即可调用云上的 Agent 资源

```bash
curl https://12345.agentrun-data.cn-hangzhou.aliyuncs.com/agent-runtimes/abcd/endpoints/prod/invocations/openai/v1/chat/completions \
  -XPOST \
  -H "content-type: application/json" \
  -d '{"messages": [{"role": "user", "content": "通过代码查询现在是几点?"}], "stream":true}'
```
