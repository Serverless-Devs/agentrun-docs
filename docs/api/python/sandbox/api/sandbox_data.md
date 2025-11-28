---
sidebar_position: 6
title: SandboxData
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# SandboxData

Sandbox数据API模板 / Sandbox Data API Template

此模板用于生成沙箱数据API代码。
This template is used to generate sandbox data API code.

## 类

## SandboxDataAPI

```python
class SandboxDataAPI(DataAPI)
```


### 方法

#### 🔹 `构造函数`

```python
def __init__(self)
```


---


#### 🔹 `check_health_async`

```python
async def check_health_async(self)
```


---


#### 🔹 `check_health`

```python
def check_health(self)
```


---


#### 🔹 `create_sandbox_async`

```python
async def create_sandbox_async(self, template_name: str, sandbox_idle_timeout_seconds: Optional[int] = 600, config: Optional[Config] = None)
```


---


#### 🔹 `create_sandbox`

```python
def create_sandbox(self, template_name: str, sandbox_idle_timeout_seconds: Optional[int] = 600, config: Optional[Config] = None)
```


---


#### 🔹 `delete_sandbox_async`

```python
async def delete_sandbox_async(self, sandbox_id: str, config: Optional[Config] = None)
```


---


#### 🔹 `delete_sandbox`

```python
def delete_sandbox(self, sandbox_id: str, config: Optional[Config] = None)
```


---


#### 🔹 `stop_sandbox_async`

```python
async def stop_sandbox_async(self, sandbox_id: str, config: Optional[Config] = None)
```


---


#### 🔹 `stop_sandbox`

```python
def stop_sandbox(self, sandbox_id: str, config: Optional[Config] = None)
```


---


#### 🔹 `get_sandbox_async`

```python
async def get_sandbox_async(self, sandbox_id: str, config: Optional[Config] = None)
```


---


#### 🔹 `get_sandbox`

```python
def get_sandbox(self, sandbox_id: str, config: Optional[Config] = None)
```


---




