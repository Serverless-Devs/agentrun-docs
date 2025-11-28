---
sidebar_position: 2
title: Credential
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Credential

Credential 高层 API / Credential High-Level API

此模块定义凭证资源的高级API。
This module defines the high-level API for credential resources.

## 类

## Credential

```python
class Credential(CredentialMutableProps, CredentialImmutableProps, CredentialSystemProps, ResourceBase)
```

凭证资源 / Credential Resource

提供凭证的完整生命周期管理,包括创建、删除、更新、查询。
Provides complete lifecycle management for credentials, including create, delete, update, and query.

### 方法

#### 🔹 `create_async`

```python
async def create_async(cls, input: CredentialCreateInput, config: Optional[Config] = None)
```

创建凭证（异步）

**Args:**

- `input`: 凭证输入参数
- `config`: 配置

**Returns:**

Credential: 创建的凭证对象

---


#### 🔹 `create`

```python
def create(cls, input: CredentialCreateInput, config: Optional[Config] = None)
```

创建凭证（同步）

**Args:**

- `input`: 凭证输入参数
- `config`: 配置

**Returns:**

Credential: 创建的凭证对象

---


#### 🔹 `delete_by_name_async`

```python
async def delete_by_name_async(cls, credential_name: str, config: Optional[Config] = None)
```

根据名称删除凭证（异步）

**Args:**

- `credential_name`: 凭证名称
- `config`: 配置

---


#### 🔹 `delete_by_name`

```python
def delete_by_name(cls, credential_name: str, config: Optional[Config] = None)
```

根据名称删除凭证（同步）

**Args:**

- `credential_name`: 凭证名称
- `config`: 配置

---


#### 🔹 `update_by_name_async`

```python
async def update_by_name_async(cls, credential_name: str, input: CredentialUpdateInput, config: Optional[Config] = None)
```

根据名称更新凭证（异步）

**Args:**

- `credential_name`: 凭证名称
- `input`: 凭证更新输入参数
- `config`: 配置

**Returns:**

Credential: 更新后的凭证对象

---


#### 🔹 `update_by_name`

```python
def update_by_name(cls, credential_name: str, input: CredentialUpdateInput, config: Optional[Config] = None)
```

根据名称更新凭证（同步）

**Args:**

- `credential_name`: 凭证名称
- `input`: 凭证更新输入参数
- `config`: 配置

**Returns:**

Credential: 更新后的凭证对象

---


#### 🔹 `get_by_name_async`

```python
async def get_by_name_async(cls, credential_name: str, config: Optional[Config] = None)
```

根据名称获取凭证（异步）

**Args:**

- `credential_name`: 凭证名称
- `config`: 配置

**Returns:**

Credential: 凭证对象

---


#### 🔹 `get_by_name`

```python
def get_by_name(cls, credential_name: str, config: Optional[Config] = None)
```

根据名称获取凭证（同步）

**Args:**

- `credential_name`: 凭证名称
- `config`: 配置

**Returns:**

Credential: 凭证对象

---


#### 🔹 `list_all_async`

```python
async def list_all_async(cls) -> List[CredentialListOutput]
```


---


#### 🔹 `list_all`

```python
def list_all(cls) -> List[CredentialListOutput]
```


---


#### 🔹 `update_async`

```python
async def update_async(self, input: CredentialUpdateInput, config: Optional[Config] = None)
```

更新凭证（异步）

**Args:**

- `input`: 凭证更新输入参数
- `config`: 配置

**Returns:**

Credential: 更新后的凭证对象

---


#### 🔹 `update`

```python
def update(self, input: CredentialUpdateInput, config: Optional[Config] = None)
```

更新凭证（同步）

**Args:**

- `input`: 凭证更新输入参数
- `config`: 配置

**Returns:**

Credential: 更新后的凭证对象

---


#### 🔹 `delete_async`

```python
async def delete_async(self, config: Optional[Config] = None)
```

删除凭证（异步）

**Args:**

- `config`: 配置

---


#### 🔹 `delete`

```python
def delete(self, config: Optional[Config] = None)
```

删除凭证（同步）

**Args:**

- `config`: 配置

---


#### 🔹 `get_async`

```python
async def get_async(self, config: Optional[Config] = None)
```

刷新凭证信息（异步）

**Args:**

- `config`: 配置

**Returns:**

Credential: 刷新后的凭证对象

---


#### 🔹 `get`

```python
def get(self, config: Optional[Config] = None)
```

刷新凭证信息（同步）

**Args:**

- `config`: 配置

**Returns:**

Credential: 刷新后的凭证对象

---


#### 🔹 `refresh_async`

```python
async def refresh_async(self, config: Optional[Config] = None)
```

刷新凭证信息（异步）

**Args:**

- `config`: 配置

**Returns:**

Credential: 刷新后的凭证对象

---


#### 🔹 `refresh`

```python
def refresh(self, config: Optional[Config] = None)
```

刷新凭证信息（同步）

**Args:**

- `config`: 配置

**Returns:**

Credential: 刷新后的凭证对象

---




