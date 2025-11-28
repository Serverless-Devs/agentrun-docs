---
sidebar_position: 7
title: Model
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Model

数据模型基类模块 / Data Model Base Module

此模块定义所有数据模型的基类和通用配置。
This module defines base classes and common configurations for all data models.

## 类

## BaseModel

```python
class BaseModel(PydanticModel)
```


### 方法

#### 🔹 `from_inner_object`

```python
def from_inner_object(cls, obj: Union[DaraModel, TeaModel], extra: Optional[dict] = None) -> Self
```

从 Darabonba 模型对象创建 Pydantic 模型对象，可选地合并额外的字段

---


#### 🔹 `update_self`

```python
def update_self(self, other: Optional['BaseModel']) -> Self
```

更新自身属性 / Update self attributes

用另一个模型对象的属性更新当前对象。
Update current object with attributes from another model object.

**Args:**

- `other`: 另一个模型对象,可选 / Another model object, optional

**Returns:**

Self: 更新后的自身 / Updated self

---




## NetworkMode

```python
class NetworkMode(str, Enum)
```

网络访问模式 / Network Access Mode

定义 Agent Runtime 的网络访问模式。
Defines network access modes for Agent Runtime.



## NetworkConfig

```python
class NetworkConfig(BaseModel)
```

网络配置 / Network Configuration

定义 Agent Runtime 的网络配置。
Defines network configuration for Agent Runtime.



## PageableInput

```python
class PageableInput(BaseModel)
```




## Status

```python
class Status(str, Enum)
```

Agent Runtime 状态

### 方法

#### 🔹 `is_final_status`

```python
def is_final_status(status: Optional['Status'] = None) -> bool
```

判断状态是否为最终状态

---


#### 🔹 `is_final`

```python
def is_final(self) -> bool
```

判断状态是否为最终状态

---




## 函数

## to_camel_case

```python
def to_camel_case(field_name: str) -> str
```

将下划线命名转换为驼峰命名 / Convert snake_case to camelCase

**Args:**

- `field_name`: 下划线命名的字段名 / Field name in snake_case

**Returns:**

str: 驼峰命名的字段名 / Field name in camelCase

**Examples:**

```python
>>> to_camel_case("hello_world")
    'helloWorld'
    >>> to_camel_case("access_key_id")
    'accessKeyId'
```



