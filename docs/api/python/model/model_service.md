---
sidebar_position: 4
title: ModelService
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# ModelService

Model Service 高层 API / Model Service High-Level API

此模块定义模型服务资源的高级API。
This module defines the high-level API for model service resources.

## 类

## ModelService

```python
class ModelService(ModelServiceImmutableProps, ModelServiceMutableProps, ModelServicesSystemProps, ResourceBase)
```

模型服务

### 方法

#### 🔹 `create_async`

```python
async def create_async(cls, input: ModelServiceCreateInput, config: Optional[Config] = None)
```

创建模型服务（异步）

**Args:**

- `input`: 模型服务输入参数
- `config`: 配置

**Returns:**

ModelService: 创建的模型服务对象

---


#### 🔹 `create`

```python
def create(cls, input: ModelServiceCreateInput, config: Optional[Config] = None)
```

创建模型服务（同步）

**Args:**

- `input`: 模型服务输入参数
- `config`: 配置

**Returns:**

ModelService: 创建的模型服务对象

---


#### 🔹 `delete_by_name_async`

```python
async def delete_by_name_async(cls, model_service_name: str, config: Optional[Config] = None)
```

根据名称删除模型服务（异步）

**Args:**

- `model_service_name`: 模型服务名称
- `config`: 配置

---


#### 🔹 `delete_by_name`

```python
def delete_by_name(cls, model_service_name: str, config: Optional[Config] = None)
```

根据名称删除模型服务（同步）

**Args:**

- `model_service_name`: 模型服务名称
- `config`: 配置

---


#### 🔹 `update_by_name_async`

```python
async def update_by_name_async(cls, model_service_name: str, input: ModelServiceUpdateInput, config: Optional[Config] = None)
```

根据名称更新模型服务（异步）

**Args:**

- `model_service_name`: 模型服务名称
- `input`: 模型服务更新输入参数
- `config`: 配置

**Returns:**

ModelService: 更新后的模型服务对象

---


#### 🔹 `update_by_name`

```python
def update_by_name(cls, model_service_name: str, input: ModelServiceUpdateInput, config: Optional[Config] = None)
```

根据名称更新模型服务（同步）

**Args:**

- `model_service_name`: 模型服务名称
- `input`: 模型服务更新输入参数
- `config`: 配置

**Returns:**

ModelService: 更新后的模型服务对象

---


#### 🔹 `get_by_name_async`

```python
async def get_by_name_async(cls, model_service_name: str, config: Optional[Config] = None)
```

根据名称获取模型服务（异步）

**Args:**

- `model_service_name`: 模型服务名称
- `config`: 配置

**Returns:**

ModelService: 模型服务对象

---


#### 🔹 `get_by_name`

```python
def get_by_name(cls, model_service_name: str, config: Optional[Config] = None)
```

根据名称获取模型服务（同步）

**Args:**

- `model_service_name`: 模型服务名称
- `config`: 配置

**Returns:**

ModelService: 模型服务对象

---


#### 🔹 `list_all_async`

```python
async def list_all_async(cls) -> List['ModelService']
```


---


#### 🔹 `list_all`

```python
def list_all(cls) -> List['ModelService']
```


---


#### 🔹 `update_async`

```python
async def update_async(self, input: ModelServiceUpdateInput, config: Optional[Config] = None)
```

更新模型服务（异步）

**Args:**

- `input`: 模型服务更新输入参数
- `config`: 配置

**Returns:**

ModelService: 更新后的模型服务对象

---


#### 🔹 `update`

```python
def update(self, input: ModelServiceUpdateInput, config: Optional[Config] = None)
```

更新模型服务（同步）

**Args:**

- `input`: 模型服务更新输入参数
- `config`: 配置

**Returns:**

ModelService: 更新后的模型服务对象

---


#### 🔹 `delete_async`

```python
async def delete_async(self, config: Optional[Config] = None)
```

删除模型服务（异步）

**Args:**

- `config`: 配置

---


#### 🔹 `delete`

```python
def delete(self, config: Optional[Config] = None)
```

删除模型服务（同步）

**Args:**

- `config`: 配置

---


#### 🔹 `get_async`

```python
async def get_async(self, config: Optional[Config] = None)
```

刷新模型服务信息（异步）

**Args:**

- `config`: 配置

**Returns:**

ModelService: 刷新后的模型服务对象

---


#### 🔹 `get`

```python
def get(self, config: Optional[Config] = None)
```

刷新模型服务信息（同步）

**Args:**

- `config`: 配置

**Returns:**

ModelService: 刷新后的模型服务对象

---


#### 🔹 `refresh_async`

```python
async def refresh_async(self, config: Optional[Config] = None)
```

刷新模型服务信息（异步）

**Args:**

- `config`: 配置

**Returns:**

ModelService: 刷新后的模型服务对象

---


#### 🔹 `refresh`

```python
def refresh(self, config: Optional[Config] = None)
```

刷新模型服务信息（同步）

**Args:**

- `config`: 配置

**Returns:**

ModelService: 刷新后的模型服务对象

---


#### 🔹 `model_info`

```python
def model_info(self, config: Optional[Config] = None) -> BaseInfo
```


---


#### 🔹 `completions`

```python
def completions(self, messages: list, model: Optional[str] = None, stream: bool = False, **kwargs)
```


---


#### 🔹 `responses`

```python
def responses(self, messages: list, model: Optional[str] = None, stream: bool = False, **kwargs)
```


---




