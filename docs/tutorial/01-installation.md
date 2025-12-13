---
sidebar_position: 11
---

# 安装与配置

## 环境要求

AgentRun Python SDK 要求 Python 版本在 3.10 或更高。建议使用虚拟环境来管理项目依赖，避免与系统 Python 环境产生冲突。您可以使用 venv、virtualenv 或 conda 等工具创建虚拟环境。

在安装 SDK 之前，请确保您已拥有阿里云账号，并已开通 AgentRun 服务。您需要准备好阿里云的 Access Key ID、Access Key Secret 和账号 ID，这些凭证将用于 SDK 与云端服务的认证。

## 基础安装

使用 pip 包管理器可以快速安装 AgentRun SDK。在终端中执行以下命令即可完成基础安装：

```bash
pip install agentrun-sdk
```

基础安装包含了 SDK 的核心功能，包括 Agent Runtime 管理、模型调用、凭证管理等基础能力。对于大多数简单场景，基础安装已经足够使用。

## 可选依赖安装

AgentRun SDK 采用模块化设计，将不同的功能特性作为可选依赖项提供。这样可以避免安装不必要的依赖包，减小环境体积。根据您的实际需求，可以选择安装以下可选依赖：

**server** 依赖用于启用 HTTP 服务器功能。如果您需要使用 AgentRunServer 将 Agent 封装为 HTTP API，需要安装此依赖。该依赖包含 FastAPI 和 Uvicorn 等 Web 框架组件。

**playwright** 依赖用于支持浏览器沙箱功能。当您需要让 Agent 进行网页自动化操作时，需要安装此依赖。安装后还需要运行 Playwright 的初始化命令来下载浏览器驱动。

**mcp** 依赖用于支持 MCP（Model Context Protocol）工具集。如果您的 Agent 需要调用基于 MCP 协议的工具服务，需要安装此依赖。

**框架集成依赖**包括 langchain、agentscope、google-adk、crewai、pydantic-ai 等。这些依赖分别对应不同的 AI 开发框架。如果您使用某个框架进行 Agent 开发，需要安装对应的集成依赖。

安装可选依赖时，在包名后用方括号指定依赖项名称，多个依赖项之间用逗号分隔。例如，如果您需要使用 AgentScope 框架，同时需要浏览器沙箱和 MCP 工具支持，可以执行：

```bash
pip install agentrun-sdk[playwright,mcp,agentscope]
```

对于使用 LangChain 框架并需要 HTTP 服务器功能的场景：

```bash
pip install agentrun-sdk[server,langchain]
```

如果您不确定需要哪些依赖，可以先安装基础版本，在遇到功能缺失时再按需补充安装。

## 配置认证信息

安装完成后，您需要配置认证信息才能使用 SDK。AgentRun SDK 支持多种配置方式，包括环境变量、代码配置和配置文件，您可以根据实际场景选择合适的方式。

### 使用环境变量配置

环境变量是推荐的配置方式，特别适合生产环境和容器化部署。SDK 会自动读取以下环境变量：

```bash
export AGENTRUN_ACCESS_KEY_ID="your-access-key-id"
export AGENTRUN_ACCESS_KEY_SECRET="your-access-key-secret"
export AGENTRUN_ACCOUNT_ID="your-account-id"
export AGENTRUN_REGION="cn-hangzhou"
```

这四个环境变量是必需的，分别对应阿里云的访问密钥 ID、访问密钥 Secret、账号 ID 和服务区域。SDK 还支持以 `ALIBABA_CLOUD_` 为前缀的备用环境变量名，例如 `ALIBABA_CLOUD_ACCESS_KEY_ID` 等，这样可以与其他阿里云 SDK 共享配置。

在开发环境中，建议将环境变量配置写入项目根目录的 `.env` 文件，然后使用 python-dotenv 等工具加载。这样既方便管理，又避免了在代码中硬编码敏感信息。请确保将 `.env` 文件添加到 `.gitignore`，避免误提交到版本控制系统。

对于使用 STS 临时凭证的场景，还需要设置安全令牌：

```bash
export AGENTRUN_SECURITY_TOKEN="your-sts-token"
```

如果您需要自定义服务端点或启用调试模式，可以设置以下可选环境变量：

```bash
export AGENTRUN_CONTROL_ENDPOINT="https://custom-control-endpoint"
export AGENTRUN_DATA_ENDPOINT="https://custom-data-endpoint"
export AGENTRUN_SDK_DEBUG="true"
```

### 使用代码配置

您也可以在代码中直接创建 Config 对象来配置认证信息。这种方式适合需要动态切换配置的场景：

```python
from agentrun.utils.config import Config

config = Config(
    access_key_id="your-access-key-id",
    access_key_secret="your-access-key-secret",
    account_id="your-account-id",
    region_id="cn-hangzhou",
    timeout=30
)
```

创建的 Config 对象可以在调用 SDK API 时作为参数传入。如果同时存在环境变量配置和代码配置，SDK 会优先使用代码中显式传入的配置。

对于需要支持多账号或多区域的应用，可以创建多个 Config 对象并在调用时指定。例如，某些操作在国内区域执行，某些操作在海外区域执行：

```python
cn_config = Config(
    access_key_id="cn-key-id",
    access_key_secret="cn-secret",
    account_id="cn-account-id",
    region_id="cn-hangzhou"
)

us_config = Config(
    access_key_id="us-key-id",
    access_key_secret="us-secret",
    account_id="us-account-id",
    region_id="us-west-1"
)
```

### 配置参数说明

除了必需的认证凭证，Config 还支持以下可选参数：

**timeout** 参数控制 HTTP 请求的超时时间，单位为秒，默认值为 600 秒。对于预期执行时间较长的操作，可以适当增大此值。

**headers** 参数允许您为所有请求添加自定义 HTTP 头。这在需要传递额外的元数据或跟踪信息时很有用。

**control_endpoint** 和 **data_endpoint** 参数用于自定义服务端点。一般情况下无需设置，SDK 会根据 region_id 自动选择合适的端点。只有在使用私有部署或特殊网络环境时才需要自定义。

## 验证安装

完成安装和配置后，建议运行一个简单的测试脚本来验证 SDK 是否正常工作。创建一个 Python 文件并输入以下代码：

```python
from agentrun.agent_runtime import AgentRuntime

# 列出所有 Agent Runtime
runtimes = AgentRuntime.list()
print(f"找到 {len(runtimes)} 个 Agent Runtime")
```

执行这个脚本，如果能成功输出而没有报错，说明 SDK 已正确安装并配置。如果遇到认证错误，请检查您的 Access Key 配置是否正确；如果遇到网络错误，请检查您的网络连接和防火墙设置。

对于需要使用可选依赖的功能，建议先进行单独验证。例如，验证 Playwright 安装：

```python
from agentrun.sandbox import Sandbox, TemplateType

# 这会检查 Playwright 是否可用
print("Playwright 支持已启用")
```

如果提示缺少 Playwright，需要执行 Playwright 的安装命令：

```bash
playwright install chromium
```

完成所有验证后，您就可以开始使用 AgentRun SDK 开发 Agent 应用了。