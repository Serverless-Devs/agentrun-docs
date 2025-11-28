---
sidebar_position: 3
title: ModelAdapter
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# ModelAdapter

LangChain 模型适配器 / CrewAI Model Adapter

将 CommonModel 包装为 LangChain BaseChatModel。

## 类

## CrewAIModelAdapter

```python
class CrewAIModelAdapter(ModelAdapter)
```

CrewAI 模型适配器 / CrewAI Model Adapter

将 CommonModel 包装为 CrewAI BaseChatModel。

### 方法

#### 🔹 `wrap_model`

```python
def wrap_model(self, common_model: Any) -> Any
```

包装 CommonModel 为 CrewAI BaseChatModel / CrewAI Model Adapter

---




