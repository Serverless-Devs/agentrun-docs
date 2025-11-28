---
sidebar_position: 1
title: Control
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Control

Tool 管控链路 API

## 类

## ToolControlAPI

```python
class ToolControlAPI(ControlAPI)
```

Tool 管控链路 API

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, config: Optional[Config] = None)
```

初始化 API 客户端

**Args:**

- `config`: 全局配置对象

---


#### 🔹 `get_toolset`

```python
def get_toolset(self, name: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Toolset
```

获取工具

**Args:**

- `name`: Tool 名称
- `headers`: 请求头
- `config`: 配置

**Returns:**

Toolset: ToolSet 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `get_toolset_async`

```python
async def get_toolset_async(self, name: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Toolset
```

获取工具

**Args:**

- `name`: Tool 名称
- `headers`: 请求头
- `config`: 配置

**Returns:**

Toolset: ToolSet 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `list_toolsets`

```python
def list_toolsets(self, input: ListToolsetsRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ListToolsetsResponseBody
```

枚举 ToolSets

**Args:**

- `input`: 枚举的配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ListToolsetsResponseBody: ToolSet 列表

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `list_toolsets_async`

```python
async def list_toolsets_async(self, input: ListToolsetsRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ListToolsetsResponseBody
```

枚举 ToolSets

**Args:**

- `input`: 枚举的配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ListToolsetsResponseBody: ToolSet 列表

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---




