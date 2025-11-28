---
sidebar_position: 8
title: Resource
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Resource

资源基类模板 / Resource Base Template

此模板用于生成资源对象的基类代码。
This template is used to generate base class code for resource objects.

## 类

## ResourceBase

```python
class ResourceBase(BaseModel)
```


### 方法

#### 🔹 `refresh_async`

```python
async def refresh_async(self, config: Optional[Config] = None) -> Self
```


---


#### 🔹 `refresh`

```python
def refresh(self, config: Optional[Config] = None) -> Self
```


---


#### 🔹 `delete_async`

```python
async def delete_async(self, config: Optional[Config] = None) -> Self
```


---


#### 🔹 `delete`

```python
def delete(self, config: Optional[Config] = None) -> Self
```


---


#### 🔹 `wait_until_ready_or_failed_async`

```python
async def wait_until_ready_or_failed_async(self, callback: Optional[Callable[[Self], None]] = None, interval_seconds: int = 5, timeout_seconds: int = 300)
```

等待智能体运行时进入就绪状态

---


#### 🔹 `wait_until_ready_or_failed`

```python
def wait_until_ready_or_failed(self, callback: Optional[Callable[[Self], None]] = None, interval_seconds: int = 5, timeout_seconds: int = 300)
```

等待智能体运行时进入就绪状态

---


#### 🔹 `delete_and_wait_until_finished_async`

```python
async def delete_and_wait_until_finished_async(self, callback: Optional[Callable[[Self], None]] = None, interval_seconds: int = 5, timeout_seconds: int = 300)
```

等待智能体运行时被删除

---


#### 🔹 `delete_and_wait_until_finished`

```python
def delete_and_wait_until_finished(self, callback: Optional[Callable[[Self], None]] = None, interval_seconds: int = 5, timeout_seconds: int = 300)
```

等待智能体运行时被删除

---


#### 🔹 `set_config`

```python
def set_config(self, config: Config) -> Self
```

设置配置

**Args:**

- `config`: 配置

**Returns:**

Self: 当前对象

---




