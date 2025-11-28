---
sidebar_position: 2
title: Endpoint
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Endpoint

Agent Runtime 端点资源 / Agent Runtime Endpoint Resource

此模块定义 Agent Runtime 端点的高级API。
This module defines the high-level API for Agent Runtime Endpoint.

## 类

## AgentRuntimeEndpoint

```python
class AgentRuntimeEndpoint(AgentRuntimeEndpointMutableProps, AgentRuntimeEndpointImmutableProps, AgentRuntimeEndpointSystemProps, ResourceBase)
```

智能体运行时端点信息 / Agent Runtime Endpoint Information

提供端点的创建、删除、更新、查询功能。
Provides create, delete, update, and query functions for endpoints.

### 方法

#### 🔹 `create_by_id_async`

```python
async def create_by_id_async(cls, agent_runtime_id: str, input: AgentRuntimeEndpointCreateInput, config: Optional[Config] = None)
```

根据 ID 异步创建端点 / Create endpoint by ID asynchronously

**Args:**

- `agent_runtime_id`: Agent Runtime ID
- `input`: 端点创建配置 / Endpoint creation configuration
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntimeEndpoint: 创建的端点对象 / Created endpoint object

**Raises:**

- `ResourceAlreadyExistError`: 资源已存在 / Resource already exists
- `ResourceNotExistError`: Agent Runtime 不存在 / Agent Runtime does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `create_by_id`

```python
def create_by_id(cls, agent_runtime_id: str, input: AgentRuntimeEndpointCreateInput, config: Optional[Config] = None)
```

根据 ID 同步创建端点 / Create endpoint by ID asynchronously

**Args:**

- `agent_runtime_id`: Agent Runtime ID
- `input`: 端点创建配置 / Endpoint creation configuration
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntimeEndpoint: 创建的端点对象 / Created endpoint object

**Raises:**

- `ResourceAlreadyExistError`: 资源已存在 / Resource already exists
- `ResourceNotExistError`: Agent Runtime 不存在 / Agent Runtime does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `delete_by_id_async`

```python
async def delete_by_id_async(cls, agent_runtime_id: str, endpoint_id: str, config: Optional[Config] = None)
```

根据 ID 异步删除端点 / Delete endpoint by ID asynchronously

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


#### 🔹 `delete_by_id`

```python
def delete_by_id(cls, agent_runtime_id: str, endpoint_id: str, config: Optional[Config] = None)
```

根据 ID 同步删除端点 / Delete endpoint by ID asynchronously

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


#### 🔹 `update_by_id_async`

```python
async def update_by_id_async(cls, agent_runtime_id: str, endpoint_id: str, input: AgentRuntimeEndpointUpdateInput, config: Optional[Config] = None)
```

根据 ID 异步更新端点 / Update endpoint by ID asynchronously

**Args:**

- `agent_runtime_id`: Agent Runtime ID
- `endpoint_id`: 端点 ID / Endpoint ID
- `input`: 端点更新配置 / Endpoint update configuration
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntimeEndpoint: 更新后的端点对象 / Updated endpoint object

**Raises:**

- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `update_by_id`

```python
def update_by_id(cls, agent_runtime_id: str, endpoint_id: str, input: AgentRuntimeEndpointUpdateInput, config: Optional[Config] = None)
```

根据 ID 同步更新端点 / Update endpoint by ID asynchronously

**Args:**

- `agent_runtime_id`: Agent Runtime ID
- `endpoint_id`: 端点 ID / Endpoint ID
- `input`: 端点更新配置 / Endpoint update configuration
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntimeEndpoint: 更新后的端点对象 / Updated endpoint object

**Raises:**

- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `get_by_id_async`

```python
async def get_by_id_async(cls, agent_runtime_id: str, endpoint_id: str, config: Optional[Config] = None)
```

根据 ID 异步获取端点 / Get endpoint by ID asynchronously

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


#### 🔹 `get_by_id`

```python
def get_by_id(cls, agent_runtime_id: str, endpoint_id: str, config: Optional[Config] = None)
```

根据 ID 同步获取端点 / Get endpoint by ID asynchronously

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


#### 🔹 `list_by_id_async`

```python
async def list_by_id_async(cls, agent_runtime_id: str, config: Optional[Config] = None)
```

根据 Agent Runtime ID 异步列出所有端点 / List all endpoints by Agent Runtime ID asynchronously

此方法会自动分页获取所有端点并去重。
This method automatically paginates to get all endpoints and deduplicates them.

**Args:**

- `agent_runtime_id`: Agent Runtime ID
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

List[AgentRuntimeEndpoint]: 端点对象列表 / List of endpoint objects

**Raises:**

- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `list_by_id`

