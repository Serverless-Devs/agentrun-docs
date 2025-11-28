---
sidebar_position: 2
title: Canonical
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Canonical

中间格式定义 / Canonical Format Definition

提供统一的中间格式(Canonical Format),作为所有框架转换的桥梁。
Provides a unified canonical format that serves as a bridge for all framework conversions.

这样可以最大化代码复用,减少重复的转换逻辑。
This maximizes code reuse and reduces redundant conversion logic.

## 类

## MessageRole

```python
class MessageRole(str, Enum)
```

统一的消息角色枚举



## CanonicalToolCall

```python
@dataclass
class CanonicalToolCall
```

统一的工具调用格式

所有框架的工具调用都转换为这个格式，然后再转换为目标框架格式。



## CanonicalMessage

```python
@dataclass
class CanonicalMessage
```

统一的消息格式

这是所有框架消息格式的中间表示。
转换流程：框架A格式 → CanonicalMessage → 框架B格式

### 方法

#### 🔹 `to_dict`

```python
def to_dict(self) -> Dict[str, Any]
```

转换为字典格式（用于序列化）

注意：OpenAI API 要求 tool_calls 中的 arguments 必须是 JSON 字符串，
而不是字典。这里会自动转换。

---




## CanonicalTool

```python
@dataclass
class CanonicalTool
```

统一的工具格式

所有框架的工具都转换为这个格式。
参数使用 JSON Schema 格式，这是最通用的工具描述格式。

### 方法

#### 🔹 `to_openai_function`

```python
def to_openai_function(self) -> Dict[str, Any]
```

转换为 OpenAI Function Calling 格式

---


#### 🔹 `to_anthropic_tool`

```python
def to_anthropic_tool(self) -> Dict[str, Any]
```

转换为 Anthropic Claude Tools 格式

---




## CanonicalModelResponse

```python
@dataclass
class CanonicalModelResponse
```

统一的模型响应格式

### 方法

#### 🔹 `to_dict`

```python
def to_dict(self) -> Dict[str, Any]
```

转换为字典格式

注意：OpenAI API 要求 tool_calls 中的 arguments 必须是 JSON 字符串。

---




