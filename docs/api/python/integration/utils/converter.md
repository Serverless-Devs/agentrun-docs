---
sidebar_position: 3
title: Converter
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Converter

框架转换器 / Framework Converter

提供统一的框架适配器注册中心。
Provides a unified registry for framework adapters.

## 类

## FrameworkConverter

```python
class FrameworkConverter
```

框架适配器注册中心

管理所有框架的工具和模型适配器。
MessageAdapter 不再单独注册，而是作为 ModelAdapter 的内部组件。

### 方法

#### 🔹 `构造函数`

```python
def __init__(self)
```


---


#### 🔹 `register_tool_adapter`

```python
def register_tool_adapter(self, framework: str, adapter: ToolAdapter) -> None
```

注册工具适配器

---


#### 🔹 `register_model_adapter`

```python
def register_model_adapter(self, framework: str, adapter: ModelAdapter) -> None
```

注册模型适配器

---


#### 🔹 `get_model_adapter`

```python
def get_model_adapter(self, framework: str) -> Optional[ModelAdapter]
```

获取模型适配器

---




## 函数

## get_converter

```python
def get_converter() -> FrameworkConverter
```

获取全局转换器实例



