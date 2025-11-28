---
sidebar_position: 1
title: Client
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Client

ToolSet 客户端 / ToolSet Client

此模块提供工具集的客户端API。
This module provides the client API for toolsets.

## 类

## ToolSetClient

```python
class ToolSetClient
```

ToolSet 客户端 / ToolSet Client

提供工具集的获取和列表功能。
Provides get and list functions for toolsets.

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, config: Optional[Config] = None)
```

初始化客户端 / Initialize client

**Args:**

- `config`: 配置对象,可选 / Configuration object, optional

---


#### 🔹 `get_async`

```python
async def get_async(self, name: str, config: Optional[Config] = None)
```


---


#### 🔹 `get`

```python
def get(self, name: str, config: Optional[Config] = None)
```


---


#### 🔹 `list_async`

```python
async def list_async(self, input: Optional[ToolSetListInput] = None, config: Optional[Config] = None)
```


---


#### 🔹 `list`

```python
def list(self, input: Optional[ToolSetListInput] = None, config: Optional[Config] = None)
```


---




