---
sidebar_position: 4
title: ModelAdapter
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# ModelAdapter

Google ADK 模型适配器 / Google ADK Model Adapter

将 CommonModel 包装为 Google ADK BaseLlm。

## 类

## GoogleADKModelAdapter

```python
class GoogleADKModelAdapter(ModelAdapter)
```

Google ADK 模型适配器 / Google ADK Model Adapter

将 CommonModel 包装为 Google ADK BaseLlm。

### 方法

#### 🔹 `构造函数`

```python
def __init__(self)
```

初始化适配器，创建内部的消息适配器 / Google ADK Message Adapter

---


#### 🔹 `wrap_model`

```python
def wrap_model(self, common_model: CommonModel) -> Any
```

包装 CommonModel 为 Google ADK BaseLlm / Google ADK Model Adapter

---




