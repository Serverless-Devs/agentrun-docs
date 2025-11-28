---
sidebar_position: 1
title: Client
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Client

Model Service 客户端 / Model Service Client

此模块提供模型服务和模型代理的客户端API。
This module provides the client API for model services and model proxies.

## 类

## ModelClient

```python
class ModelClient
```

Model Service 客户端 / Model Service Client

提供模型服务和模型代理的创建、删除、更新和查询功能。
Provides create, delete, update and query functions for model services and model proxies.

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
async def create_async(self, input: ModelServiceCreateInput, config: Optional[Config] = None) -> ModelService
```


---


#### 🔹 `create`

```python
def create(self, input: ModelServiceCreateInput, config: Optional[Config] = None) -> ModelService
```


---


#### 🔹 `create_async`

```python
async def create_async(self, input: ModelProxyCreateInput, config: Optional[Config] = None) -> ModelProxy
```


---


#### 🔹 `create`

```python
def create(self, input: ModelProxyCreateInput, config: Optional[Config] = None) -> ModelProxy
```


---


#### 🔹 `create_async`

```python
async def create_async(self, input: Union[ModelServiceCreateInput, ModelProxyCreateInput], config: Optional[Config] = None)
```

创建模型服务（异步）

**Args:**

- `input`: 模型服务输入参数
- `config`: 配置

**Returns:**

model: 创建的对象

---


#### 🔹 `create`

```python
def create(self, input: Union[ModelServiceCreateInput, ModelProxyCreateInput], config: Optional[Config] = None)
```

创建模型服务（同步）

**Args:**

- `input`: 模型服务输入参数
- `config`: 配置

**Returns:**

model: 创建的对象

---


#### 🔹 `delete_async`

```python
async def delete_async(self, name: str, backend_type: Literal[BackendType.PROXY], config: Optional[Config] = None) -> ModelProxy
```


---


#### 🔹 `delete`

```python
def delete(self, name: str, backend_type: Literal[BackendType.PROXY], config: Optional[Config] = None) -> ModelProxy
```


---


#### 🔹 `delete_async`

```python
async def delete_async(self, name: str, backend_type: Literal[BackendType.SERVICE], config: Optional[Config] = None) -> ModelService
```


---


#### 🔹 `delete`

```python
def delete(self, name: str, backend_type: Literal[BackendType.SERVICE], config: Optional[Config] = None) -> ModelService
```


---


#### 🔹 `delete_async`

```python
async def delete_async(self, name: str, backend_type: None = None, config: Optional[Config] = None) -> Union[ModelProxy, ModelService]
```


---


#### 🔹 `delete`

```python
def delete(self, name: str, backend_type: None = None, config: Optional[Config] = None) -> Union[ModelProxy, ModelService]
```


---


#### 🔹 `delete_async`

```python
async def delete_async(self, name: str, backend_type: Optional[BackendType] = None, config: Optional[Config] = None)
```

删除模型服务（异步）

**Args:**

- `model_service_name`: 模型服务名称
- `config`: 配置

**Raises:**

- `ResourceNotExistError`: 模型服务不存在

---


#### 🔹 `delete`

```python
def delete(self, name: str, backend_type: Optional[BackendType] = None, config: Optional[Config] = None)
```

删除模型服务（同步）

**Args:**

- `model_service_name`: 模型服务名称
- `config`: 配置

**Raises:**

- `ResourceNotExistError`: 模型服务不存在

---


#### 🔹 `update_async`

```python
async def update_async(self, name: str, input: ModelServiceUpdateInput, config: Optional[Config] = None) -> ModelService
```


---


#### 🔹 `update`

```python
def update(self, name: str, input: ModelServiceUpdateInput, config: Optional[Config] = None) -> ModelService
```


---


#### 🔹 `update_async`

```python
async def update_async(self, name: str, input: ModelProxyUpdateInput, config: Optional[Config] = None) -> ModelProxy
```


---


#### 🔹 `update`

```python
def update(self, name: str, input: ModelProxyUpdateInput, config: Optional[Config] = None) -> ModelProxy
```


---


#### 🔹 `update_async`

```python
async def update_async(self, name: str, input: Union[ModelServiceUpdateInput, ModelProxyUpdateInput], config: Optional[Config] = None)
```

更新模型服务（异步）

**Args:**

- `model_service_name`: 模型服务名称
- `input`: 模型服务更新输入参数
- `config`: 配置

**Returns:**

ModelService: 更新后的模型服务对象

**Raises:**

- `ResourceNotExistError`: 模型服务不存在

---


#### 🔹 `update`

```python
def update(self, name: str, input: Union[ModelServiceUpdateInput, ModelProxyUpdateInput], config: Optional[Config] = None)
```

更新模型服务（同步）

**Args:**

- `model_service_name`: 模型服务名称
- `input`: 模型服务更新输入参数
- `config`: 配置

**Returns:**

ModelService: 更新后的模型服务对象

**Raises:**

- `ResourceNotExistError`: 模型服务不存在

---


#### 🔹 `get_async`

```python
async def get_async(self, name: str, backend_type: Literal[BackendType.SERVICE], config: Optional[Config] = None) -> ModelService
```


---


#### 🔹 `get`

```python
def get(self, name: str, backend_type: Literal[BackendType.SERVICE], config: Optional[Config] = None) -> ModelService
```


---


#### 🔹 `get_async`

```python
async def get_async(self, name: str, backend_type: Literal[BackendType.PROXY], config: Optional[Config] = None) -> ModelProxy
```


---


#### 🔹 `get`

```python
def get(self, name: str, backend_type: Literal[BackendType.PROXY], config: Optional[Config] = None) -> ModelProxy
```


---


#### 🔹 `get_async`

```python
async def get_async(self, name: str, backend_type: None = None, config: Optional[Config] = None) -> Union[ModelService, ModelProxy]
```


---


#### 🔹 `get`

```python
def get(self, name: str, backend_type: None = None, config: Optional[Config] = None) -> Union[ModelService, ModelProxy]
```


---


#### 🔹 `get_async`

```python
async def get_async(self, name: str, backend_type: Optional[BackendType] = None, config: Optional[Config] = None)
```

获取模型服务（异步）

**Args:**

- `model_service_name`: 模型服务名称
- `config`: 配置

**Returns:**

ModelService: 模型服务对象

**Raises:**

- `ResourceNotExistError`: 模型服务不存在

---


#### 🔹 `get`

```python
def get(self, name: str, backend_type: Optional[BackendType] = None, config: Optional[Config] = None)
```

获取模型服务（同步）

**Args:**

- `model_service_name`: 模型服务名称
- `config`: 配置

**Returns:**

ModelService: 模型服务对象

**Raises:**

- `ResourceNotExistError`: 模型服务不存在

---


#### 🔹 `list_async`

```python
async def list_async(self, input: ModelProxyListInput, config: Optional[Config] = None) -> List[ModelProxy]
```


---


#### 🔹 `list`

```python
def list(self, input: ModelProxyListInput, config: Optional[Config] = None) -> List[ModelProxy]
```


---


#### 🔹 `list_async`

```python
async def list_async(self, input: ModelServiceListInput, config: Optional[Config] = None) -> List[ModelService]
```


---


#### 🔹 `list`

```python
def list(self, input: ModelServiceListInput, config: Optional[Config] = None) -> List[ModelService]
```


---


#### 🔹 `list_async`

```python
async def list_async(self, input: Union[ModelServiceListInput, ModelProxyListInput], config: Optional[Config] = None)
```

列出模型服务（异步）

**Args:**

- `input`: 分页查询参数
- `config`: 配置

**Returns:**

List[ModelService]: 模型服务列表

---


#### 🔹 `list`

```python
def list(self, input: Union[ModelServiceListInput, ModelProxyListInput], config: Optional[Config] = None)
```

列出模型服务（同步）

**Args:**

- `input`: 分页查询参数
- `config`: 配置

**Returns:**

List[ModelService]: 模型服务列表

---




