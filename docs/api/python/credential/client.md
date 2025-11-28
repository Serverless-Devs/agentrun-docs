---
sidebar_position: 1
title: Client
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Client

Credential 客户端 / Credential Client

此模块提供凭证管理的客户端API。
This module provides the client API for credential management.

## 类

## CredentialClient

```python
class CredentialClient
```

Credential 客户端 / Credential Client

提供凭证的创建、删除、更新和查询功能。
Provides create, delete, update and query functions for credentials.

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, config: Optional[Config] = None)
```

初始化客户端 / Initialize client

**Args:**

- `config`: 配置对象,可选 / Configuration object, optional

---


#### 🔹 `create_async`

```python
async def create_async(self, input: CredentialCreateInput, config: Optional[Config] = None)
```

创建凭证(异步) / Create credential asynchronously

**Args:**

- `input`: 凭证输入参数 / Credential input parameters
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

Credential: 创建的凭证对象 / Created credential object

**Raises:**

- `ResourceAlreadyExistError`: 资源已存在 / Resource already exists
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `create`

```python
def create(self, input: CredentialCreateInput, config: Optional[Config] = None)
```

创建凭证(同步) / Create credential asynchronously

**Args:**

- `input`: 凭证输入参数 / Credential input parameters
- `config`: 配置对象,可选 / Configuration object, optional

**Returns:**

Credential: 创建的凭证对象 / Created credential object

**Raises:**

- `ResourceAlreadyExistError`: 资源已存在 / Resource already exists
- `HTTPError`: HTTP 请求错误 / HTTP request error

---


#### 🔹 `delete_async`

```python
async def delete_async(self, credential_name: str, config: Optional[Config] = None)
```

删除凭证（异步）

**Args:**

- `credential_name`: 凭证名称
- `config`: 配置

**Raises:**

- `ResourceNotExistError`: 凭证不存在

---


#### 🔹 `delete`

```python
def delete(self, credential_name: str, config: Optional[Config] = None)
```

删除凭证（同步）

**Args:**

- `credential_name`: 凭证名称
- `config`: 配置

**Raises:**

- `ResourceNotExistError`: 凭证不存在

---


#### 🔹 `update_async`

```python
async def update_async(self, credential_name: str, input: CredentialUpdateInput, config: Optional[Config] = None)
```

更新凭证（异步）

**Args:**

- `credential_name`: 凭证名称
- `input`: 凭证更新输入参数
- `config`: 配置

**Returns:**

Credential: 更新后的凭证对象

**Raises:**

- `ResourceNotExistError`: 凭证不存在

---


#### 🔹 `update`

```python
def update(self, credential_name: str, input: CredentialUpdateInput, config: Optional[Config] = None)
```

更新凭证（同步）

**Args:**

- `credential_name`: 凭证名称
- `input`: 凭证更新输入参数
- `config`: 配置

**Returns:**

Credential: 更新后的凭证对象

**Raises:**

- `ResourceNotExistError`: 凭证不存在

---


#### 🔹 `get_async`

```python
async def get_async(self, credential_name: str, config: Optional[Config] = None)
```

获取凭证（异步）

**Args:**

- `credential_name`: 凭证名称
- `config`: 配置

**Returns:**

Credential: 凭证对象

**Raises:**

- `ResourceNotExistError`: 凭证不存在

---


#### 🔹 `get`

```python
def get(self, credential_name: str, config: Optional[Config] = None)
```

获取凭证（同步）

**Args:**

- `credential_name`: 凭证名称
- `config`: 配置

**Returns:**

Credential: 凭证对象

**Raises:**

- `ResourceNotExistError`: 凭证不存在

---


#### 🔹 `list_async`

```python
async def list_async(self, input: Optional[CredentialListInput] = None, config: Optional[Config] = None)
```

列出凭证（异步）

**Args:**

- `input`: 分页查询参数
- `config`: 配置

**Returns:**

List[Credential]: 凭证列表

---


#### 🔹 `list`

```python
def list(self, input: Optional[CredentialListInput] = None, config: Optional[Config] = None)
```

列出凭证（同步）

**Args:**

- `input`: 分页查询参数
- `config`: 配置

**Returns:**

List[Credential]: 凭证列表

---




