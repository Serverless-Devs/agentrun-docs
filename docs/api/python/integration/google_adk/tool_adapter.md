---
sidebar_position: 5
title: ToolAdapter
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# ToolAdapter

Google ADK 工具适配器 / Google ADK Tool Adapter

将标准工具定义转换为 Google ADK 函数格式。

## 类

## GoogleADKToolAdapter

```python
class GoogleADKToolAdapter(ToolAdapter)
```

Google ADK 工具适配器 / Google ADK Tool Adapter

实现 CanonicalTool → Google ADK 函数的转换。
    Google ADK 直接使用 Python 函数作为工具。

### 方法

#### 🔹 `get_registered_tool`

```python
def get_registered_tool(self, name: str) -> Optional[CanonicalTool]
```

根据名称获取最近注册的工具定义 / Google ADK Tool Adapter

---


#### 🔹 `from_canonical`

```python
def from_canonical(self, tools: List[CanonicalTool])
```

将标准格式转换为 Google ADK 工具 / Google ADK Tool Adapter

Google ADK 通过函数的类型注解推断参数，需要动态创建带注解的函数。

---




