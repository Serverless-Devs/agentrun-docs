---
sidebar_position: 2
title: Mcp
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Mcp

MCP协议处理 / MCP Protocol Handler

处理MCP(Model Context Protocol)协议的工具调用。
Handles tool invocations for MCP (Model Context Protocol).

## 类

## MCPSession

```python
class MCPSession
```


### 方法

#### 🔹 `构造函数`

```python
def __init__(self, url: str, config: Optional[Config] = None)
```


---


#### 🔹 `toolsets`

```python
def toolsets(self, config: Optional[Config] = None)
```


---




## MCPToolSet

```python
class MCPToolSet
```


### 方法

#### 🔹 `构造函数`

```python
def __init__(self, url: str, config: Optional[Config] = None)
```


---


#### 🔹 `new_session`

```python
def new_session(self, config: Optional[Config] = None)
```


---


#### 🔹 `tools_async`

```python
async def tools_async(self, config: Optional[Config] = None)
```


---


#### 🔹 `tools`

```python
def tools(self, config: Optional[Config] = None)
```


---


#### 🔹 `call_tool_async`

```python
async def call_tool_async(self, name: str, arguments: Optional[Dict[str, Any]] = None, config: Optional[Config] = None)
```


---


#### 🔹 `call_tool`

```python
def call_tool(self, name: str, arguments: Optional[Dict[str, Any]] = None, config: Optional[Config] = None)
```


---




