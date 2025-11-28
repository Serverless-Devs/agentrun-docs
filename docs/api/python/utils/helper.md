---
sidebar_position: 5
title: Helper
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Helper

辅助工具模块 / Helper Utilities Module

此模块提供一些通用的辅助函数。
This module provides general utility functions.

## 函数

## mask_password

```python
def mask_password(password: Optional[str]) -> str
```

遮蔽密码用于日志记录 / Mask password for logging purposes

将密码部分字符替换为星号,用于安全地记录日志。
Replaces part of the password characters with asterisks for safe logging.

**Args:**

- `password`: 原始密码,可选 / Original password, optional

**Returns:**

str: 遮蔽后的密码 / Masked password

**Examples:**

```python
>>> mask_password("password123")
    'pa******23'
    >>> mask_password("abc")
    'a*c'
```



