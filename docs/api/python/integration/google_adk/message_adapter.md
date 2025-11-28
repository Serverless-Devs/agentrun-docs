---
sidebar_position: 3
title: MessageAdapter
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# MessageAdapter

Google ADK 消息适配器 / Google ADK Message Adapter

将 Google ADK LlmRequest 转换为标准格式,供 ModelAdapter 内部使用。
Converts Google ADK LlmRequest to canonical format for internal use by ModelAdapter.

## 类

## GoogleADKMessageAdapter

```python
class GoogleADKMessageAdapter(MessageAdapter)
```

Google ADK 消息适配器 / Google ADK Message Adapter

实现 Google ADK LlmRequest → CanonicalMessage 的转换。
Implements conversion from Google ADK LlmRequest to CanonicalMessage.

### 方法

#### 🔹 `to_canonical`

```python
def to_canonical(self, messages: Any) -> List[CanonicalMessage]
```

将 Google ADK LlmRequest 转换为标准格式 / Google ADK Message Adapter

---