```python
def list_by_id(cls, agent_runtime_id: str, config: Optional[Config] = None)
```

根据 Agent Runtime ID 同步列出所有端点 / List all endpoints by Agent Runtime ID asynchronously

此方法会自动分页获取所有端点并去重。
This method automatically paginates to get all endpoints and deduplicates them.

**Args:**

- `agent_runtime_id`: Agent Runtime ID
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

List[AgentRuntimeEndpoint]: 端点对象列表 / List of endpoint objects

**Raises:**

- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `delete_async`

```python
async def delete_async(self, config: Optional[Config] = None) -> 'AgentRuntimeEndpoint'
```

异步删除当前端点 / Delete current endpoint asynchronously

**Args:**

- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntimeEndpoint: 删除后的端点对象(self) / Deleted endpoint object (self)

**Raises:**

- `ValueError`: 当 agent_runtime_id 或 agent_runtime_endpoint_id 为空时 / When agent_runtime_id or agent_runtime_endpoint_id is None
- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `delete`

```python
def delete(self, config: Optional[Config] = None) -> 'AgentRuntimeEndpoint'
```

同步删除当前端点 / Delete current endpoint asynchronously

**Args:**

- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntimeEndpoint: 删除后的端点对象(self) / Deleted endpoint object (self)

**Raises:**

- `ValueError`: 当 agent_runtime_id 或 agent_runtime_endpoint_id 为空时 / When agent_runtime_id or agent_runtime_endpoint_id is None
- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `update_async`

```python
async def update_async(self, input: AgentRuntimeEndpointUpdateInput, config: Optional[Config] = None) -> Self
```

异步更新当前端点 / Update current endpoint asynchronously

**Args:**

- `input`: 端点更新配置 / Endpoint update configuration
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

Self: 更新后的端点对象(self) / Updated endpoint object (self)

**Raises:**

- `ValueError`: 当 agent_runtime_id 或 agent_runtime_endpoint_id 为空时 / When agent_runtime_id or agent_runtime_endpoint_id is None
- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `update`

```python
def update(self, input: AgentRuntimeEndpointUpdateInput, config: Optional[Config] = None) -> Self
```

同步更新当前端点 / Update current endpoint asynchronously

**Args:**

- `input`: 端点更新配置 / Endpoint update configuration
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

Self: 更新后的端点对象(self) / Updated endpoint object (self)

**Raises:**

- `ValueError`: 当 agent_runtime_id 或 agent_runtime_endpoint_id 为空时 / When agent_runtime_id or agent_runtime_endpoint_id is None
- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `get_async`

```python
async def get_async(self, config: Optional[Config] = None)
```

异步获取当前端点信息 / Get current endpoint information asynchronously

**Args:**

- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntimeEndpoint: 获取后的端点对象(self) / Retrieved endpoint object (self)

**Raises:**

- `ValueError`: 当 agent_runtime_id 或 agent_runtime_endpoint_id 为空时 / When agent_runtime_id or agent_runtime_endpoint_id is None
- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `get`

```python
def get(self, config: Optional[Config] = None)
```

同步获取当前端点信息 / Get current endpoint information asynchronously

**Args:**

- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntimeEndpoint: 获取后的端点对象(self) / Retrieved endpoint object (self)

**Raises:**

- `ValueError`: 当 agent_runtime_id 或 agent_runtime_endpoint_id 为空时 / When agent_runtime_id or agent_runtime_endpoint_id is None
- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `refresh_async`

```python
async def refresh_async(self, config: Optional[Config] = None)
```

刷新当前端点信息 / Refresh current endpoint information

这是 get_async 的别名方法。
This is an alias method for get_async.

**Args:**

- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntimeEndpoint: 刷新后的端点对象(self) / Refreshed endpoint object (self)

**Raises:**

- `ValueError`: 当 agent_runtime_id 或 agent_runtime_endpoint_id 为空时 / When agent_runtime_id or agent_runtime_endpoint_id is None
- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `refresh`

```python
def refresh(self, config: Optional[Config] = None)
```

刷新当前端点信息 / Refresh current endpoint information

这是 get 的别名方法。
This is an alias method for get.

**Args:**

- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntimeEndpoint: 刷新后的端点对象(self) / Refreshed endpoint object (self)

**Raises:**

- `ValueError`: 当 agent_runtime_id 或 agent_runtime_endpoint_id 为空时 / When agent_runtime_id or agent_runtime_endpoint_id is None
- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `invoke_openai_async`

```python
async def invoke_openai_async(self, **kwargs: Unpack[InvokeArgs])
```


---


#### 🔹 `invoke_openai`

```python
def invoke_openai(self, **kwargs: Unpack[InvokeArgs])
```


---




