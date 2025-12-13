---
sidebar_position: 1
---

# SDK 概览与架构介绍

## 什么是 AgentRun

AgentRun 是以高代码为核心，开放生态、灵活组装的一站式 Agentic AI 基础设施平台，为企业级 Agentic 应用提供开发、部署与运维全生命周期管理。平台基于 Serverless 架构提供强隔离的运行时与沙箱环境，深度集成开源生态，为用户提供模型高可用和数据不出域能力。

AgentRun Python SDK 是平台的官方客户端库，提供了完整的 Python API 来管理和调用 AgentRun 服务。通过这个 SDK，开发者可以在本地开发环境中编写、测试 Agent 应用，并无缝部署到云端运行。

<img src="https://github.com/user-attachments/assets/22f1cb98-1e42-47ac-b3c1-3d5d9c8c00f5" />


## SDK 的核心价值

AgentRun Python SDK 采用面向对象的设计理念，将云端资源抽象为 Python 对象，使开发者能够像操作本地对象一样管理云端资源。SDK 同时提供同步和异步两套 API，支持多种认证方式，并包含完整的类型注解，为 IDE 提供良好的代码提示支持。

SDK 的一个重要特性是对主流 AI 开发框架的深度集成。您可以继续使用熟悉的框架（如 LangChain、AgentScope、LangGraph、CrewAI 等）编写 Agent 逻辑，SDK 会自动处理与 AgentRun 平台的对接工作，包括模型调用、工具执行、沙箱管理等底层细节。

## 核心概念

### Agent Runtime

Agent Runtime 是 AgentRun 平台上运行 Agent 应用的基本单元。每个 Agent Runtime 封装了您的 Agent 代码、依赖环境和运行配置。SDK 提供了完整的 Agent Runtime 生命周期管理能力，包括创建、更新、删除和监控等操作。

Agent Runtime 支持两种运行方式：代码模式和容器模式。代码模式下，您只需提供 Python 代码和依赖列表，平台会自动构建运行环境；容器模式则允许您使用自定义的容器镜像，适合有特殊环境需求的场景。

每个 Agent Runtime 可以创建多个访问端点（Endpoint），支持不同的路由策略和版本管理。例如，您可以创建一个生产端点和一个测试端点，分别指向不同版本的 Agent 代码，实现灰度发布和 A/B 测试。

### Model

AgentRun 提供了统一的模型管理能力，屏蔽不同模型供应商的 API 差异。SDK 支持两种模型接入方式：Model Service 用于接入自建或第三方模型服务，Model Proxy 则提供模型代理和治理功能，包括负载均衡、故障转移、请求限流等企业级特性。

通过 SDK 的模型 API，您可以使用统一的接口调用不同供应商的模型。SDK 会自动处理请求格式转换、认证、重试等细节，让您专注于业务逻辑的开发。同时，SDK 提供了便捷的转换函数，可以将 AgentRun 模型对象转换为各个框架所需的格式。

### Sandbox

沙箱环境是 AgentRun 的核心安全特性之一。SDK 目前支持两类沙箱：代码解释器沙箱（Code Interpreter）用于执行动态生成的代码，浏览器沙箱（Browser）则提供完整的浏览器自动化能力。

代码解释器沙箱支持 Python 和 Shell 脚本执行，提供了完整的文件系统操作、进程管理和执行上下文管理功能。您可以在沙箱中上传文件、执行代码、下载结果，所有操作都在隔离的容器环境中进行，确保宿主系统的安全。

浏览器沙箱基于 Chromium 内核，集成了 Playwright 自动化框架。SDK 提供了同步和异步两套 Playwright API 封装，支持页面导航、元素操作、截图录制等完整的浏览器控制能力。沙箱还支持远程调试和实时预览，方便开发调试。

### ToolSet

ToolSet 是 AgentRun 的工具管理系统。SDK 支持多种工具定义方式，包括基于 OpenAPI 规范的 HTTP 工具和基于 MCP（Model Context Protocol）的标准化工具。您可以通过 SDK 获取平台上已注册的工具集，并自动转换为各个框架所需的工具格式。

对于 OpenAPI 工具，SDK 会解析 OpenAPI 规范文档，自动生成工具描述和参数定义，并处理 HTTP 请求的构建和发送。对于 MCP 工具，SDK 实现了完整的 MCP 协议客户端，可以与任何符合 MCP 规范的工具服务通信。

### Credential

凭证管理用于存储和管理访问第三方服务所需的密钥。SDK 支持多种凭证类型，包括 API Key、Basic Auth、OAuth Token 等。您可以在 AgentRun 平台上集中管理凭证，Agent 运行时会自动注入所需的凭证，避免在代码中硬编码敏感信息。

### Integration

SDK 的集成模块提供了统一的适配器层，将 AgentRun 的模型、工具、沙箱等能力转换为各个框架的原生对象。目前支持的框架包括 LangChain、LangGraph、AgentScope、CrewAI、Google ADK 和 Pydantic AI。

集成的核心设计是 CommonModel 和 CommonToolSet 抽象。这两个抽象类封装了 AgentRun 的底层 API，并提供了转换方法（如 `to_langchain()`、`to_agentscope()`），可以将对象转换为对应框架的格式。这种设计使得您可以编写框架无关的代码，在需要时轻松切换框架。

### Server

AgentRunServer 是一个轻量级的 HTTP 服务器组件，可以将您的 Agent 封装为 HTTP API。Server 内置了 OpenAI Chat Completions 协议的实现，使您的 Agent 可以直接替换 OpenAI API 使用。

Server 基于 FastAPI 构建，采用插件化的协议设计。除了内置的 OpenAI 协议，您也可以实现自定义协议处理器，支持其他 API 规范。Server 自动处理请求解析、响应格式化、流式输出等细节，让您只需关注 Agent 的业务逻辑。

## 架构设计

AgentRun Python SDK 采用分层架构设计。最底层是 Control API 和 Data API，分别负责资源管理和数据操作。Control API 用于创建、更新、删除云端资源，Data API 则用于与运行中的资源交互，如调用模型、执行沙箱命令等。

在 API 层之上是资源对象层，将云端资源抽象为 Python 类，如 AgentRuntime、ModelService、Sandbox 等。这些类封装了底层 API 调用，提供了面向对象的操作接口。资源对象支持方法链调用，可以流畅地完成复杂操作。

最上层是集成模块和工具类。集成模块提供框架适配器，工具类则包含配置管理、日志记录、异常处理等辅助功能。这种分层设计既保证了底层能力的完整性，又为上层使用提供了便利。

## 适用场景

AgentRun Python SDK 适用于需要构建企业级 AI Agent 应用的场景。典型应用包括智能客服系统、数据分析助手、代码生成工具、网页自动化机器人等。通过 SDK 提供的沙箱环境和工具系统，您可以让 Agent 安全地执行代码、访问外部 API、操作浏览器，完成复杂的任务流程。

对于已经使用某个 AI 开发框架的团队，SDK 的集成能力可以帮助您快速迁移到 AgentRun 平台，享受平台提供的模型高可用、资源弹性伸缩、运维监控等企业级能力，而无需重写已有代码。

对于需要严格数据安全和合规要求的场景，AgentRun 的数据不出域特性和隔离沙箱环境可以确保敏感数据的安全处理。您可以在私有网络环境中部署模型服务和工具服务，通过 SDK 连接到 AgentRun 平台，实现数据和计算的物理隔离。
