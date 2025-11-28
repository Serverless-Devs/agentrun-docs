---
sidebar_position: 4
title: Exception
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Exception

异常定义

## 类

## AgentRunError

```python
class AgentRunError(Exception)
```

AgentRun SDK 基础异常类

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, message: str, **kwargs)
```

初始化异常

**Args:**

- `message`: 错误消息
- `details`: 详细信息

---


#### 🔹 `kwargs_str`

```python
def kwargs_str(cls, **kwargs) -> str
```

获取详细信息字符串

**Returns:**

str: 详细信息字符串

---


#### 🔹 `details_str`

```python
def details_str(self) -> str
```


---




## HTTPError

```python
class HTTPError(AgentRunError)
```

HTTP 异常类

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, status_code: int, message: str, request_id: Optional[str] = None, **kwargs)
```


---


#### 🔹 `to_resource_error`

```python
def to_resource_error(self, resource_type: str, resource_id: Optional[str] = '')
```


---




## ClientError

```python
class ClientError(HTTPError)
```

客户端异常类

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, status_code: int, message: str, request_id: Optional[str] = None, **kwargs)
```


---




## ServerError

```python
class ServerError(HTTPError)
```

服务端异常类

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, status_code: int, message: str, request_id: Optional[str] = None)
```


---




## ResourceNotExistError

```python
class ResourceNotExistError(AgentRunError)
```

资源不存在异常

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, resource_type: str, resource_id: Optional[str] = '')
```


---




## ResourceAlreadyExistError

```python
class ResourceAlreadyExistError(AgentRunError)
```

资源已存在异常

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, resource_type: str, resource_id: Optional[str] = '')
```


---




## DeleteResourceError

```python
class DeleteResourceError(AgentRunError)
```

删除资源异常

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, message: Optional[str] = None)
```


---




