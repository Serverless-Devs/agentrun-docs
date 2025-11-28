---
sidebar_position: 2
title: Builtin
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Builtin

Google ADK 内置集成函数 / Google ADK Built-in Integration Functions

提供快速创建 Google ADK 兼容模型和工具的便捷函数。
Provides convenient functions for quickly creating Google ADK-compatible models and tools.

## 函数

## model

```python
def model(name: Union[str, ModelProxy, ModelService], **kwargs: Unpack[ModelArgs])
```

获取 AgentRun 模型并转换为 LangChain ``BaseChatModel``。 / Google ADK Built-in Integration Functions



## toolset

```python
def toolset(name: Union[str, ToolSet]) -> List[Any]
```

将内置工具集封装为 LangChain ``StructuredTool`` 列表。 / Google ADK Built-in Integration Functions



## sandbox_toolset

```python
def sandbox_toolset(template_name: str) -> List[Any]
```

将沙箱模板封装为 LangChain ``StructuredTool`` 列表。 / Google ADK Built-in Integration Functions



