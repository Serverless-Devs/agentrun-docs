---
sidebar_position: 3
title: Toolset
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Toolset

ToolSet 资源类 / ToolSet Resource Class

提供工具集资源的面向对象封装和完整生命周期管理。
Provides object-oriented wrapper and complete lifecycle management for toolset resources.

## 类

## ToolSet

```python
class ToolSet(BaseModel)
```

工具集资源 / ToolSet Resource

提供工具集的查询、调用等功能。
Provides query, invocation and other functionality for toolsets.

**Attributes:**

- `created_time`: 创建时间 / Creation time
- `description`: 描述 / Description
- `generation`: 版本号 / Generation number
- `kind`: 资源类型 / Resource kind
- `labels`: 标签 / Labels
- `name`: 工具集名称 / ToolSet name
- `spec`: 规格配置 / Specification
- `status`: 状态 / Status
- `uid`: 唯一标识符 / Unique identifier

### 方法

#### 🔹 `get_by_name_async`

```python
async def get_by_name_async(cls, name: str, config: Optional[Config] = None)
```


---


#### 🔹 `get_by_name`

```python
def get_by_name(cls, name: str, config: Optional[Config] = None)
```


---


#### 🔹 `type`

```python
def type(self)
```


---


#### 🔹 `get_async`

```python
async def get_async(self, config: Optional[Config] = None)
```


---


#### 🔹 `get`

```python
def get(self, config: Optional[Config] = None)
```


---


#### 🔹 `list_tools_async`

```python
async def list_tools_async(self, config: Optional[Config] = None)
```

异步获取工具列表,返回统一的 ToolInfo 列表

---


#### 🔹 `list_tools`

```python
def list_tools(self, config: Optional[Config] = None)
```

同步获取工具列表,返回统一的 ToolInfo 列表

---


#### 🔹 `call_tool_async`

```python
async def call_tool_async(self, name: str, arguments: Optional[Dict[str, str]] = None, config: Optional[Config] = None)
```

异步调用工具,统一使用 ApiSet 实现

---


#### 🔹 `call_tool`

```python
def call_tool(self, name: str, arguments: Optional[Dict[str, str]] = None, config: Optional[Config] = None)
```

同步调用工具,统一使用 ApiSet 实现

---


#### 🔹 `to_apiset`

```python
def to_apiset(self, config: Optional[Config] = None)
```

将 ToolSet 转换为统一的 ApiSet 对象

**Returns:**

ApiSet: 统一的工具集接口

---




