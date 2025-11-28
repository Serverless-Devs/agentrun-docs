---
sidebar_position: 3
title: Model
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Model

Agent Runtime 数据模型 / Agent Runtime Data Models

此模块定义 Agent Runtime 相关的所有数据模型、枚举和输入输出对象。
This module defines all data models, enums, and input/output objects related to Agent Runtime.

## 类

## AgentRuntimeArtifact

```python
class AgentRuntimeArtifact(str, Enum)
```

Agent Runtime 运行方式 / Agent Runtime Artifact Type

定义 Agent Runtime 的运行方式,支持代码模式和容器模式。
Defines the runtime mode of Agent Runtime, supporting code mode and container mode.



## AgentRuntimeLanguage

```python
class AgentRuntimeLanguage(str, Enum)
```

Agent Runtime 运行时语言 / Agent Runtime Language

支持的编程语言运行时。
Supported programming language runtimes.



## AgentRuntimeCode

```python
class AgentRuntimeCode(BaseModel)
```

Agent Runtime 代码配置

### 方法

#### 🔹 `from_zip_file`

```python
def from_zip_file(cls, language: AgentRuntimeLanguage, command: List[str], zip_file_path: str) -> 'AgentRuntimeCode'
```


---


#### 🔹 `from_oss`

```python
def from_oss(cls, language: AgentRuntimeLanguage, command: List[str], bucket: str, object: str) -> 'AgentRuntimeCode'
```


---


#### 🔹 `from_file`

```python
def from_file(cls, language: AgentRuntimeLanguage, command: List[str], file_path: str) -> 'AgentRuntimeCode'
```


---




## AgentRuntimeContainer

```python
class AgentRuntimeContainer(BaseModel)
```

Agent Runtime 容器配置



## AgentRuntimeHealthCheckConfig

```python
class AgentRuntimeHealthCheckConfig(BaseModel)
```

Agent Runtime 健康检查配置



## AgentRuntimeLogConfig

```python
class AgentRuntimeLogConfig(BaseModel)
```

Agent Runtime 日志配置



## AgentRuntimeProtocolType

```python
class AgentRuntimeProtocolType(str, Enum)
```

Agent Runtime 协议类型



## AgentRuntimeProtocolConfig

```python
class AgentRuntimeProtocolConfig(BaseModel)
```

Agent Runtime 协议配置



## AgentRuntimeEndpointRoutingWeight

```python
class AgentRuntimeEndpointRoutingWeight(BaseModel)
```

智能体运行时端点路由配置



## AgentRuntimeEndpointRoutingConfig

```python
class AgentRuntimeEndpointRoutingConfig(BaseModel)
```

智能体运行时端点路由配置



## AgentRuntimeMutableProps

```python
class AgentRuntimeMutableProps(BaseModel)
```




## AgentRuntimeImmutableProps

```python
class AgentRuntimeImmutableProps(BaseModel)
```




## AgentRuntimeSystemProps

```python
class AgentRuntimeSystemProps(BaseModel)
```




## AgentRuntimeEndpointMutableProps

```python
class AgentRuntimeEndpointMutableProps(BaseModel)
```




## AgentRuntimeEndpointImmutableProps

```python
class AgentRuntimeEndpointImmutableProps(BaseModel)
```




## AgentRuntimeEndpointSystemProps

```python
class AgentRuntimeEndpointSystemProps(BaseModel)
```




## AgentRuntimeCreateInput

```python
class AgentRuntimeCreateInput(AgentRuntimeMutableProps, AgentRuntimeImmutableProps)
```




## AgentRuntimeUpdateInput

```python
class AgentRuntimeUpdateInput(AgentRuntimeMutableProps)
```




## AgentRuntimeListInput

```python
class AgentRuntimeListInput(PageableInput)
```




## AgentRuntimeEndpointCreateInput

```python
class AgentRuntimeEndpointCreateInput(AgentRuntimeEndpointMutableProps, AgentRuntimeEndpointImmutableProps)
```




## AgentRuntimeEndpointUpdateInput

```python
class AgentRuntimeEndpointUpdateInput(AgentRuntimeEndpointMutableProps)
```




## AgentRuntimeEndpointListInput

```python
class AgentRuntimeEndpointListInput(PageableInput)
```




## AgentRuntimeVersion

```python
class AgentRuntimeVersion(BaseModel)
```




## AgentRuntimeVersionListInput

```python
class AgentRuntimeVersionListInput(PageableInput)
```




