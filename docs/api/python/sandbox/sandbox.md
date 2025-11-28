---
sidebar_position: 5
title: Sandbox
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Sandbox

Sandbox 高层 API / Sandbox High-Level API

此模块定义沙箱资源的高级API。
This module defines the high-level API for sandbox resources.

## 类

## Sandbox

```python
class Sandbox(BaseModel)
```

Sandbox 实例

封装了 Sandbox 的基本信息和操作方法

### 方法

#### 🔹 `create_async`

```python
async def create_async(cls, template_type: Literal[TemplateType.CODE_INTERPRETER], template_name: Optional[str] = None, sandbox_idle_timeout_seconds: Optional[int] = 600, config: Optional[Config] = None) -> 'CodeInterpreterSandbox'
```


---


#### 🔹 `create`

```python
def create(cls, template_type: Literal[TemplateType.CODE_INTERPRETER], template_name: Optional[str] = None, sandbox_idle_timeout_seconds: Optional[int] = 600, config: Optional[Config] = None) -> 'CodeInterpreterSandbox'
```


---


#### 🔹 `create_async`

```python
async def create_async(cls, template_type: Literal[TemplateType.BROWSER], template_name: Optional[str] = None, sandbox_idle_timeout_seconds: Optional[int] = 600, config: Optional[Config] = None) -> 'BrowserSandbox'
```


---


#### 🔹 `create`

```python
def create(cls, template_type: Literal[TemplateType.BROWSER], template_name: Optional[str] = None, sandbox_idle_timeout_seconds: Optional[int] = 600, config: Optional[Config] = None) -> 'BrowserSandbox'
```


---


#### 🔹 `create_async`

```python
async def create_async(cls, template_type: TemplateType, template_name: Optional[str] = None, sandbox_idle_timeout_seconds: Optional[int] = 600, config: Optional[Config] = None) -> Union['CodeInterpreterSandbox', 'BrowserSandbox']
```


---


#### 🔹 `create`

```python
def create(cls, template_type: TemplateType, template_name: Optional[str] = None, sandbox_idle_timeout_seconds: Optional[int] = 600, config: Optional[Config] = None) -> Union['CodeInterpreterSandbox', 'BrowserSandbox']
```


---


#### 🔹 `stop_by_id_async`

```python
async def stop_by_id_async(cls, sandbox_id: str)
```

通过 ID 停止 Sandbox（异步）

**Args:**

- `sandbox_id`: Sandbox ID
- `config`: 配置对象

**Returns:**

Sandbox: Sandbox 对象

---


#### 🔹 `stop_by_id`

```python
def stop_by_id(cls, sandbox_id: str)
```

通过 ID 停止 Sandbox（同步）

**Args:**

- `sandbox_id`: Sandbox ID
- `config`: 配置对象

**Returns:**

Sandbox: Sandbox 对象

---


#### 🔹 `delete_by_id_async`

```python
async def delete_by_id_async(cls, sandbox_id: str)
```

通过 ID 删除 Sandbox（异步）

**Args:**

- `sandbox_id`: Sandbox ID
- `config`: 配置对象

**Returns:**

Sandbox: Sandbox 对象

---


#### 🔹 `delete_by_id`

```python
def delete_by_id(cls, sandbox_id: str)
```

通过 ID 删除 Sandbox（同步）

**Args:**

- `sandbox_id`: Sandbox ID
- `config`: 配置对象

**Returns:**

Sandbox: Sandbox 对象

---


#### 🔹 `list_async`

```python
async def list_async(cls, input: Optional['ListSandboxesInput'] = None, config: Optional[Config] = None) -> 'ListSandboxesOutput'
```

列出 Sandboxes（异步）

**Args:**

- `input`: 列表查询配置
- `config`: 配置对象

**Returns:**

ListSandboxesOutput: Sandbox 列表结果

---


#### 🔹 `list`

```python
def list(cls, input: Optional['ListSandboxesInput'] = None, config: Optional[Config] = None) -> 'ListSandboxesOutput'
```

列出 Sandboxes（同步）

**Args:**

- `input`: 列表查询配置
- `config`: 配置对象

**Returns:**

ListSandboxesOutput: Sandbox 列表结果

---


#### 🔹 `connect_async`

```python
async def connect_async(cls, sandbox_id: str, template_type: Literal[TemplateType.CODE_INTERPRETER], config: Optional[Config] = None) -> 'CodeInterpreterSandbox'
```


---


#### 🔹 `connect`

```python
def connect(cls, sandbox_id: str, template_type: Literal[TemplateType.CODE_INTERPRETER], config: Optional[Config] = None) -> 'CodeInterpreterSandbox'
```


---


#### 🔹 `connect_async`

```python
async def connect_async(cls, sandbox_id: str, template_type: Literal[TemplateType.BROWSER], config: Optional[Config] = None) -> 'BrowserSandbox'
```


---


#### 🔹 `connect`

```python
def connect(cls, sandbox_id: str, template_type: Literal[TemplateType.BROWSER], config: Optional[Config] = None) -> 'BrowserSandbox'
```


---


#### 🔹 `connect_async`

