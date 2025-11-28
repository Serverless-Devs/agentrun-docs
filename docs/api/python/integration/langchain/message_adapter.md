---
sidebar_position: 3
title: MessageAdapter
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# MessageAdapter

LangChain 消息适配器 / LangChain Message Adapter

将 LangChain BaseMessage 转换为标准格式,供 ModelAdapter 内部使用。
Converts LangChain BaseMessage to canonical format for internal use by ModelAdapter.

## 类

## LangChainMessageAdapter

```python
class LangChainMessageAdapter(MessageAdapter)
```

LangChain 消息适配器 / LangChain Message Adapter

实现 LangChain BaseMessage → CanonicalMessage 的转换。
Implements conversion from LangChain BaseMessage to CanonicalMessage.

### 方法

#### 🔹 `to_canonical`

```python
def to_canonical(self, messages: Any) -> List[CanonicalMessage]
```

将 LangChain BaseMessage 转换为标准格式 / LangChain Message Adapter

---




