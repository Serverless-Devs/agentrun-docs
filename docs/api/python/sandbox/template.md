---
sidebar_position: 6
title: Template
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Template

Template 高层 API / Template High-Level API

此模块定义沙箱模板资源的高级API。
This module defines the high-level API for sandbox template resources.

## 类

## Template

```python
class Template(BaseModel)
```

Template 实例

封装了 Template 的基本信息和操作方法

### 方法

#### 🔹 `create_async`

```python
async def create_async(cls, input: TemplateInput, config: Optional[Config] = None)
```


---


#### 🔹 `create`

```python
def create(cls, input: TemplateInput, config: Optional[Config] = None)
```


---


#### 🔹 `delete_by_name_async`

```python
async def delete_by_name_async(cls, template_name: str, config: Optional[Config] = None)
```


---


#### 🔹 `delete_by_name`

```python
def delete_by_name(cls, template_name: str, config: Optional[Config] = None)
```


---


#### 🔹 `update_by_name_async`

```python
async def update_by_name_async(cls, template_name: str, input: TemplateInput, config: Optional[Config] = None)
```


---


#### 🔹 `update_by_name`

```python
def update_by_name(cls, template_name: str, input: TemplateInput, config: Optional[Config] = None)
```


---


#### 🔹 `get_by_name_async`

```python
async def get_by_name_async(cls, template_name: str, config: Optional[Config] = None)
```


---


#### 🔹 `get_by_name`

```python
def get_by_name(cls, template_name: str, config: Optional[Config] = None)
```


---


#### 🔹 `list_templates_async`

```python
async def list_templates_async(cls, input: Optional[PageableInput] = None, config: Optional[Config] = None)
```


---


#### 🔹 `list_templates`

```python
def list_templates(cls, input: Optional[PageableInput] = None, config: Optional[Config] = None)
```


---


#### 🔹 `create_sandbox_async`

```python
async def create_sandbox_async(self, sandbox_idle_timeout_seconds: Optional[int] = None, config: Optional[Config] = None)
```


---


#### 🔹 `create_sandbox`

```python
def create_sandbox(self, sandbox_idle_timeout_seconds: Optional[int] = None, config: Optional[Config] = None)
```


---




