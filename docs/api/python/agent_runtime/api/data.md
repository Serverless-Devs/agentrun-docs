---
sidebar_position: 2
title: Data
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Data

## 类

## InvokeArgs

```python
class InvokeArgs(TypedDict)
```




## AgentRuntimeDataAPI

```python
class AgentRuntimeDataAPI(DataAPI)
```


### 方法

#### 🔹 `构造函数`

```python
def __init__(self, agent_runtime_name: str, agent_runtime_endpoint_name: str = 'Default', config: Optional[Config] = None)
```


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




