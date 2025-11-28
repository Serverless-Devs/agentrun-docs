---
sidebar_position: 3
title: Model
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Model

Credential 模型定义 / Credential Model Definitions

定义凭证相关的数据模型和枚举。
Defines data models and enumerations related to credentials.

## 类

## CredentialAuthType

```python
class CredentialAuthType(str, Enum)
```

凭证认证类型 / Credential Authentication Type



## CredentialSourceType

```python
class CredentialSourceType(str, Enum)
```

凭证来源类型 / Credential Source Type



## CredentialBasicAuth

```python
class CredentialBasicAuth(BaseModel)
```




## RelatedResource

```python
class RelatedResource(BaseModel)
```




## CredentialConfigInner

```python
class CredentialConfigInner(BaseModel)
```




## CredentialConfig

```python
class CredentialConfig(CredentialConfigInner)
```

凭证配置

### 方法

#### 🔹 `inbound_api_key`

```python
def inbound_api_key(cls, api_key: str, header_key: str = 'Authorization')
```

配置访问 AgentRun 的 api key 凭证

---


#### 🔹 `inbound_static_jwt`

```python
def inbound_static_jwt(cls, jwks: str)
```

配置访问 AgentRun 的静态 JWKS 凭证

---


#### 🔹 `inbound_remote_jwt`

```python
def inbound_remote_jwt(cls, uri: str, timeout: int = 3000, ttl: int = 30000, **kwargs)
```

配置访问 AgentRun 的远程 JWT 凭证

---


#### 🔹 `inbound_basic`

```python
def inbound_basic(cls, users: List[CredentialBasicAuth])
```

配置访问 AgentRun 的 Basic 凭证

---


#### 🔹 `outbound_llm_api_key`

```python
def outbound_llm_api_key(cls, api_key: str, provider: str)
```

配置访问第三方模型的 api key 凭证

---


#### 🔹 `outbound_tool_api_key`

```python
def outbound_tool_api_key(cls, api_key: str)
```

配置访问第三方工具的 api key 凭证

---


#### 🔹 `outbound_tool_ak_sk`

```python
def outbound_tool_ak_sk(cls, provider: str, access_key_id: str, access_key_secred: str, account_id: str)
```

配置访问第三方工具的 ak/sk 凭证

---


#### 🔹 `outbound_tool_ak_sk_custom`

```python
def outbound_tool_ak_sk_custom(cls, auth_config: Dict[str, str])
```

配置访问第三方工具的自定义凭证

---


#### 🔹 `outbound_tool_custom_header`

```python
def outbound_tool_custom_header(cls, headers: Dict[str, str])
```

配置访问第三方工具的自定义 Header 凭证

---




## CredentialMutableProps

```python
class CredentialMutableProps(BaseModel)
```

凭证公共配置



## CredentialImmutableProps

```python
class CredentialImmutableProps(BaseModel)
```




## CredentialSystemProps

```python
class CredentialSystemProps(CredentialConfigInner)
```




## CredentialCreateInput

```python
class CredentialCreateInput(CredentialImmutableProps, CredentialMutableProps)
```

凭证创建输入参数



## CredentialUpdateInput

```python
class CredentialUpdateInput(CredentialMutableProps)
```




## CredentialListInput

```python
class CredentialListInput(PageableInput)
```




## CredentialListOutput

```python
class CredentialListOutput(BaseModel)
```


### 方法

#### 🔹 `to_credential_async`

```python
async def to_credential_async(self, config: Optional[Config] = None)
```


---


#### 🔹 `to_credential`

```python
def to_credential(self, config: Optional[Config] = None)
```


---




