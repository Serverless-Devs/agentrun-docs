---
sidebar_position: 3
title: OpenaiProtocol
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# OpenaiProtocol

OpenAI Completions API 协议实现 / OpenAI Completions API 协议Implements

基于 Router 的设计:
- 协议自己创建 FastAPI Router
- 定义所有端点和处理逻辑
- Server 只需挂载 Router

## 类

## OpenAIProtocolHandler

```python
class OpenAIProtocolHandler(ProtocolHandler)
```

OpenAI Completions API 协议处理器

实现 OpenAI Chat Completions API 兼容接口
参考: https://platform.openai.com/docs/api-reference/chat/create

### 方法

#### 🔹 `get_prefix`

```python
def get_prefix(self) -> str
```

OpenAI 协议建议使用 /v1 前缀

---


#### 🔹 `as_fastapi_router`

```python
def as_fastapi_router(self, agent_invoker: 'AgentInvoker') -> APIRouter
```

创建 OpenAI 协议的 FastAPI Router

---


#### 🔹 `parse_request`

```python
async def parse_request(self, request_data: Dict[str, Any]) -> AgentRequest
```

解析 OpenAI 格式的请求

**Args:**

- `request_data`: HTTP 请求体 JSON 数据

**Returns:**

AgentRequest: 标准化的请求对象

**Raises:**

- `ValueError`: 请求格式不正确

---


#### 🔹 `format_response`

```python
async def format_response(self, result: AgentResult, request: AgentRequest) -> Any
```

格式化响应为 OpenAI 格式

**Args:**

- `result`: Agent 执行结果,支持:
- `- AgentRunResult`: 核心数据结构 (推荐)
- `- AgentResponse`: 完整响应对象
- `- ModelResponse`: litellm 的 ModelResponse
- `- CustomStreamWrapper`: litellm 的流式响应
- `request`: 原始请求

**Returns:**

格式化后的响应(dict 或 AsyncIterator)

---




