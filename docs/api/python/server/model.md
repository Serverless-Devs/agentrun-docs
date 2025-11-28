---
sidebar_position: 2
title: Model
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Model

AgentRun Server 模型定义 / AgentRun Server 模型Defines

定义 invokeAgent callback 的参数结构和响应类型

## 类

## MessageRole

```python
class MessageRole(str, Enum)
```

消息角色



## Message

```python
class Message(BaseModel)
```

消息体



## ToolCall

```python
class ToolCall(BaseModel)
```

工具调用



## Tool

```python
class Tool(BaseModel)
```

工具定义 / 工具Defines



## AgentRequest

```python
class AgentRequest(BaseModel)
```

Agent 请求参数

invokeAgent callback 接收的参数结构
符合 OpenAI Completions API 格式



## AgentResponseChoice

```python
class AgentResponseChoice(BaseModel)
```

响应选项



## AgentResponseUsage

```python
class AgentResponseUsage(BaseModel)
```

Token 使用统计



## AgentRunResult

```python
class AgentRunResult(BaseModel)
```

Agent 运行结果

核心数据结构,用于表示 Agent 执行结果。
content 字段支持字符串或字符串迭代器。

**Example:**

```python
>>> # 返回字符串
    >>> AgentRunResult(content="Hello, world!")
    >>>
    >>> # 返回字符串迭代器(流式)
    >>> def stream():
    ...     yield "Hello, "
    ...     yield "world!"
    >>> AgentRunResult(content=stream())
```



## AgentResponse

```python
class AgentResponse(BaseModel)
```

Agent 响应(非流式)

灵活的响应数据结构,所有字段都是可选的。
用户可以只填充需要的字段,协议层会根据实际协议格式补充或跳过字段。

**Example:**

```python
>>> # 最简单 - 只返回内容
    >>> AgentResponse(content="Hello")
    >>>
    >>> # OpenAI 格式 - 完整字段
    >>> AgentResponse(
    ...     id="chatcmpl-123",
    ...     model="gpt-4",
    ...     choices=[...]
    ... )
```



## AgentStreamResponseDelta

```python
class AgentStreamResponseDelta(BaseModel)
```

流式响应增量



## AgentStreamResponse

```python
class AgentStreamResponse(BaseModel)
```

流式响应块



## AgentStreamResponseChoice

```python
class AgentStreamResponseChoice(BaseModel)
```

流式响应选项



