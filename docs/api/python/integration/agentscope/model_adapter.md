---
sidebar_position: 4
title: ModelAdapter
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# ModelAdapter

AgentScope 模型适配器 / AgentScope Model Adapter

将 CommonModel 包装为 AgentScope ChatModelBase。

## 类

## AgentScopeModelAdapter

```python
class AgentScopeModelAdapter(ModelAdapter)
```

AgentScope 模型适配器 / AgentScope Model Adapter

将 CommonModel 包装为 AgentScope ChatModelBase。

### 方法

#### 🔹 `构造函数`

```python
def __init__(self)
```

初始化适配器，创建内部的消息适配器 / AgentScope Message Adapter

---


#### 🔹 `wrap_model`

```python
def wrap_model(self, common_model: CommonModel) -> Any
```

包装 CommonModel 为 AgentScope ChatModelBase / AgentScope Model Adapter

---




