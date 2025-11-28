---
sidebar_position: 4
title: Runtime
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Runtime

Agent Runtime 高层 API / Agent Runtime High-Level API

此模块定义 Agent Runtime 资源的高级API。
This module defines the high-level API for Agent Runtime resources.

## 类

## AgentRuntime

```python
class AgentRuntime(AgentRuntimeMutableProps, AgentRuntimeImmutableProps, AgentRuntimeSystemProps, ResourceBase)
```

Agent Runtime 资源 / Agent Runtime Resource

提供 Agent Runtime 的完整生命周期管理,包括创建、删除、更新、查询,
以及端点和版本管理。
Provides complete lifecycle management for Agent Runtime, including create,
delete, update, query, and endpoint/version management.

### 方法

#### 🔹 `create_async`

```python
async def create_async(cls, input: AgentRuntimeCreateInput, config: Optional[Config] = None)
```

异步创建 Agent Runtime / Create Agent Runtime asynchronously

**Args:**

- `input`: Agent Runtime 创建配置 / Agent Runtime creation configuration
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntime: 创建的 Agent Runtime 对象 / Created Agent Runtime object

**Raises:**

- `ValueError`: 配置参数错误 / Configuration parameter error
- `ResourceAlreadyExistError`: 资源已存在 / Resource already exists
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `create`

```python
def create(cls, input: AgentRuntimeCreateInput, config: Optional[Config] = None)
```

同步创建 Agent Runtime / Create Agent Runtime asynchronously

**Args:**

- `input`: Agent Runtime 创建配置 / Agent Runtime creation configuration
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntime: 创建的 Agent Runtime 对象 / Created Agent Runtime object

**Raises:**

- `ValueError`: 配置参数错误 / Configuration parameter error
- `ResourceAlreadyExistError`: 资源已存在 / Resource already exists
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `delete_by_id_async`

```python
async def delete_by_id_async(cls, id: str, config: Optional[Config] = None)
```

根据 ID 异步删除 Agent Runtime / Delete Agent Runtime by ID asynchronously

此方法会先删除所有关联的端点,然后再删除 Agent Runtime。
This method will first delete all associated endpoints, then delete the Agent Runtime.

**Args:**

- `id`: Agent Runtime ID
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntime: 删除的 Agent Runtime 对象 / Deleted Agent Runtime object

**Raises:**

- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `delete_by_id`

```python
def delete_by_id(cls, id: str, config: Optional[Config] = None)
```

根据 ID 同步删除 Agent Runtime / Delete Agent Runtime by ID asynchronously

此方法会先删除所有关联的端点,然后再删除 Agent Runtime。
This method will first delete all associated endpoints, then delete the Agent Runtime.

**Args:**

- `id`: Agent Runtime ID
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntime: 删除的 Agent Runtime 对象 / Deleted Agent Runtime object

**Raises:**

- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `update_by_id_async`

```python
async def update_by_id_async(cls, id: str, input: AgentRuntimeUpdateInput, config: Optional[Config] = None)
```

根据 ID 异步更新 Agent Runtime / Update Agent Runtime by ID asynchronously

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


#### 🔹 `update_by_id`

```python
def update_by_id(cls, id: str, input: AgentRuntimeUpdateInput, config: Optional[Config] = None)
```

根据 ID 同步更新 Agent Runtime / Update Agent Runtime by ID asynchronously

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


#### 🔹 `get_by_id_async`

```python
async def get_by_id_async(cls, id: str, config: Optional[Config] = None)
```

根据 ID 异步获取 Agent Runtime / Get Agent Runtime by ID asynchronously

**Args:**

- `id`: Agent Runtime ID
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntime: Agent Runtime 对象 / Agent Runtime object

**Raises:**

- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `get_by_id`

```python
def get_by_id(cls, id: str, config: Optional[Config] = None)
```

根据 ID 同步获取 Agent Runtime / Get Agent Runtime by ID asynchronously

**Args:**

- `id`: Agent Runtime ID
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

AgentRuntime: Agent Runtime 对象 / Agent Runtime object

**Raises:**

- `ResourceNotExistError`: 资源不存在 / Resource does not exist
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `list_all_async`

```python
async def list_all_async(cls) -> List['AgentRuntime']
```


---


#### 🔹 `list_all`

```python
def list_all(cls) -> List['AgentRuntime']
```


---


#### 🔹 `list_async`

```python
async def list_async(cls, config: Optional[Config] = None)
```

异步列出所有 Agent Runtimes / List all Agent Runtimes asynchronously

此方法会自动分页获取所有 Agent Runtimes 并去重。
This method automatically paginates to get all Agent Runtimes and deduplicates them.

**Args:**

- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

List[AgentRuntime]: Agent Runtime 对象列表 / List of Agent Runtime objects

**Raises:**

- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `list`

```python
def list(cls, config: Optional[Config] = None)
```

同步列出所有 Agent Runtimes / List all Agent Runtimes asynchronously

此方法会自动分页获取所有 Agent Runtimes 并去重。
This method automatically paginates to get all Agent Runtimes and deduplicates them.

**Args:**

- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

List[AgentRuntime]: Agent Runtime 对象列表 / List of Agent Runtime objects

**Raises:**

- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `create_endpoint_by_id_async`

