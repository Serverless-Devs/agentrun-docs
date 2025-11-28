---
sidebar_position: 1
title: Control
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Control

Model 管控链路 API

## 类

## ModelControlAPI

```python
class ModelControlAPI(ControlAPI)
```

Model 管控链路 API

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, config: Optional[Config] = None)
```

初始化 API 客户端

**Args:**

- `config`: 全局配置对象

---


#### 🔹 `create_model_service`

```python
def create_model_service(self, input: CreateModelServiceInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ModelService
```

创建模型服务

**Args:**

- `input`: 模型服务配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ModelService: 创建的模型服务对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `create_model_service_async`

```python
async def create_model_service_async(self, input: CreateModelServiceInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ModelService
```

创建模型服务

**Args:**

- `input`: 模型服务配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ModelService: 创建的模型服务对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `delete_model_service`

```python
def delete_model_service(self, model_service_name: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ModelService
```

删除模型服务

**Args:**

- `model_service_name`: 模型服务名称
- `headers`: 请求头
- `config`: 配置

**Returns:**

ModelService: 无返回值

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `delete_model_service_async`

```python
async def delete_model_service_async(self, model_service_name: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ModelService
```

删除模型服务

**Args:**

- `model_service_name`: 模型服务名称
- `headers`: 请求头
- `config`: 配置

**Returns:**

ModelService: 无返回值

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `update_model_service`

```python
def update_model_service(self, model_service_name: str, input: UpdateModelServiceInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ModelService
```

更新模型服务

**Args:**

- `model_service_name`: 模型服务名称
- `input`: 模型服务配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ModelService: 更新后的模型服务对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `update_model_service_async`

```python
async def update_model_service_async(self, model_service_name: str, input: UpdateModelServiceInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ModelService
```

更新模型服务

**Args:**

- `model_service_name`: 模型服务名称
- `input`: 模型服务配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ModelService: 更新后的模型服务对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `get_model_service`

```python
def get_model_service(self, model_service_name: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ModelService
```

获取模型服务

**Args:**

- `model_service_name`: 模型服务名称
- `headers`: 请求头
- `config`: 配置

**Returns:**

ModelService: 模型服务对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `get_model_service_async`

```python
async def get_model_service_async(self, model_service_name: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ModelService
```

获取模型服务

**Args:**

- `model_service_name`: 模型服务名称
- `headers`: 请求头
- `config`: 配置

**Returns:**

ModelService: 模型服务对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `list_model_services`

```python
def list_model_services(self, input: ListModelServicesRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ListModelServicesOutput
```

列出模型服务

**Args:**

- `input`: 查询参数
- `headers`: 请求头
- `config`: 配置

**Returns:**

ListModelServicesOutput: 模型服务列表

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `list_model_services_async`

```python
async def list_model_services_async(self, input: ListModelServicesRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ListModelServicesOutput
```

列出模型服务

**Args:**

- `input`: 查询参数
- `headers`: 请求头
- `config`: 配置

**Returns:**

ListModelServicesOutput: 模型服务列表

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `create_model_proxy`

```python
def create_model_proxy(self, input: CreateModelProxyInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ModelProxy
```

创建模型服务

**Args:**

- `input`: 模型服务配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ModelProxy: 创建的模型服务对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `create_model_proxy_async`

```python
async def create_model_proxy_async(self, input: CreateModelProxyInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ModelProxy
```

创建模型服务

**Args:**

- `input`: 模型服务配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ModelProxy: 创建的模型服务对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `delete_model_proxy`

```python
def delete_model_proxy(self, model_proxy_name: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ModelProxy
```

删除模型服务

**Args:**

- `model_proxy_name`: 模型服务名称
- `headers`: 请求头
- `config`: 配置

**Returns:**

ModelProxy: 无返回值

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `delete_model_proxy_async`

```python
async def delete_model_proxy_async(self, model_proxy_name: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ModelProxy
```

删除模型服务

**Args:**

- `model_proxy_name`: 模型服务名称
- `headers`: 请求头
- `config`: 配置

**Returns:**

ModelProxy: 无返回值

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `update_model_proxy`

```python
def update_model_proxy(self, model_proxy_name: str, input: UpdateModelProxyInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ModelProxy
```

更新模型服务

**Args:**

- `model_proxy_name`: 模型服务名称
- `input`: 模型服务配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ModelProxy: 更新后的模型服务对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `update_model_proxy_async`

```python
async def update_model_proxy_async(self, model_proxy_name: str, input: UpdateModelProxyInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ModelProxy
```

更新模型服务

**Args:**

- `model_proxy_name`: 模型服务名称
- `input`: 模型服务配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ModelProxy: 更新后的模型服务对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `get_model_proxy`

```python
def get_model_proxy(self, model_proxy_name: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ModelProxy
```

获取模型服务

**Args:**

- `model_proxy_name`: 模型服务名称
- `headers`: 请求头
- `config`: 配置

**Returns:**

ModelProxy: 模型服务对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `get_model_proxy_async`

```python
async def get_model_proxy_async(self, model_proxy_name: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ModelProxy
```

获取模型服务

**Args:**

- `model_proxy_name`: 模型服务名称
- `headers`: 请求头
- `config`: 配置

**Returns:**

ModelProxy: 模型服务对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `list_model_proxies`

```python
def list_model_proxies(self, input: ListModelProxiesRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ListModelProxiesOutput
```

列出模型服务

**Args:**

- `input`: 查询参数
- `headers`: 请求头
- `config`: 配置

**Returns:**

ListModelProxiesOutput: 模型服务列表

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `list_model_proxies_async`

```python
async def list_model_proxies_async(self, input: ListModelProxiesRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ListModelProxiesOutput
```

列出模型服务

**Args:**

- `input`: 查询参数
- `headers`: 请求头
- `config`: 配置

**Returns:**

ListModelProxiesOutput: 模型服务列表

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---




