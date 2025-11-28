---
sidebar_position: 3
title: Control
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Control

Sandbox 管控链路 API

## 类

## SandboxControlAPI

```python
class SandboxControlAPI(ControlAPI)
```

Sandbox 管控链路 API

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, config: Optional[Config] = None)
```

初始化 API 客户端

**Args:**

- `config`: 全局配置对象

---


#### 🔹 `create_template`

```python
def create_template(self, input: CreateTemplateInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Template
```

创建 Sandbox Template

**Args:**

- `input`: Template 配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

Template: 创建的 Template 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `create_template_async`

```python
async def create_template_async(self, input: CreateTemplateInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Template
```

创建 Sandbox Template

**Args:**

- `input`: Template 配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

Template: 创建的 Template 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `delete_template`

```python
def delete_template(self, template_name: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Template
```

删除 Sandbox Template

**Args:**

- `template_name`: Template 名称
- `headers`: 请求头
- `config`: 配置

**Returns:**

Template: 删除结果

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `delete_template_async`

```python
async def delete_template_async(self, template_name: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Template
```

删除 Sandbox Template

**Args:**

- `template_name`: Template 名称
- `headers`: 请求头
- `config`: 配置

**Returns:**

Template: 删除结果

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `update_template`

```python
def update_template(self, template_name: str, input: UpdateTemplateInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Template
```

更新 Sandbox Template

**Args:**

- `template_name`: Template 名称
- `input`: Template 配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

Template: 更新的 Template 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `update_template_async`

```python
async def update_template_async(self, template_name: str, input: UpdateTemplateInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Template
```

更新 Sandbox Template

**Args:**

- `template_name`: Template 名称
- `input`: Template 配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

Template: 更新的 Template 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `get_template`

```python
def get_template(self, template_name: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Template
```

获取 Sandbox Template

**Args:**

- `template_name`: Template 名称
- `headers`: 请求头
- `config`: 配置

**Returns:**

Template: Template 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `get_template_async`

```python
async def get_template_async(self, template_name: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Template
```

获取 Sandbox Template

**Args:**

- `template_name`: Template 名称
- `headers`: 请求头
- `config`: 配置

**Returns:**

Template: Template 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `list_templates`

```python
def list_templates(self, input: ListTemplatesRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ListTemplatesOutput
```

枚举 Sandbox Templates

**Args:**

- `input`: 枚举的配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ListTemplatesOutput: Template 列表

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `list_templates_async`

```python
async def list_templates_async(self, input: ListTemplatesRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ListTemplatesOutput
```

枚举 Sandbox Templates

**Args:**

- `input`: 枚举的配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ListTemplatesOutput: Template 列表

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `create_sandbox`

```python
def create_sandbox(self, input: CreateSandboxInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Sandbox
```

创建 Sandbox

**Args:**

- `input`: Sandbox 配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

Sandbox: 创建的 Sandbox 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `create_sandbox_async`

```python
async def create_sandbox_async(self, input: CreateSandboxInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Sandbox
```

创建 Sandbox

**Args:**

- `input`: Sandbox 配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

Sandbox: 创建的 Sandbox 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `stop_sandbox`

```python
def stop_sandbox(self, sandbox_id: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Sandbox
```

停止 Sandbox

**Args:**

- `sandbox_id`: Sandbox ID
- `headers`: 请求头
- `config`: 配置

**Returns:**

Sandbox: 停止结果

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `stop_sandbox_async`

```python
async def stop_sandbox_async(self, sandbox_id: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Sandbox
```

停止 Sandbox

**Args:**

- `sandbox_id`: Sandbox ID
- `headers`: 请求头
- `config`: 配置

**Returns:**

Sandbox: 停止结果

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `get_sandbox`

```python
def get_sandbox(self, sandbox_id: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Sandbox
```

获取 Sandbox

**Args:**

- `sandbox_id`: Sandbox ID
- `headers`: 请求头
- `config`: 配置

**Returns:**

Sandbox: Sandbox 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `get_sandbox_async`

```python
async def get_sandbox_async(self, sandbox_id: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Sandbox
```

获取 Sandbox

**Args:**

- `sandbox_id`: Sandbox ID
- `headers`: 请求头
- `config`: 配置

**Returns:**

Sandbox: Sandbox 对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `list_sandboxes`

```python
def list_sandboxes(self, input: ListSandboxesRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ListSandboxesOutput
```

枚举 Sandboxes

**Args:**

- `input`: 枚举的配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ListSandboxesOutput: Sandbox 列表

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `list_sandboxes_async`

```python
async def list_sandboxes_async(self, input: ListSandboxesRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ListSandboxesOutput
```

枚举 Sandboxes

**Args:**

- `input`: 枚举的配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

ListSandboxesOutput: Sandbox 列表

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---




