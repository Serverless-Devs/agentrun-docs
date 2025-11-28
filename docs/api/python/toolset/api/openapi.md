---
sidebar_position: 3
title: Openapi
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Openapi

OpenAPI协议处理 / OpenAPI Protocol Handler

处理OpenAPI规范的工具调用。
Handles tool invocations for OpenAPI specification.

## 类

## ApiSet

```python
class ApiSet
```

统一的工具集接口，支持 OpenAPI 和 MCP 工具

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, tools: List[ToolInfo], invoker: Any, base_url: Optional[str] = None, headers: Optional[Dict[str, str]] = None, query_params: Optional[Dict[str, Any]] = None, config: Optional[Config] = None)
```


---


#### 🔹 `invoke`

```python
def invoke(self, name: str, arguments: Optional[Dict[str, Any]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```

调用指定的工具

---


#### 🔹 `invoke_async`

```python
async def invoke_async(self, name: str, arguments: Optional[Dict[str, Any]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```

异步调用指定的工具

---


#### 🔹 `tools`

```python
def tools(self) -> List[ToolInfo]
```

返回所有工具列表

---


#### 🔹 `get_tool`

```python
def get_tool(self, name: str) -> Optional[ToolInfo]
```

获取指定名称的工具

---


#### 🔹 `to_function_tool`

```python
def to_function_tool(self, name: str)
```

将工具转换为 Python 函数

**Args:**

- `name`: 工具名称

**Returns:**

一个 Python 函数，其 __name__ 是工具名称，__doc__ 是描述，
    参数与工具规范定义相同

---


#### 🔹 `from_openapi_schema`

```python
def from_openapi_schema(cls, schema: Union[str, dict], base_url: Optional[str] = None, headers: Optional[Dict[str, str]] = None, query_params: Optional[Dict[str, Any]] = None, config: Optional[Config] = None, timeout: Optional[int] = None) -> 'ApiSet'
```

从 OpenAPI schema 创建 ApiSet

**Args:**

- `input`: OpenAPI schema (字符串或字典)
- `base_url`: 基础 URL
- `headers`: 默认请求头
- `query_params`: 默认查询参数
- `config`: 配置对象
- `timeout`: 超时时间

---


#### 🔹 `from_mcp_tools`

```python
def from_mcp_tools(cls, tools: Any, mcp_client: Any, config: Optional[Config] = None) -> 'ApiSet'
```

从 MCP tools 创建 ApiSet

**Args:**

- `tools`: MCP tools 列表或单个工具
- `mcp_client`: MCP 客户端（MCPToolSet 实例）
- `config`: 配置对象

---




## OpenAPI

```python
class OpenAPI
```

OpenAPI schema based tool client.

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, schema: Any, base_url: Optional[str] = None, headers: Optional[Dict[str, str]] = None, query_params: Optional[Dict[str, Any]] = None, config: Optional[Config] = None, timeout: Optional[int] = None)
```


---


#### 🔹 `list_tools`

```python
def list_tools(self, name: Optional[str] = None)
```

List tools defined in the OpenAPI schema.

**Args:**

- `name`: OperationId of the tool. When provided, return the single
  tool definition; otherwise return all tools.

**Returns:**

A list of tool metadata dictionaries.

---


#### 🔹 `has_tool`

```python
def has_tool(self, name: str) -> bool
```


---


#### 🔹 `invoke_tool`

```python
def invoke_tool(self, name: str, arguments: Optional[Dict[str, Any]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```


---


#### 🔹 `invoke_tool_async`

```python
async def invoke_tool_async(self, name: str, arguments: Optional[Dict[str, Any]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```


---




