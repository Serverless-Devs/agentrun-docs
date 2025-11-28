---
sidebar_position: 4
title: ToolAdapter
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# ToolAdapter

LangChain 工具适配器 / CrewAI Tool Adapter

将标准工具定义转换为 LangChain StructuredTool 格式。

## 类

## CrewAIToolAdapter

```python
class CrewAIToolAdapter(ToolAdapter)
```

CrewAI 工具适配器 / CrewAI Tool Adapter

实现 CanonicalTool → CrewAI StructuredTool 的转换。

### 方法

#### 🔹 `from_canonical`

```python
def from_canonical(self, tools: List[CanonicalTool]) -> Any
```

将标准格式转换为 CrewAI StructuredTool / CrewAI Tool Adapter

---




