---
sidebar_position: 5
title: ToolAdapter
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# ToolAdapter

AgentScope 工具适配器 / AgentScope Tool Adapter

将标准工具定义转换为 AgentScope 工具格式。

## 类

## AgentScopeToolAdapter

```python
class AgentScopeToolAdapter(ToolAdapter)
```

AgentScope 工具适配器 / AgentScope Tool Adapter

实现 CanonicalTool → AgentScope 工具格式的转换。

### 方法

#### 🔹 `from_canonical`

```python
def from_canonical(self, tools: List[CanonicalTool]) -> Any
```

将标准格式转换为 AgentScope 工具 / AgentScope Tool Adapter

---




