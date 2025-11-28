---
sidebar_position: 1
title: Invoker
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Invoker

Agent 调用器 / Agent Invoker

负责处理 Agent 调用的通用逻辑。
Handles common logic for agent invocations.

## 类

## AgentInvoker

```python
class AgentInvoker
```

Agent 调用器

职责:
1. 调用用户的 invoke_agent
2. 处理同步/异步调用
3. 自动转换 string/string迭代器为 AgentRunResult
4. 错误处理

**Example:**

```python
>>> def my_agent(request: AgentRequest) -> str:
    ...     return "Hello"  # 自动转换为 AgentRunResult
    >>>
    >>> invoker = AgentInvoker(my_agent)
    >>> result = await invoker.invoke(AgentRequest(...))
    >>> # result 是 AgentRunResult 对象
```

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, invoke_agent: InvokeAgentHandler)
```

初始化 Agent 调用器

**Args:**

- `invoke_agent`: Agent 处理函数,可以是同步或异步

---


#### 🔹 `invoke`

```python
async def invoke(self, request: AgentRequest) -> AgentResult
```

调用 Agent 并返回结果

自动处理各种返回类型:
- string 或 string 迭代器 -\> 转换为 AgentRunResult
- AgentRunResult -\> 直接返回
- AgentResponse/ModelResponse -\> 直接返回

**Args:**

- `request`: AgentRequest 请求对象

**Returns:**

AgentResult: Agent 返回的结果

**Raises:**

- `Exception`: Agent 执行中的任何异常

---




