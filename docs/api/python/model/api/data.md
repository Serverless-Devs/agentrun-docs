---
sidebar_position: 2
title: Data
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Data

## 类

## BaseInfo

```python
class BaseInfo(BaseModel)
```




## ModelCompletionAPI

```python
class ModelCompletionAPI
```


### 方法

#### 🔹 `构造函数`

```python
def __init__(self) -> None
```


---


#### 🔹 `completions`

```python
def completions(self, messages: list = [], model: Optional[str] = None, custom_llm_provider: Optional[str] = None, **kwargs)
```


---


#### 🔹 `responses`

```python
def responses(self, input: Union[str, ResponseInputParam], model: Optional[str] = None, custom_llm_provider: Optional[str] = None, **kwargs)
```


---




## ModelDataAPI

```python
class ModelDataAPI(DataAPI)
```


### 方法

#### 🔹 `构造函数`

```python
def __init__(self, model_proxy_name: str, model_name: Optional[str] = None, credential_name: Optional[str] = None, provider: Optional[str] = 'openai', config: Optional[Config] = None) -> None
```


---


#### 🔹 `update_model_name`

```python
def update_model_name(self, model_proxy_name, model_name: Optional[str], credential_name: Optional[str] = None, provider: Optional[str] = 'openai', config: Optional[Config] = None)
```


---


#### 🔹 `model_info`

```python
def model_info(self, config: Optional[Config] = None) -> BaseInfo
```


---


#### 🔹 `completions`

```python
def completions(self, messages: list = [], model: Optional[str] = None, config: Optional[Config] = None, **kwargs)
```


---


#### 🔹 `responses`

```python
def responses(self, input: Union[str, ResponseInputParam], model: Optional[str] = None, config: Optional[Config] = None, **kwargs)
```


---




