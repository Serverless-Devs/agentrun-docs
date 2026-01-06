---
sidebar_position: 1
title: Config
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Config

配置管理模块 / Configuration Management Module

此模块提供 AgentRun SDK 的全局配置管理功能。
This module provides global configuration management for AgentRun SDK.

## 类

## Config

```python
class Config
```

AgentRun SDK 全局配置类 / AgentRun SDK Global Configuration Class

用于管理账号凭证和客户端配置。
Used for managing account credentials and client configuration.

支持从参数或环境变量读取配置。
Supports reading configuration from parameters or environment variables.

**Examples:**

```python
>>> # 从参数创建配置 / Create config from parameters
    >>> config = Config(
    ...     account_id="your-account-id",
    ...     access_key_id="your-key-id",
    ...     access_key_secret="your-secret"
    ... )
    >>> # 或从环境变量读取 / Or read from environment variables
    >>> config = Config()
```

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, access_key_id: Optional[str] = None, access_key_secret: Optional[str] = None, security_token: Optional[str] = None, account_id: Optional[str] = None, token: Optional[str] = None, region_id: Optional[str] = None, timeout: Optional[int] = 600, read_timeout: Optional[int] = 100000, control_endpoint: Optional[str] = None, data_endpoint: Optional[str] = None, devs_endpoint: Optional[str] = None, headers: Optional[Dict[str, str]] = None) -> None
```

初始化配置 / Initialize configuration

**Args:**

- `access_key_id`: Access Key ID / Access Key ID
- `未提供时从环境变量读取`: AGENTRUN_ACCESS_KEY_ID 或 ALIBABA_CLOUD_ACCESS_KEY_ID
- `Read from env vars if not provided`: AGENTRUN_ACCESS_KEY_ID or ALIBABA_CLOUD_ACCESS_KEY_ID
- `access_key_secret`: Access Key Secret / Access Key Secret
- `未提供时从环境变量读取`: AGENTRUN_ACCESS_KEY_SECRET 或 ALIBABA_CLOUD_ACCESS_KEY_SECRET
- `Read from env vars if not provided`: AGENTRUN_ACCESS_KEY_SECRET or ALIBABA_CLOUD_ACCESS_KEY_SECRET
- `security_token`: 安全令牌 / Security token
- `未提供时从环境变量读取`: AGENTRUN_SECURITY_TOKEN 或 ALIBABA_CLOUD_SECURITY_TOKEN
- `Read from env vars if not provided`: AGENTRUN_SECURITY_TOKEN or ALIBABA_CLOUD_SECURITY_TOKEN
- `account_id`: 账号 ID / Account ID
- `未提供时从环境变量读取`: AGENTRUN_ACCOUNT_ID 或 FC_ACCOUNT_ID
- `Read from env vars if not provided`: AGENTRUN_ACCOUNT_ID or FC_ACCOUNT_ID
- `token`: 自定义令牌,用于数据链路调用 / Custom token for data API calls
- `region_id`: 区域 ID,默认 cn-hangzhou / Region ID, defaults to cn-hangzhou
- `timeout`: 请求超时时间(秒),默认 600 / Request timeout in seconds, defaults to 600
- `read_timeout`: 读取超时时间(秒),默认 100000 / Read timeout in seconds, defaults to 100000
- `control_endpoint`: 自定义控制链路端点,可选 / Custom control endpoint, optional
- `data_endpoint`: 自定义数据链路端点,可选 / Custom data endpoint, optional
- `devs_endpoint`: 自定义 DevS 端点,可选 / Custom DevS endpoint, optional
- `headers`: 自定义请求头,可选 / Custom request headers, optional

---


#### 🔹 `with_configs`

```python
def with_configs(cls, *configs: Optional['Config']) -> 'Config'
```


---


#### 🔹 `update`

```python
def update(self, *configs: Optional['Config']) -> 'Config'
```

使用给定的配置对象,返回新的实例,优先使用靠后的值

**Args:**

- `configs`: 要合并的配置对象

**Returns:**

合并后的新配置对象

---


#### 🔹 `get_access_key_id`

```python
def get_access_key_id(self) -> str
```

获取 Access Key ID

---


#### 🔹 `get_access_key_secret`

```python
def get_access_key_secret(self) -> str
```

获取 Access Key Secret

---


#### 🔹 `get_security_token`

```python
def get_security_token(self) -> str
```

获取安全令牌

---


#### 🔹 `get_account_id`

```python
def get_account_id(self) -> str
```

获取账号 ID

---


#### 🔹 `get_token`

```python
def get_token(self) -> Optional[str]
```

获取自定义令牌

---


#### 🔹 `get_region_id`

```python
def get_region_id(self) -> str
```

获取区域 ID

---


#### 🔹 `get_timeout`

```python
def get_timeout(self) -> Optional[int]
```

获取请求超时时间

---


#### 🔹 `get_read_timeout`

```python
def get_read_timeout(self) -> Optional[int]
```

获取请求超时时间

---


#### 🔹 `get_control_endpoint`

```python
def get_control_endpoint(self) -> str
```

获取控制链路端点

---


#### 🔹 `get_data_endpoint`

```python
def get_data_endpoint(self) -> str
```

获取数据链路端点

---


#### 🔹 `get_devs_endpoint`

```python
def get_devs_endpoint(self) -> str
```

获取 Devs 端点

---


#### 🔹 `get_headers`

```python
def get_headers(self) -> Dict[str, str]
```

获取自定义请求头

---




## 函数

## get_config_with_default

```python
def get_config_with_default(default: str, *key: str) -> str
```

从环境变量获取值,支持多个候选键 / Get value from environment variables with multiple fallback keys

**Args:**

- `default`: 默认值 / Default value
- `*key`: 候选环境变量名 / Candidate environment variable names

**Returns:**

str: 环境变量值或默认值 / Environment variable value or default value



