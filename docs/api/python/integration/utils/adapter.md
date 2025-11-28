---
sidebar_position: 1
title: Adapter
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Adapter

适配器接口定义 / Adapter Interface Definition

定义统一的适配器接口,所有框架适配器都实现这些接口。
Defines unified adapter interfaces that all framework adapters implement.

这样可以确保一致的转换行为,并最大化代码复用。
This ensures consistent conversion behavior and maximizes code reuse.

## 类

## MessageAdapter

```python
class MessageAdapter(ABC)
```

消息格式适配器接口

用于在 ModelAdapter 内部进行消息格式转换。
只需要将框架消息转换为标准 OpenAI 格式。

转换流程：
- 框架消息 → to_canonical() → CanonicalMessage（OpenAI 格式）

### 方法

#### 🔹 `to_canonical`

```python
def to_canonical(self, messages: Any) -> List[CanonicalMessage]
```

将框架消息转换为标准格式（供 ModelAdapter 内部使用）

**Args:**

- `messages`: 框架特定的消息格式

**Returns:**

标准格式消息列表

---




## ToolAdapter

```python
class ToolAdapter(ABC)
```

工具格式适配器接口 / Utils Adapters

用于将标准工具定义转换为框架特定格式。
    单向转换：CanonicalTool → 框架工具

### 方法

#### 🔹 `构造函数`

```python
def __init__(self) -> None
```


---


#### 🔹 `from_canonical`

```python
def from_canonical(self, tools: List[CanonicalTool]) -> Any
```

将标准工具转换为框架特定格式 / 将标准工具Converts为框架特定格式

**Args:**

- `tools`: 标准格式工具列表

**Returns:**

框架特定的工具格式

---


#### 🔹 `function_tools`

```python
def function_tools(self, tools: List[CanonicalTool], modify_func: Optional[Callable[..., Any]] = None)
```

将标准格式转换为 Google ADK 工具 / 将标准格式Converts为 Google ADK 工具

Google ADK 通过函数的类型注解推断参数，需要动态创建带注解的函数。

---




## ModelAdapter

```python
class ModelAdapter(ABC)
```

模型适配器接口 / Utils Model Adapter

用于包装框架模型，使其能够与 CommonModel 协同工作。

### 方法

#### 🔹 `wrap_model`

```python
def wrap_model(self, common_model: CommonModel) -> Any
```

包装 CommonModel 为框架特定的模型格式 / 包装 CommonModel 为framework特定的模型格式

**Args:**

- `common_model`: CommonModel 实例

**Returns:**

框架特定的模型对象

---




