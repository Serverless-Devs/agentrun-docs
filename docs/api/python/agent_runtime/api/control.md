---
sidebar_position: 1
title: Control
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Control

Agent Runtime 管控链路 API

## 类

## AgentRuntimeControlAPI

```python
class AgentRuntimeControlAPI(ControlAPI)
```

Agent Runtime 管控链路 API

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, config: Optional[Config] = None)
```

初始化 API 客户端

**Args:**

- `config`: 全局配置对象

---


#### 🔹 `create_agent_runtime`

```python
def create_agent_runtime(self, input: CreateAgentRuntimeInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> AgentRuntime
```

创建 Agent Runtime

**Args:**

- `input`: Agent Runtime 配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

AgentRuntime: 创建的 Runtime 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `create_agent_runtime_async`

```python
async def create_agent_runtime_async(self, input: CreateAgentRuntimeInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> AgentRuntime
```

创建 Agent Runtime

**Args:**

- `input`: Agent Runtime 配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

AgentRuntime: 创建的 Runtime 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `delete_agent_runtime`

```python
def delete_agent_runtime(self, agent_id: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> AgentRuntime
```

删除 Agent Runtime

**Args:**

- `agent_id`: Agent Runtime ID
- `headers`: 请求头
- `config`: 配置

**Returns:**

AgentRuntime: 删除结果

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `delete_agent_runtime_async`

```python
async def delete_agent_runtime_async(self, agent_id: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> AgentRuntime
```

删除 Agent Runtime

**Args:**

- `agent_id`: Agent Runtime ID
- `headers`: 请求头
- `config`: 配置

**Returns:**

AgentRuntime: 删除结果

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `update_agent_runtime`

```python
def update_agent_runtime(self, agent_id: str, input: UpdateAgentRuntimeInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> AgentRuntime
```

创建 Agent Runtime

**Args:**

- `agent_id`: Agent Runtime ID
- `input`: Agent Runtime 配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

AgentRuntime: 创建的 Runtime 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `update_agent_runtime_async`

```python
async def update_agent_runtime_async(self, agent_id: str, input: UpdateAgentRuntimeInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> AgentRuntime
```

创建 Agent Runtime

**Args:**

- `agent_id`: Agent Runtime ID
- `input`: Agent Runtime 配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

AgentRuntime: 创建的 Runtime 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `get_agent_runtime`

```python
def get_agent_runtime(self, agent_id: str, input: GetAgentRuntimeRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> AgentRuntime
```

获取 Agent Runtime

**Args:**

- `agent_id`: Agent Runtime ID
- `input`: Agent Runtime 配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

AgentRuntime: 创建的 Runtime 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `get_agent_runtime_async`

```python
async def get_agent_runtime_async(self, agent_id: str, input: GetAgentRuntimeRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> AgentRuntime
```

获取 Agent Runtime

**Args:**

- `agent_id`: Agent Runtime ID
- `input`: Agent Runtime 配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

AgentRuntime: 创建的 Runtime 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `list_agent_runtimes`

```python
def list_agent_runtimes(self, input: ListAgentRuntimesRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ListAgentRuntimesOutput
```

枚举 Agent Runtime

**Args:**

- `input`: 枚举的配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ListAgentRuntimesOutput: 创建的 Runtime 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `list_agent_runtimes_async`

```python
async def list_agent_runtimes_async(self, input: ListAgentRuntimesRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ListAgentRuntimesOutput
```

枚举 Agent Runtime

**Args:**

- `input`: 枚举的配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ListAgentRuntimesOutput: 创建的 Runtime 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `create_agent_runtime_endpoint`

```python
def create_agent_runtime_endpoint(self, agent_id: str, input: CreateAgentRuntimeEndpointInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```

创建 Agent Runtime 访问端点

**Args:**

- `agent_id`: Agent Runtime ID
- `input`: 端点配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

AgentRuntimeEndpoint: 创建的 Runtime 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `create_agent_runtime_endpoint_async`

```python
async def create_agent_runtime_endpoint_async(self, agent_id: str, input: CreateAgentRuntimeEndpointInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```

创建 Agent Runtime 访问端点

**Args:**

- `agent_id`: Agent Runtime ID
- `input`: 端点配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

AgentRuntimeEndpoint: 创建的 Runtime 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `delete_agent_runtime_endpoint`

```python
def delete_agent_runtime_endpoint(self, agent_id: str, endpoint_id: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```

删除 Agent Runtime 访问端点

**Args:**

- `agent_id`: Agent Runtime ID
- `endpoint_id`: 端点 ID
- `headers`: 请求头
- `config`: 配置

**Returns:**

AgentRuntimeEndpoint: 创建的 Runtime 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `delete_agent_runtime_endpoint_async`

```python
async def delete_agent_runtime_endpoint_async(self, agent_id: str, endpoint_id: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```

删除 Agent Runtime 访问端点

**Args:**

- `agent_id`: Agent Runtime ID
- `endpoint_id`: 端点 ID
- `headers`: 请求头
- `config`: 配置

**Returns:**

AgentRuntimeEndpoint: 创建的 Runtime 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `update_agent_runtime_endpoint`

```python
def update_agent_runtime_endpoint(self, agent_id: str, endpoint_id: str, input: UpdateAgentRuntimeEndpointInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```

更新 Agent Runtime 访问端点

**Args:**

- `agent_id`: Agent Runtime ID
- `endpoint_id`: 端点 ID
- `input`: 端点配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

AgentRuntimeEndpoint: 创建的 Runtime 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `update_agent_runtime_endpoint_async`

```python
async def update_agent_runtime_endpoint_async(self, agent_id: str, endpoint_id: str, input: UpdateAgentRuntimeEndpointInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```

更新 Agent Runtime 访问端点

**Args:**

- `agent_id`: Agent Runtime ID
- `endpoint_id`: 端点 ID
- `input`: 端点配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

AgentRuntimeEndpoint: 创建的 Runtime 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `get_agent_runtime_endpoint`

```python
def get_agent_runtime_endpoint(self, agent_id: str, endpoint_id: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```

获取 Agent Runtime 访问端点

**Args:**

- `agent_id`: Agent Runtime ID
- `endpoint_id`: 端点 ID
- `headers`: 请求头
- `config`: 配置

**Returns:**

AgentRuntimeEndpoint: 创建的 Runtime 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `get_agent_runtime_endpoint_async`

```python
async def get_agent_runtime_endpoint_async(self, agent_id: str, endpoint_id: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```

获取 Agent Runtime 访问端点

**Args:**

- `agent_id`: Agent Runtime ID
- `endpoint_id`: 端点 ID
- `headers`: 请求头
- `config`: 配置

**Returns:**

AgentRuntimeEndpoint: 创建的 Runtime 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `list_agent_runtime_endpoints`

```python
def list_agent_runtime_endpoints(self, agent_id: str, input: ListAgentRuntimeEndpointsRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ListAgentRuntimeEndpointsOutput
```

枚举 Agent Runtime 访问端点

**Args:**

- `agent_id`: Agent Runtime ID
- `input`: 枚举的配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ListAgentRuntimeEndpointsOutput: 创建的 Runtime 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `list_agent_runtime_endpoints_async`

```python
async def list_agent_runtime_endpoints_async(self, agent_id: str, input: ListAgentRuntimeEndpointsRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ListAgentRuntimeEndpointsOutput
```

枚举 Agent Runtime 访问端点

**Args:**

- `agent_id`: Agent Runtime ID
- `input`: 枚举的配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ListAgentRuntimeEndpointsOutput: 创建的 Runtime 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `list_agent_runtime_versions`

```python
def list_agent_runtime_versions(self, agent_id: str, input: ListAgentRuntimeVersionsRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ListAgentRuntimeVersionsOutput
```

枚举 Agent Runtime 版本

**Args:**

- `agent_id`: Agent Runtime ID
- `input`: 版本配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ListAgentRuntimeVersionsOutput: Agent Runtime 版本

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `list_agent_runtime_versions_async`

```python
async def list_agent_runtime_versions_async(self, agent_id: str, input: ListAgentRuntimeVersionsRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ListAgentRuntimeVersionsOutput
```

枚举 Agent Runtime 版本

**Args:**

- `agent_id`: Agent Runtime ID
- `input`: 版本配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ListAgentRuntimeVersionsOutput: Agent Runtime 版本

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---




