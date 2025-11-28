---
sidebar_position: 3
title: ModelAdapter
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# ModelAdapter

PydanticAI 模型适配器 / PydanticAI Model Adapter

## 类

## PydanticAIModelAdapter

```python
class PydanticAIModelAdapter(ModelAdapter)
```

PydanticAI 模型适配器 / PydanticAI Model Adapter

PydanticAI 支持 OpenAI 兼容的接口，我们提供一个轻量级包装。

### 方法

#### 🔹 `wrap_model`

```python
def wrap_model(self, common_model: CommonModel) -> Any
```

将 CommonModel 包装为 PydanticAI 兼容的模型 / PydanticAI Model Adapter

---




