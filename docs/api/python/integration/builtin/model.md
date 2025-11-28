---
sidebar_position: 1
title: Model
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Model

内置模型集成函数 / Built-in Model Integration Functions

提供快速创建通用模型对象的便捷函数。
Provides convenient functions for quickly creating common model objects.

## 类

## ModelArgs

```python
class ModelArgs(TypedDict)
```




## 函数

## model

```python
def model(input: ModelService, **kwargs: Unpack[ModelArgs]) -> CommonModel
```




## model

```python
def model(input: ModelProxy, **kwargs: Unpack[ModelArgs]) -> CommonModel
```




## model

```python
def model(input: str, **kwargs: Unpack[ModelArgs]) -> CommonModel
```




## model

```python
def model(input: Union[str, ModelProxy, ModelService], **kwargs: Unpack[ModelArgs]) -> CommonModel
```

获取 AgentRun 模型并封装为通用 Model 对象 / Get AgentRun model and wrap as CommonModel

等价于 ModelClient.get(),但返回通用 Model 对象。
Equivalent to ModelClient.get(), but returns a CommonModel object.

**Args:**

- `input`: AgentRun 模型名称、ModelProxy 或 ModelService 实例 / Model name, ModelProxy or ModelService instance
- `model`: 要请求的模型名称（默认请求数组的第一个模型或模型治理的自动负载均衡模型） / Model name to request (defaults to the first model in the array or the auto-load balancing model of model governance)
- `backend_type`: 后端类型(PROXY 或 SERVICE) / Backend type (PROXY or SERVICE)
- `config`: 配置对象 / Configuration object

**Returns:**

CommonModel: 通用模型实例 / CommonModel instance

**Examples:**

```python
>>> # 从模型名称创建 / Create from model name
    >>> m = model("qwen-max")
    >>>
    >>> # 从 ModelProxy 创建 / Create from ModelProxy
    >>> proxy = ModelProxy.get_by_name("my-proxy")
    >>> m = model(proxy)
    >>>
    >>> # 从 ModelService 创建 / Create from ModelService
    >>> service = ModelService.get_by_name("my-service")
    >>> m = model(service)
```