```python
async def connect_async(cls, sandbox_id: str, template_type: None = None, config: Optional[Config] = None) -> Union['CodeInterpreterSandbox', 'BrowserSandbox']
```


---


#### 🔹 `connect`

```python
def connect(cls, sandbox_id: str, template_type: None = None, config: Optional[Config] = None) -> Union['CodeInterpreterSandbox', 'BrowserSandbox']
```


---


#### 🔹 `connect_async`

```python
async def connect_async(cls, sandbox_id: str, template_type: Optional[TemplateType] = None, config: Optional[Config] = None) -> Union['CodeInterpreterSandbox', 'BrowserSandbox']
```

连接一个SandBox（异步）

**Args:**

- `sandbox_id`: Sandbox ID
- `type`: 可选的类型参数，用于类型提示和运行时验证
- `config`: 配置对象

**Returns:**

Sandbox: 根据模板类型返回对应的 Sandbox 子类对象

**Raises:**

- `ValueError`: 如果模板类型不支持或与预期类型不匹配

---


#### 🔹 `connect`

```python
def connect(cls, sandbox_id: str, template_type: Optional[TemplateType] = None, config: Optional[Config] = None) -> Union['CodeInterpreterSandbox', 'BrowserSandbox']
```

连接一个SandBox（同步）

**Args:**

- `sandbox_id`: Sandbox ID
- `type`: 可选的类型参数，用于类型提示和运行时验证
- `config`: 配置对象

**Returns:**

Sandbox: 根据模板类型返回对应的 Sandbox 子类对象

**Raises:**

- `ValueError`: 如果模板类型不支持或与预期类型不匹配

---


#### 🔹 `create_template_async`

```python
async def create_template_async(cls, input: 'TemplateInput', config: Optional[Config] = None) -> 'Template'
```

创建 Template（异步）

**Args:**

- `input`: Template 配置
- `config`: 配置对象

**Returns:**

Template: 创建的 Template 对象

---


#### 🔹 `create_template`

```python
def create_template(cls, input: 'TemplateInput', config: Optional[Config] = None) -> 'Template'
```

创建 Template（同步）

**Args:**

- `input`: Template 配置
- `config`: 配置对象

**Returns:**

Template: 创建的 Template 对象

---


#### 🔹 `get_template_async`

```python
async def get_template_async(cls, template_name: str, config: Optional[Config] = None) -> 'Template'
```

获取 Template（异步）

**Args:**

- `template_name`: Template 名称
- `config`: 配置对象

**Returns:**

Template: Template 对象

---


#### 🔹 `get_template`

```python
def get_template(cls, template_name: str, config: Optional[Config] = None) -> 'Template'
```

获取 Template（同步）

**Args:**

- `template_name`: Template 名称
- `config`: 配置对象

**Returns:**

Template: Template 对象

---


#### 🔹 `update_template_async`

```python
async def update_template_async(cls, template_name: str, input: 'TemplateInput', config: Optional[Config] = None) -> 'Template'
```

更新 Template（异步）

**Args:**

- `template_name`: Template 名称
- `input`: Template 更新配置
- `config`: 配置对象

**Returns:**

Template: 更新后的 Template 对象

---


#### 🔹 `update_template`

```python
def update_template(cls, template_name: str, input: 'TemplateInput', config: Optional[Config] = None) -> 'Template'
```

更新 Template（同步）

**Args:**

- `template_name`: Template 名称
- `input`: Template 更新配置
- `config`: 配置对象

**Returns:**

Template: 更新后的 Template 对象

---


#### 🔹 `delete_template_async`

```python
async def delete_template_async(cls, template_name: str, config: Optional[Config] = None) -> 'Template'
```

删除 Template（异步）

**Args:**

- `template_name`: Template 名称
- `config`: 配置对象

**Returns:**

Template: 删除的 Template 对象

---


#### 🔹 `delete_template`

```python
def delete_template(cls, template_name: str, config: Optional[Config] = None) -> 'Template'
```

删除 Template（同步）

**Args:**

- `template_name`: Template 名称
- `config`: 配置对象

**Returns:**

Template: 删除的 Template 对象

---


#### 🔹 `list_templates_async`

```python
async def list_templates_async(cls, input: Optional['PageableInput'] = None, config: Optional[Config] = None) -> List['Template']
```

列出 Templates（异步）

**Args:**

- `input`: 分页配置
- `config`: 配置对象

**Returns:**

List[Template]: Template 列表

---


#### 🔹 `list_templates`

```python
def list_templates(cls, input: Optional['PageableInput'] = None, config: Optional[Config] = None) -> List['Template']
```

列出 Templates（同步）

**Args:**

- `input`: 分页配置
- `config`: 配置对象

**Returns:**

List[Template]: Template 列表

---


#### 🔹 `get_async`

```python
async def get_async(self)
```


---


#### 🔹 `get`

```python
def get(self)
```


---


#### 🔹 `delete_async`

```python
async def delete_async(self)
```


---


#### 🔹 `delete`

```python
def delete(self)
```


---


#### 🔹 `stop_async`

```python
async def stop_async(self)
```


---


#### 🔹 `stop`

```python
def stop(self)
```


---




