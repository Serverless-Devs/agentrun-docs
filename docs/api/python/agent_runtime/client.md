---
sidebar_position: 1
title: Client
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Client

Agent Runtime 客户端 / Agent Runtime Client

此模块提供 Agent Runtime 的客户端API,用于管理智能体运行时。
This module provides the client API for Agent Runtime to manage agent runtimes.

## 类

## AgentRuntimeClient

```python
class AgentRuntimeClient
```

Agent Runtime 客户端 / Agent Runtime Client

提供 Agent Runtime 的创建、删除、更新、查询和端点管理功能。
Provides create, delete, update, query and endpoint management functions for Agent Runtime.

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, config: Optional[Config] = None)
```

初始化客户端 / Initialize client

**Args:**

- `config`: 配置对象,可选 / Configuration object, optional

---


#### 🔹 `create_async`

```python
async def create_async(self, input: AgentRuntimeCreateInput, config: Optional[Config] = None) -> AgentRuntime
```

异步创建 Agent Runtime / Create Agent Runtime asynchronously

**Args:**

- `input`: Agent Runtime 创建配置 / Agent Runtime creation configuration
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntime: 创建的 Agent Runtime 对象 / Created Agent Runtime object

**Raises:**

- `ValueError`: 当既未提供代码配置也未提供容器配置时 / When neither code nor container configuration is provided
- `ResourceAlreadyExistError`: 资源已存在 / Resource already exists
- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `create`

```python
def create(self, input: AgentRuntimeCreateInput, config: Optional[Config] = None) -> AgentRuntime
```

同步创建 Agent Runtime / Create Agent Runtime asynchronously

**Args:**

- `input`: Agent Runtime 创建配置 / Agent Runtime creation configuration
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntime: 创建的 Agent Runtime 对象 / Created Agent Runtime object

**Raises:**

- `ValueError`: 当既未提供代码配置也未提供容器配置时 / When neither code nor container configuration is provided
- `ResourceAlreadyExistError`: 资源已存在 / Resource already exists
- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `delete_async`

```python
async def delete_async(self, id: str, config: Optional[Config] = None) -> AgentRuntime
```

异步删除 Agent Runtime / Delete Agent Runtime asynchronously

**Args:**

- `id`: Agent Runtime ID
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntime: 删除的 Agent Runtime 对象 / Deleted Agent Runtime object

**Raises:**

- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `delete`

```python
def delete(self, id: str, config: Optional[Config] = None) -> AgentRuntime
```

同步删除 Agent Runtime / Delete Agent Runtime asynchronously

**Args:**

- `id`: Agent Runtime ID
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntime: 删除的 Agent Runtime 对象 / Deleted Agent Runtime object

**Raises:**

- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `update_async`

```python
async def update_async(self, id: str, input: AgentRuntimeUpdateInput, config: Optional[Config] = None) -> AgentRuntime
```

异步更新 Agent Runtime / Update Agent Runtime asynchronously

**Args:**

- `id`: Agent Runtime ID
- `input`: Agent Runtime 更新配置 / Agent Runtime update configuration
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntime: 更新后的 Agent Runtime 对象 / Updated Agent Runtime object

**Raises:**

- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `update`

```python
def update(self, id: str, input: AgentRuntimeUpdateInput, config: Optional[Config] = None) -> AgentRuntime
```

同步更新 Agent Runtime / Update Agent Runtime asynchronously

**Args:**

- `id`: Agent Runtime ID
- `input`: Agent Runtime 更新配置 / Agent Runtime update configuration
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntime: 更新后的 Agent Runtime 对象 / Updated Agent Runtime object

**Raises:**

- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `get_async`

```python
async def get_async(self, id: str, config: Optional[Config] = None) -> AgentRuntime
```

异步获取 Agent Runtime / Get Agent Runtime asynchronously

**Args:**

- `id`: Agent Runtime ID
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntime: Agent Runtime 对象 / Agent Runtime object

**Raises:**

- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `get`

```python
def get(self, id: str, config: Optional[Config] = None) -> AgentRuntime
```

同步获取 Agent Runtime / Get Agent Runtime asynchronously

**Args:**

- `id`: Agent Runtime ID
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntime: Agent Runtime 对象 / Agent Runtime object

**Raises:**

- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `list_async`

```python
async def list_async(self, input: Optional[AgentRuntimeListInput] = None, config: Optional[Config] = None) -> List[AgentRuntime]
```

异步列出 Agent Runtimes / List Agent Runtimes asynchronously

**Args:**

- `input`: 列表查询配置,可选 / List query configuration, optional
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

List[AgentRuntime]: Agent Runtime 对象列表 / List of Agent Runtime objects

**Raises:**

- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `list`

```python
def list(self, input: Optional[AgentRuntimeListInput] = None, config: Optional[Config] = None) -> List[AgentRuntime]
```

同步列出 Agent Runtimes / List Agent Runtimes asynchronously

**Args:**

- `input`: 列表查询配置,可选 / List query configuration, optional
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

List[AgentRuntime]: Agent Runtime 对象列表 / List of Agent Runtime objects

**Raises:**

- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `create_endpoint_async`

```python
async def create_endpoint_async(self, agent_runtime_id: str, endpoint: AgentRuntimeEndpointCreateInput, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```

异步创建 Agent Runtime 端点 / Create Agent Runtime Endpoint asynchronously

**Args:**

- `agent_runtime_id`: Agent Runtime ID
- `endpoint`: 端点创建配置 / Endpoint creation configuration
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntimeEndpoint: 创建的端点对象 / Created endpoint object

**Raises:**

- `ResourceAlreadyExistError`: 资源已存在 / Resource already exists
- `ResourceNotExistError`: Agent Runtime 不存在 / Agent Runtime does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `create_endpoint`

```python
def create_endpoint(self, agent_runtime_id: str, endpoint: AgentRuntimeEndpointCreateInput, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```

同步创建 Agent Runtime 端点 / Create Agent Runtime Endpoint asynchronously

**Args:**

- `agent_runtime_id`: Agent Runtime ID
- `endpoint`: 端点创建配置 / Endpoint creation configuration
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntimeEndpoint: 创建的端点对象 / Created endpoint object

**Raises:**

- `ResourceAlreadyExistError`: 资源已存在 / Resource already exists
- `ResourceNotExistError`: Agent Runtime 不存在 / Agent Runtime does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `delete_endpoint_async`

```python
async def delete_endpoint_async(self, agent_runtime_id: str, endpoint_id: str, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```

异步删除 Agent Runtime 端点 / Delete Agent Runtime Endpoint asynchronously

**Args:**

- `agent_runtime_id`: Agent Runtime ID
- `endpoint_id`: 端点 ID / Endpoint ID
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntimeEndpoint: 删除的端点对象 / Deleted endpoint object

**Raises:**

- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `delete_endpoint`

```python
def delete_endpoint(self, agent_runtime_id: str, endpoint_id: str, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```

同步删除 Agent Runtime 端点 / Delete Agent Runtime Endpoint asynchronously

**Args:**

- `agent_runtime_id`: Agent Runtime ID
- `endpoint_id`: 端点 ID / Endpoint ID
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntimeEndpoint: 删除的端点对象 / Deleted endpoint object

**Raises:**

- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `update_endpoint_async`

```python
async def update_endpoint_async(self, agent_runtime_id: str, endpoint_id: str, endpoint: AgentRuntimeEndpointUpdateInput, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```

异步更新 Agent Runtime 端点 / Update Agent Runtime Endpoint asynchronously

**Args:**

- `agent_runtime_id`: Agent Runtime ID
- `endpoint_id`: 端点 ID / Endpoint ID
- `endpoint`: 端点更新配置 / Endpoint update configuration
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntimeEndpoint: 更新后的端点对象 / Updated endpoint object

**Raises:**

- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `update_endpoint`

```python
def update_endpoint(self, agent_runtime_id: str, endpoint_id: str, endpoint: AgentRuntimeEndpointUpdateInput, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```

同步更新 Agent Runtime 端点 / Update Agent Runtime Endpoint asynchronously

**Args:**

- `agent_runtime_id`: Agent Runtime ID
- `endpoint_id`: 端点 ID / Endpoint ID
- `endpoint`: 端点更新配置 / Endpoint update configuration
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntimeEndpoint: 更新后的端点对象 / Updated endpoint object

**Raises:**

- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `get_endpoint_async`

```python
async def get_endpoint_async(self, agent_runtime_id: str, endpoint_id: str, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```

异步获取 Agent Runtime 端点 / Get Agent Runtime Endpoint asynchronously

**Args:**

- `agent_runtime_id`: Agent Runtime ID
- `endpoint_id`: 端点 ID / Endpoint ID
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntimeEndpoint: 端点对象 / Endpoint object

**Raises:**

- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `get_endpoint`

```python
def get_endpoint(self, agent_runtime_id: str, endpoint_id: str, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```

同步获取 Agent Runtime 端点 / Get Agent Runtime Endpoint asynchronously

**Args:**

- `agent_runtime_id`: Agent Runtime ID
- `endpoint_id`: 端点 ID / Endpoint ID
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntimeEndpoint: 端点对象 / Endpoint object

**Raises:**

- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `list_endpoints_async`

```python
async def list_endpoints_async(self, agent_runtime_id: str, input: Optional[AgentRuntimeEndpointListInput] = None, config: Optional[Config] = None) -> List[AgentRuntimeEndpoint]
```

异步列出 Agent Runtime 端点 / List Agent Runtime Endpoints asynchronously

**Args:**

- `agent_runtime_id`: Agent Runtime ID
- `input`: 列表查询配置,可选 / List query configuration, optional
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

List[AgentRuntimeEndpoint]: 端点对象列表 / List of endpoint objects

**Raises:**

- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `list_endpoints`

```python
def list_endpoints(self, agent_runtime_id: str, input: Optional[AgentRuntimeEndpointListInput] = None, config: Optional[Config] = None) -> List[AgentRuntimeEndpoint]
```

同步列出 Agent Runtime 端点 / List Agent Runtime Endpoints asynchronously

**Args:**

- `agent_runtime_id`: Agent Runtime ID
- `input`: 列表查询配置,可选 / List query configuration, optional
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

List[AgentRuntimeEndpoint]: 端点对象列表 / List of endpoint objects

**Raises:**

- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `list_versions_async`

```python
async def list_versions_async(self, agent_runtime_id: str, input: Optional[AgentRuntimeVersionListInput] = None, config: Optional[Config] = None) -> List[AgentRuntimeVersion]
```

异步列出 Agent Runtime 版本 / List Agent Runtime Versions asynchronously

**Args:**

- `agent_runtime_id`: Agent Runtime ID
- `input`: 列表查询配置,可选 / List query configuration, optional
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

List[AgentRuntimeVersion]: 版本对象列表 / List of version objects

**Raises:**

- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `list_versions`

```python
def list_versions(self, agent_runtime_id: str, input: Optional[AgentRuntimeVersionListInput] = None, config: Optional[Config] = None) -> List[AgentRuntimeVersion]
```

同步列出 Agent Runtime 版本 / List Agent Runtime Versions asynchronously

**Args:**

- `agent_runtime_id`: Agent Runtime ID
- `input`: 列表查询配置,可选 / List query configuration, optional
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

List[AgentRuntimeVersion]: 版本对象列表 / List of version objects

**Raises:**

- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `invoke_openai_async`

```python
async def invoke_openai_async(self, agent_runtime_name: str, agent_runtime_endpoint_name: str = 'Default', **kwargs: Unpack[InvokeArgs])
```


---


#### 🔹 `invoke_openai`

```python
def invoke_openai(self, agent_runtime_name: str, agent_runtime_endpoint_name: str = 'Default', **kwargs: Unpack[InvokeArgs])
```


---




