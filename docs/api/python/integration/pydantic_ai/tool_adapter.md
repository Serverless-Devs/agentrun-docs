---
sidebar_position: 4
title: ToolAdapter
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# ToolAdapter

PydanticAI 工具适配器 / PydanticAI Tool Adapter

## 类

## PydanticAIToolAdapter

```python
class PydanticAIToolAdapter(ToolAdapter)
```

PydanticAI 工具适配器 / PydanticAI Tool Adapter

PydanticAI 使用函数作为工具，需要附加元数据信息。

### 方法

#### 🔹 `from_canonical`

```python
def from_canonical(self, tools: List[CanonicalTool]) -> List[Any]
```

将标准工具转换为 PydanticAI 函数格式 / PydanticAI Tool Adapter

---




