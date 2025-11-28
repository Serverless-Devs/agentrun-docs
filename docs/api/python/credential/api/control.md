---
sidebar_position: 1
title: Control
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Control

Credential 管控链路 API

## 类

## CredentialControlAPI

```python
class CredentialControlAPI(ControlAPI)
```

Credential 管控链路 API

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, config: Optional[Config] = None)
```

初始化 API 客户端

**Args:**

- `config`: 全局配置对象

---


#### 🔹 `create_credential`

```python
def create_credential(self, input: CreateCredentialInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Credential
```

创建凭证

**Args:**

- `input`: 凭证配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

Credential: 创建的凭证对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `create_credential_async`

```python
async def create_credential_async(self, input: CreateCredentialInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Credential
```

创建凭证

**Args:**

- `input`: 凭证配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

Credential: 创建的凭证对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `delete_credential`

```python
def delete_credential(self, credential_name: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Credential
```

删除凭证

**Args:**

- `credential_name`: 凭证名称
- `headers`: 请求头
- `config`: 配置

**Returns:**

Credential: 删除凭证的结果

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `delete_credential_async`

```python
async def delete_credential_async(self, credential_name: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Credential
```

删除凭证

**Args:**

- `credential_name`: 凭证名称
- `headers`: 请求头
- `config`: 配置

**Returns:**

Credential: 删除凭证的结果

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `update_credential`

```python
def update_credential(self, credential_name: str, input: UpdateCredentialInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Credential
```

更新凭证

**Args:**

- `credential_name`: 凭证名称
- `input`: 凭证配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

Credential: 更新后的凭证对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `update_credential_async`

```python
async def update_credential_async(self, credential_name: str, input: UpdateCredentialInput, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Credential
```

更新凭证

**Args:**

- `credential_name`: 凭证名称
- `input`: 凭证配置
- `headers`: 请求头
- `config`: 配置

**Returns:**

Credential: 更新后的凭证对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `get_credential`

```python
def get_credential(self, credential_name: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Credential
```

获取凭证

**Args:**

- `credential_name`: 凭证名称
- `headers`: 请求头
- `config`: 配置

**Returns:**

Credential: 凭证对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `get_credential_async`

```python
async def get_credential_async(self, credential_name: str, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Credential
```

获取凭证

**Args:**

- `credential_name`: 凭证名称
- `headers`: 请求头
- `config`: 配置

**Returns:**

Credential: 凭证对象

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `list_credentials`

```python
def list_credentials(self, input: ListCredentialsRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ListCredentialsOutput
```

列出凭证

**Args:**

- `input`: 查询参数
- `headers`: 请求头
- `config`: 配置

**Returns:**

ListCredentialsOutput: 凭证列表

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---


#### 🔹 `list_credentials_async`

```python
async def list_credentials_async(self, input: ListCredentialsRequest, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> ListCredentialsOutput
```

列出凭证

**Args:**

- `input`: 查询参数
- `headers`: 请求头
- `config`: 配置

**Returns:**

ListCredentialsOutput: 凭证列表

**Raises:**

- `AgentRuntimeError`: 调用失败时抛出
- `ClientError`: 客户端错误
- `ServerError`: 服务器错误
- `APIError`: 运行时错误

---




