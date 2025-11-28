---
sidebar_position: 4
title: Model
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Model

Sandbox 模型定义 / Sandbox Model Definitions

定义沙箱相关的数据模型和枚举。
Defines data models and enumerations related to sandboxes.

## 类

## TemplateOSSPermission

```python
class TemplateOSSPermission(str, Enum)
```

Agent Runtime 网络访问模式 / Agent Runtime Network Access Mode



## TemplateType

```python
class TemplateType(str, Enum)
```

沙箱模板类型 / Sandbox Template Type



## TemplateNetworkMode

```python
class TemplateNetworkMode(str, Enum)
```

Agent Runtime 网络访问模式 / Agent Runtime Network Access Mode



## CodeLanguage

```python
class CodeLanguage(str, Enum)
```

Code Interpreter 代码语言 / Code Interpreter Programming Language



## TemplateNetworkConfiguration

```python
class TemplateNetworkConfiguration(BaseModel)
```

沙箱模板网络配置 / Sandbox Template Network Configuration



## TemplateOssConfiguration

```python
class TemplateOssConfiguration(BaseModel)
```

沙箱模板 OSS 配置 / Sandbox Template OSS Configuration



## TemplateLogConfiguration

```python
class TemplateLogConfiguration(BaseModel)
```

沙箱模板日志配置 / Sandbox Template Log Configuration



## TemplateCredentialConfiguration

```python
class TemplateCredentialConfiguration(BaseModel)
```

沙箱模板凭证配置 / Sandbox Template Credential Configuration



## TemplateArmsConfiguration

```python
class TemplateArmsConfiguration(BaseModel)
```

沙箱模板 ARMS 监控配置 / Sandbox Template ARMS Monitoring Configuration



## TemplateContainerConfiguration

```python
class TemplateContainerConfiguration(BaseModel)
```

沙箱模板容器配置 / Sandbox Template Container Configuration



## TemplateMcpOptions

```python
class TemplateMcpOptions(BaseModel)
```

沙箱模板 MCP 选项配置 / Sandbox Template MCP Options Configuration



## TemplateMcpState

```python
class TemplateMcpState(BaseModel)
```

沙箱模板 MCP 状态 / Sandbox Template MCP State



## TemplateInput

```python
class TemplateInput(BaseModel)
```

沙箱模板配置 / Sandbox Template Configuration

### 方法

#### 🔹 `set_disk_size_default`

```python
def set_disk_size_default(cls, values)
```

根据 template_type 设置 disk_size 的默认值 / Set default disk_size based on template_type

---


#### 🔹 `validate_template_constraints`

```python
def validate_template_constraints(self)
```


---




## SandboxInput

```python
class SandboxInput(BaseModel)
```

Sandbox 创建配置 / Sandbox Creation Configuration



## ListSandboxesInput

```python
class ListSandboxesInput(BaseModel)
```

Sandbox 列表查询配置 / Sandbox List Query Configuration



## ListSandboxesOutput

```python
class ListSandboxesOutput(BaseModel)
```

Sandbox 列表查询结果 / Sandbox List Query Result



## PageableInput

```python
class PageableInput(BaseModel)
```

分页查询参数 / Pagination Query Parameters



