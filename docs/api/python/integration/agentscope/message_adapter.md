---
sidebar_position: 3
title: MessageAdapter
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# MessageAdapter

消息适配器，负责 AgentScope \<-\> CanonicalMessage 的转换。 / AgentScope Message Adapter

## 类

## AgentScopeMessageAdapter

```python
class AgentScopeMessageAdapter(MessageAdapter)
```

AgentScope 消息适配器。 / AgentScope Message Adapter

### 方法

#### 🔹 `to_canonical`

```python
def to_canonical(self, messages: Any) -> List[CanonicalMessage]
```


---


#### 🔹 `from_canonical`

```python
def from_canonical(self, messages: List[CanonicalMessage]) -> Any
```


---




