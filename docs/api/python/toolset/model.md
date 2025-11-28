---
sidebar_position: 2
title: Model
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Model

ToolSet 模型定义 / ToolSet Model Definitions

定义工具集相关的数据模型和枚举。
Defines data models and enumerations related to toolsets.

## 类

## SchemaType

```python
class SchemaType(str, Enum)
```

Schema 类型 / Schema Type



## ToolSetStatusOutputsUrls

```python
class ToolSetStatusOutputsUrls(BaseModel)
```




## MCPServerConfig

```python
class MCPServerConfig(BaseModel)
```




## ToolMeta

```python
class ToolMeta(BaseModel)
```




## OpenAPIToolMeta

```python
class OpenAPIToolMeta(BaseModel)
```




## ToolSetStatusOutputs

```python
class ToolSetStatusOutputs(BaseModel)
```




## APIKeyAuthParameter

```python
class APIKeyAuthParameter(BaseModel)
```




## AuthorizationParameters

```python
class AuthorizationParameters(BaseModel)
```




## Authorization

```python
class Authorization(BaseModel)
```




## ToolSetSchema

```python
class ToolSetSchema(BaseModel)
```




## ToolSetSpec

```python
class ToolSetSpec(BaseModel)
```




## ToolSetStatus

```python
class ToolSetStatus(BaseModel)
```




## ToolSetListInput

```python
class ToolSetListInput(PageableInput)
```




## ToolSchema

```python
class ToolSchema(BaseModel)
```


### 方法

#### 🔹 `from_any_openapi_schema`

```python
def from_any_openapi_schema(cls, schema: Any)
```

从任意 OpenAPI schema 创建 ToolSchema

---




## ToolInfo

```python
class ToolInfo(BaseModel)
```


### 方法

#### 🔹 `from_mcp_tool`

```python
def from_mcp_tool(cls, tool: Any)
```

从 MCP tool 创建 ToolInfo

---




