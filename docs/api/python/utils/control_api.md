---
sidebar_position: 2
title: ControlApi
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# ControlApi

控制 API 基类模块 / Control API Base Module

此模块定义控制链路 API 的基类。
This module defines the base class for control API.

## 类

## ControlAPI

```python
class ControlAPI
```

控制链路客户端基类 / Control API Client Base Class

提供控制链路和 DevS API 客户端的获取功能。
Provides functionality to get control API and DevS API clients.

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, config: Optional[Config] = None)
```

初始化 Control API 客户端 / Initialize Control API client

**Args:**

- `config`: 全局配置对象,可选 / Global configuration object, optional

---




