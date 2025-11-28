---
sidebar_position: 4
title: Model
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Model

通用模型定义和转换模块 / Common Model Definition and Conversion Module

提供跨框架的通用模型定义和转换功能。
Provides cross-framework model definition and conversion capabilities.

## 类

## CommonModel

```python
class CommonModel
```

通用模型定义

封装 AgentRun 模型，提供跨框架转换能力。

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, model: Optional[str], model_obj: Union[ModelService, ModelProxy], backend_type: Optional[BackendType] = None, config: Optional[Config] = None)
```


---


#### 🔹 `completions`

```python
def completions(self, *args, **kwargs)
```

调用底层模型的 completions 方法

---


#### 🔹 `responses`

```python
def responses(self, *args, **kwargs)
```

调用底层模型的 responses 方法

---


#### 🔹 `get_model_info`

```python
def get_model_info(self, config: Optional[Config] = None)
```

获取模型信息

---


#### 🔹 `to_google_adk`

```python
def to_google_adk(self) -> Any
```

转换为 Google ADK BaseLlm

优先使用适配器模式，如果适配器未注册则回退到旧实现。

---


#### 🔹 `to_langchain`

```python
def to_langchain(self) -> Any
```

转换为 LangChain ChatModel

优先使用适配器模式，如果适配器未注册则回退到旧实现。

---


#### 🔹 `to_langgraph`

```python
def to_langgraph(self) -> Any
```

转换为 LangGraph 兼容的模型。

LangGraph 与 LangChain 完全兼容，因此使用相同的接口。

---


#### 🔹 `to_crewai`

```python
def to_crewai(self) -> Any
```

转换为 CrewAI 兼容的模型。

CrewAI 内部使用 LangChain，因此使用相同的接口。

---


#### 🔹 `to_pydantic_ai`

```python
def to_pydantic_ai(self) -> Any
```

转换为 PydanticAI 兼容的模型。

PydanticAI 支持 OpenAI 兼容的接口，返回一个包装对象。

---


#### 🔹 `to_agentscope`

```python
def to_agentscope(self) -> Any
```

转换为 AgentScope ChatModelBase。

---




