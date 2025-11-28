---
sidebar_position: 2
title: Sandbox
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Sandbox

## 类

## SandboxToolSet

```python
class SandboxToolSet(CommonToolSet)
```


### 方法

#### 🔹 `构造函数`

```python
def __init__(self, template_name: str, template_type: TemplateType)
```


---


#### 🔹 `close`

```python
def close(self)
```


---




## CodeInterpreterToolSet

```python
class CodeInterpreterToolSet(SandboxToolSet)
```

LangChain 代码沙箱工具适配器。

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, template_name: str, config: Optional[Config], sandbox_idle_timeout_seconds: int) -> None
```


---


#### 🔹 `execute_code`

```python
def execute_code(self, code: str, language: str = 'python', timeout: int = 60) -> Dict[str, Any]
```

在指定的 Code Interpreter 沙箱中执行代码

---


#### 🔹 `list_directory`

```python
def list_directory(self, path: str = '/') -> Dict[str, Any]
```

列出沙箱中的文件

---


#### 🔹 `read_file`

```python
def read_file(self, path: str) -> Dict[str, Any]
```

读取沙箱文件内容

---


#### 🔹 `write_file`

```python
def write_file(self, path: str, content: str) -> Dict[str, Any]
```


---




## BrowserToolSet

```python
class BrowserToolSet(SandboxToolSet)
```

LangChain 浏览器工具适配器。

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, template_name: str, config: Optional[Config], sandbox_idle_timeout_seconds: int) -> None
```


---


#### 🔹 `goto`

```python
def goto(self, url: str)
```

导航到 URL

---


#### 🔹 `html_content`

```python
def html_content(self)
```

获取页面 html 内容

---


#### 🔹 `fill`

```python
def fill(self, selector: str, value: str)
```

在页面中填充输入框

---


#### 🔹 `click`

```python
def click(self, selector: str)
```

在网页上执行点击操作

**Args:**

- `selector`: 要点击的元素选择器

---


#### 🔹 `evaluate`

```python
def evaluate(self, expression: str)
```

在网页上执行 js 脚本

**Args:**

- `expression`: 要执行的脚本

---




## 函数

## sandbox_toolset

```python
def sandbox_toolset(template_name: str) -> CommonToolSet
```

将沙箱模板封装为 LangChain ``StructuredTool`` 列表。



