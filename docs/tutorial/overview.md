---
sidebar_position: 0
---

# SDK 概览与架构介绍

## 什么是 AgentRun

AgentRun 是以高代码为核心，开放生态、灵活组装的一站式 Agentic AI 基础设施平台，为企业级 Agentic 应用提供开发、部署与运维全生命周期管理。平台基于 Serverless 架构提供强隔离的运行时与沙箱环境，深度集成开源生态，为用户提供模型高可用和数据不出域能力。

AgentRun Python SDK 是平台的官方客户端库，提供了完整的 Python API 来管理和调用 AgentRun 服务。通过这个 SDK，开发者可以在本地开发环境中编写、测试 Agent 应用，并无缝部署到云端运行。

<img src="https://img.alicdn.com/imgextra/i1/O1CN01J7XpwI26ehfoQ0mF8_!!6000000007687-2-tps-4016-2216.png" />


## SDK 的核心价值

AgentRun SDK 采用面向对象的设计理念，将云端资源抽象为对象，使开发者能够像操作本地对象一样管理云端资源。

SDK 的一个重要特性是对主流 AI 开发框架的深度集成。您可以继续使用熟悉的框架（如 LangChain、AgentScope、LangGraph、CrewAI 等）编写 Agent 逻辑，SDK 会自动处理与 AgentRun 平台的对接工作，包括模型调用、工具执行、沙箱管理等底层细节。

## 核心概念

### AgentRuntime：智能体运行时

Agent Runtime 是 AgentRun 平台上运行 Agent 应用的基本单元。每个 Agent Runtime 封装了您的 Agent 代码、依赖环境和运行配置。SDK 提供了完整的 Agent Runtime 生命周期管理能力，包括创建、更新、删除和监控等操作。


定位：为 Agent 提供统一的执行环境与生命周期管理。

关键特性：
- 多开发模式：无代码（AI Studio）、低代码（快速创建Agent）、高代码（代码创建Agent）；
- 多语言运行时：Python 3.10/3.12、Node.js 18/20、Java 8/11/17 等；

部署方式：
- 上传代码包（本地/OSS）
- 在线编码
- 自定义容器镜像；

运行时能力：
- 会话亲和
- Serverless 弹性
- 多实例并发；
- 版本管理
- Endpoint 管理与灰度发布；

集成生态：
- SDK 集成
- API 集成（OpenAI Chat Completions 兼容）
- UI 集成（前后端一体应用）
- MCP 集成。

### Sandbox：沙箱管理平台

沙箱环境是 AgentRun 的核心安全特性之一。SDK 目前支持两类沙箱：代码解释器沙箱（Code Interpreter）用于执行动态生成的代码，浏览器沙箱（Browser）则提供完整的浏览器自动化能力。
代码解释器沙箱支持 Python 和 Shell 脚本执行，提供了完整的文件系统操作、进程管理和执行上下文管理功能。您可以在沙箱中上传文件、执行代码、下载结果，所有操作都在隔离的容器环境中进行，确保宿主系统的安全。

定位：为代码执行和浏览器操作提供安全、高性能的 Serverless 沙箱。

关键特性：

- 多类型沙箱：
    - Code Interpreter
    - Browser Use
    - All-in-One
    - ……
- 隔离与弹性：
    - 安全容器（MicroVM）、多级隔离；
    - 支持缩容到 0，按请求弹性调度；
    - 毫秒级唤醒，支持万级实例/分钟极速交付；

集成方式：
- 支持 SDK 调用、MCP 工具方式集成到 Agent 中；
- 支持预置镜像和自定义镜像。

### Model：模型管理

AgentRun 提供了统一的模型管理能力，屏蔽不同模型供应商的 API 差异。SDK 支持两种模型接入方式：Model Service 用于接入自建或第三方模型服务，Model Proxy 则提供模型代理和治理功能，包括负载均衡、故障转移、请求限流等企业级特性。

定位：统一的大模型接入、管理与治理中心。

关键特性：
- 模型来源：第三方模型（通义千问、DeepSeek 等）、开源托管模型（vLLM/SGLang/Ollama/LMDeploy 等框架）、向量模型；
- 模型服务提供商插件：统一管理各种模型服务的认证凭证和连接信息；

模型运行时：
Serverless 模型运行时，支持开箱即用、DevPod 二次开发、弹性交付 GPU，低峰缩 0；

模型治理：
多模型负载代理、Fallback、并发控制、超时与缓存；
内容安全、Token 限流与成本监控。

### ToolSet：工具管理

ToolSet 是 AgentRun 的工具管理系统。SDK 支持多种工具定义方式，包括基于 OpenAPI 规范的 HTTP 工具和基于 MCP（Model Context Protocol）的标准化工具。您可以通过 SDK 获取平台上已注册的工具集，并自动转换为各个框架所需的工具格式。


定位：统一的工具定义、调用和治理中心。

关键特性：
- 统一工具接口：
- 支持 MCP 和 Function Call 双协议；
- API 统管工具调用逻辑，降低开发复杂度；

Tool Hub 生态：
- 提供大量常用工具，一键接入；
- 支持自定义工具发布与分享；

智能扩展：
- 支持 Hook 注入、语义分析、智能路由等高级能力；
- 规划中的 AI 自动生成工具定义与工具推荐引擎等能力。

### Credential：凭证管理

凭证管理用于存储和管理访问第三方服务所需的密钥。SDK 支持多种凭证类型，包括 API Key、Basic Auth、OAuth Token 等。您可以在 AgentRun 平台上集中管理凭证，Agent 运行时会自动注入所需的凭证，避免在代码中硬编码敏感信息。

定位：统一管理 Agent / Sandbox / LLM / 工具访问所需的凭证。

关键特性：
- 支持多种凭证类型：API Key、JWT、Basic、AK/SK 等；
- 动态凭证注入：与 AgentRun 运行时联动，通过安全机制在运行时注入；
- 启用/禁用控制：支持一键禁用疑似泄露的凭证，降低安全风险。



## 架构设计

AgentRun SDK 采用分层架构设计。最底层是 Control API 和 Data API，分别负责资源管理和数据操作。Control API 用于创建、更新、删除云端资源，Data API 则用于与运行中的资源交互，如调用模型、执行沙箱命令等。

在 API 层之上是资源对象层，将云端资源抽象为类，如 AgentRuntime、ModelService、Sandbox 等。这些类封装了底层 API 调用，提供了面向对象的操作接口。资源对象支持方法链调用，可以流畅地完成复杂操作。

最上层是集成模块和工具类。集成模块提供框架适配器，工具类则包含配置管理、日志记录、异常处理等辅助功能。这种分层设计既保证了底层能力的完整性，又为上层使用提供了便利。

## 适用场景

AgentRun SDK 适用于需要构建企业级 AI Agent 应用的场景。典型应用包括智能客服系统、数据分析助手、代码生成工具、网页自动化机器人等。通过 SDK 提供的沙箱环境和工具系统，您可以让 Agent 安全地执行代码、访问外部 API、操作浏览器，完成复杂的任务流程。

对于已经使用某个 AI 开发框架的团队，SDK 的集成能力可以帮助您快速迁移到 AgentRun 平台，享受平台提供的模型高可用、资源弹性伸缩、运维监控等企业级能力，而无需重写已有代码。

对于需要严格数据安全和合规要求的场景，AgentRun 的数据不出域特性和隔离沙箱环境可以确保敏感数据的安全处理。您可以在私有网络环境中部署模型服务和工具服务，通过 SDK 连接到 AgentRun 平台，实现数据和计算的物理隔离。