```python
async def create_endpoint_by_id_async(cls, agent_runtime_id: str, input: AgentRuntimeEndpointCreateInput, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```


---


#### 🔹 `create_endpoint_by_id`

```python
def create_endpoint_by_id(cls, agent_runtime_id: str, input: AgentRuntimeEndpointCreateInput, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```


---


#### 🔹 `delete_endpoint_by_id_async`

```python
async def delete_endpoint_by_id_async(cls, agent_runtime_id: str, endpoint_id: str, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```


---


#### 🔹 `delete_endpoint_by_id`

```python
def delete_endpoint_by_id(cls, agent_runtime_id: str, endpoint_id: str, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```


---


#### 🔹 `update_endpoint_by_id_async`

```python
async def update_endpoint_by_id_async(cls, agent_runtime_id: str, endpoint_id: str, input: AgentRuntimeEndpointUpdateInput, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```


---


#### 🔹 `update_endpoint_by_id`

```python
def update_endpoint_by_id(cls, agent_runtime_id: str, endpoint_id: str, input: AgentRuntimeEndpointUpdateInput, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```


---


#### 🔹 `get_endpoint_by_id_async`

```python
async def get_endpoint_by_id_async(cls, agent_runtime_id: str, endpoint_id: str, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```


---


#### 🔹 `get_endpoint_by_id`

```python
def get_endpoint_by_id(cls, agent_runtime_id: str, endpoint_id: str, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```


---


#### 🔹 `list_endpoints_by_id_async`

```python
async def list_endpoints_by_id_async(cls, agent_runtime_id: str, config: Optional[Config] = None) -> List[AgentRuntimeEndpoint]
```


---


#### 🔹 `list_endpoints_by_id`

```python
def list_endpoints_by_id(cls, agent_runtime_id: str, config: Optional[Config] = None) -> List[AgentRuntimeEndpoint]
```


---


#### 🔹 `list_versions_by_id_async`

```python
async def list_versions_by_id_async(cls, agent_runtime_id: str, config: Optional[Config] = None)
```


---


#### 🔹 `list_versions_by_id`

```python
def list_versions_by_id(cls, agent_runtime_id: str, config: Optional[Config] = None)
```


---


#### 🔹 `delete_async`

```python
async def delete_async(self, config: Optional[Config] = None)
```


---


#### 🔹 `delete`

```python
def delete(self, config: Optional[Config] = None)
```


---


#### 🔹 `update_async`

```python
async def update_async(self, input: AgentRuntimeUpdateInput, config: Optional[Config] = None)
```


---


#### 🔹 `update`

```python
def update(self, input: AgentRuntimeUpdateInput, config: Optional[Config] = None)
```


---


#### 🔹 `get_async`

```python
async def get_async(self, config: Optional[Config] = None)
```


---


#### 🔹 `get`

```python
def get(self, config: Optional[Config] = None)
```


---


#### 🔹 `refresh_async`

```python
async def refresh_async(self, config: Optional[Config] = None)
```


---


#### 🔹 `refresh`

```python
def refresh(self, config: Optional[Config] = None)
```


---


#### 🔹 `create_endpoint_async`

```python
async def create_endpoint_async(self, input: AgentRuntimeEndpointCreateInput, config: Optional[Config] = None)
```


---


#### 🔹 `create_endpoint`

```python
def create_endpoint(self, input: AgentRuntimeEndpointCreateInput, config: Optional[Config] = None)
```


---


#### 🔹 `delete_endpoint_async`

```python
async def delete_endpoint_async(self, endpoint_id: str, config: Optional[Config] = None)
```


---


#### 🔹 `delete_endpoint`

```python
def delete_endpoint(self, endpoint_id: str, config: Optional[Config] = None)
```


---


#### 🔹 `update_endpoint_async`

```python
async def update_endpoint_async(self, endpoint_id: str, endpoint: AgentRuntimeEndpointUpdateInput, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```


---


#### 🔹 `update_endpoint`

```python
def update_endpoint(self, endpoint_id: str, endpoint: AgentRuntimeEndpointUpdateInput, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```


---


#### 🔹 `get_endpoint_async`

```python
async def get_endpoint_async(self, endpoint_id: str, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```


---


#### 🔹 `get_endpoint`

```python
def get_endpoint(self, endpoint_id: str, config: Optional[Config] = None) -> AgentRuntimeEndpoint
```


---


#### 🔹 `list_endpoints_async`

```python
async def list_endpoints_async(self, config: Optional[Config] = None) -> List[AgentRuntimeEndpoint]
```


---


#### 🔹 `list_endpoints`

```python
def list_endpoints(self, config: Optional[Config] = None) -> List[AgentRuntimeEndpoint]
```


---


#### 🔹 `list_versions_async`

```python
async def list_versions_async(self, config: Optional[Config] = None) -> List[AgentRuntimeVersion]
```


---


#### 🔹 `list_versions`

```python
def list_versions(self, config: Optional[Config] = None) -> List[AgentRuntimeVersion]
```


---


#### 🔹 `invoke_openai_async`

```python
async def invoke_openai_async(self, agent_runtime_endpoint_name: str = 'Default', **kwargs: Unpack[InvokeArgs])
```


---


#### 🔹 `invoke_openai`

```python
def invoke_openai(self, agent_runtime_endpoint_name: str = 'Default', **kwargs: Unpack[InvokeArgs])
```


---




