---
sidebar_position: 2
title: Client
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Client

Sandbox客户端模板 / Sandbox Client Template

此模板用于生成沙箱客户端代码。
This template is used to generate sandbox client code.

## 类

## SandboxClient

```python
class SandboxClient
```

Sandbox 客户端 / Sandbox Client

用于管理 Sandbox 和 Template。
Used for managing Sandboxes and Templates.

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, config: Optional[Config] = None)
```

初始化 Sandbox 客户端 / Initialize Sandbox client

**Args:**

- `config`: 配置对象,可选 / Configuration object, optional

---


#### 🔹 `create_template_async`

```python
async def create_template_async(self, input: TemplateInput, config: Optional[Config] = None) -> 'Template'
```

创建 Template（异步）

**Args:**

- `input`: Template 配置
- `config`: 配置对象

**Returns:**

Template: 创建的 Template 对象

**Raises:**

- `ClientError`: 客户端错误
- `ServerError`: 服务器错误

---


#### 🔹 `create_template`

```python
def create_template(self, input: TemplateInput, config: Optional[Config] = None) -> 'Template'
```

创建 Template（同步）

**Args:**

- `input`: Template 配置
- `config`: 配置对象

**Returns:**

Template: 创建的 Template 对象

**Raises:**

- `ClientError`: 客户端错误
- `ServerError`: 服务器错误

---


#### 🔹 `delete_template_async`

```python
async def delete_template_async(self, template_name: str, config: Optional[Config] = None) -> 'Template'
```

删除 Template（异步）

**Args:**

- `template_name`: Template 名称
- `config`: 配置对象

**Returns:**

Template: 删除的 Template 对象

**Raises:**

- `ResourceNotExistError`: Template 不存在
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误

---


#### 🔹 `delete_template`

```python
def delete_template(self, template_name: str, config: Optional[Config] = None) -> 'Template'
```

删除 Template（同步）

**Args:**

- `template_name`: Template 名称
- `config`: 配置对象

**Returns:**

Template: 删除的 Template 对象

**Raises:**

- `ResourceNotExistError`: Template 不存在
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误

---


#### 🔹 `update_template_async`

```python
async def update_template_async(self, template_name: str, input: TemplateInput, config: Optional[Config] = None) -> 'Template'
```

更新 Template（异步）

**Args:**

- `template_name`: Template 名称
- `input`: Template 更新配置
- `config`: 配置对象

**Returns:**

Template: 更新后的 Template 对象

**Raises:**

- `ResourceNotExistError`: Template 不存在
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误

---


#### 🔹 `update_template`

```python
def update_template(self, template_name: str, input: TemplateInput, config: Optional[Config] = None) -> 'Template'
```

更新 Template（同步）

**Args:**

- `template_name`: Template 名称
- `input`: Template 更新配置
- `config`: 配置对象

**Returns:**

Template: 更新后的 Template 对象

**Raises:**

- `ResourceNotExistError`: Template 不存在
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误

---


#### 🔹 `get_template_async`

```python
async def get_template_async(self, template_name: str, config: Optional[Config] = None) -> 'Template'
```

获取 Template（异步）

**Args:**

- `template_name`: Template 名称
- `config`: 配置对象

**Returns:**

Template: Template 对象

**Raises:**

- `ResourceNotExistError`: Template 不存在
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误

---


#### 🔹 `get_template`

```python
def get_template(self, template_name: str, config: Optional[Config] = None) -> 'Template'
```

获取 Template（同步）

**Args:**

- `template_name`: Template 名称
- `config`: 配置对象

**Returns:**

Template: Template 对象

**Raises:**

- `ResourceNotExistError`: Template 不存在
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误

---


#### 🔹 `list_templates_async`

```python
async def list_templates_async(self, input: Optional[PageableInput] = None, config: Optional[Config] = None) -> List['Template']
```

枚举 Templates（异步）

**Args:**

- `input`: 分页配置
- `config`: 配置对象

**Returns:**

List[Template]: Template 列表

**Raises:**

- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `TimeoutError`: Timeout waiting for Template to be ready

---


#### 🔹 `list_templates`

```python
def list_templates(self, input: Optional[PageableInput] = None, config: Optional[Config] = None) -> List['Template']
```

枚举 Templates（同步）

**Args:**

- `input`: 分页配置
- `config`: 配置对象

**Returns:**

List[Template]: Template 列表

**Raises:**

- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `TimeoutError`: Timeout waiting for Template to be ready

---


#### 🔹 `create_sandbox_async`

```python
async def create_sandbox_async(self, template_name: str, sandbox_idle_timeout_seconds: Optional[int] = 600, config: Optional[Config] = None) -> Sandbox
```

创建 Sandbox（异步）

**Args:**

- `input`: Sandbox 配置
- `config`: 配置对象

**Returns:**

Sandbox: 创建的 Sandbox 对象

**Raises:**

- `ClientError`: 客户端错误
- `ServerError`: 服务器错误

---


#### 🔹 `create_sandbox`

```python
def create_sandbox(self, template_name: str, sandbox_idle_timeout_seconds: Optional[int] = 600, config: Optional[Config] = None) -> Sandbox
```

创建 Sandbox（同步）

**Args:**

- `input`: Sandbox 配置
- `config`: 配置对象

**Returns:**

Sandbox: 创建的 Sandbox 对象

**Raises:**

- `ClientError`: 客户端错误
- `ServerError`: 服务器错误

---


#### 🔹 `stop_sandbox_async`

```python
async def stop_sandbox_async(self, sandbox_id: str, config: Optional[Config] = None) -> Sandbox
```

停止 Sandbox（异步）

**Args:**

- `sandbox_id`: Sandbox ID
- `config`: 配置对象

**Returns:**

Sandbox: 停止后的 Sandbox 对象

**Raises:**

- `ResourceNotExistError`: Sandbox 不存在
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误

---


#### 🔹 `stop_sandbox`

```python
def stop_sandbox(self, sandbox_id: str, config: Optional[Config] = None) -> Sandbox
```

停止 Sandbox（同步）

**Args:**

- `sandbox_id`: Sandbox ID
- `config`: 配置对象

**Returns:**

Sandbox: 停止后的 Sandbox 对象

**Raises:**

- `ResourceNotExistError`: Sandbox 不存在
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误

---


#### 🔹 `delete_sandbox_async`

```python
async def delete_sandbox_async(self, sandbox_id: str, config: Optional[Config] = None) -> Sandbox
```

删除 Sandbox（异步）

**Args:**

- `sandbox_id`: Sandbox ID
- `config`: 配置对象

**Returns:**

Sandbox: 停止后的 Sandbox 对象

**Raises:**

- `ResourceNotExistError`: Sandbox 不存在
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误

---


#### 🔹 `delete_sandbox`

```python
def delete_sandbox(self, sandbox_id: str, config: Optional[Config] = None) -> Sandbox
```

删除 Sandbox（同步）

**Args:**

- `sandbox_id`: Sandbox ID
- `config`: 配置对象

**Returns:**

Sandbox: 停止后的 Sandbox 对象

**Raises:**

- `ResourceNotExistError`: Sandbox 不存在
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误

---


#### 🔹 `get_sandbox_async`

```python
async def get_sandbox_async(self, sandbox_id: str, config: Optional[Config] = None) -> Sandbox
```

获取 Sandbox（异步）

**Args:**

- `sandbox_id`: Sandbox ID
- `config`: 配置对象

**Returns:**

Sandbox: Sandbox 对象

**Raises:**

- `ResourceNotExistError`: Sandbox 不存在
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误

---


#### 🔹 `get_sandbox`

```python
def get_sandbox(self, sandbox_id: str, config: Optional[Config] = None) -> Sandbox
```

获取 Sandbox（同步）

**Args:**

- `sandbox_id`: Sandbox ID
- `config`: 配置对象

**Returns:**

Sandbox: Sandbox 对象

**Raises:**

- `ResourceNotExistError`: Sandbox 不存在
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误

---


#### 🔹 `list_sandboxes_async`

```python
async def list_sandboxes_async(self, input: Optional[ListSandboxesInput] = None, config: Optional[Config] = None) -> ListSandboxesOutput
```

枚举 Sandboxes（异步）

**Args:**

- `input`: 分页配置
- `config`: 配置对象

**Returns:**

List[Sandbox]: Sandbox 列表

**Raises:**

- `ClientError`: 客户端错误
- `ServerError`: 服务器错误

---


#### 🔹 `list_sandboxes`

```python
def list_sandboxes(self, input: Optional[ListSandboxesInput] = None, config: Optional[Config] = None) -> ListSandboxesOutput
```

枚举 Sandboxes（同步）

**Args:**

- `input`: 分页配置
- `config`: 配置对象

**Returns:**

List[Sandbox]: Sandbox 列表

**Raises:**

- `ClientError`: 客户端错误
- `ServerError`: 服务器错误

---




