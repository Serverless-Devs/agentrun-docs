---
sidebar_position: 3
title: CodeInterpreterSandbox
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# CodeInterpreterSandbox

代码解释器沙箱高层API模板 / Code Interpreter Sandbox High-Level API Template

此模板用于生成代码解释器沙箱资源的高级API代码。
This template is used to generate high-level API code for code interpreter sandbox resources.

## 类

## FileOperations

```python
class FileOperations
```

File upload/download operations.

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, sandbox: 'CodeInterpreterSandbox')
```


---


#### 🔹 `read_async`

```python
async def read_async(self, path: str)
```

Read a file from the code interpreter (async).

**Args:**

- `path`: Remote file path in the code interpreter

**Returns:**

File content

---


#### 🔹 `read`

```python
def read(self, path: str)
```

Read a file from the code interpreter (async).

**Args:**

- `path`: Remote file path in the code interpreter

**Returns:**

File content

---


#### 🔹 `write_async`

```python
async def write_async(self, path: str, content: str, mode: str = '644', encoding: str = 'utf-8', create_dir = True)
```

Write a file to the code interpreter (async).

**Args:**

- `path`: Remote file path in the code interpreter
- `content`: File content

---


#### 🔹 `write`

```python
def write(self, path: str, content: str, mode: str = '644', encoding: str = 'utf-8', create_dir = True)
```

Write a file to the code interpreter (async).

**Args:**

- `path`: Remote file path in the code interpreter
- `content`: File content

---




## FileSystemOperations

```python
class FileSystemOperations
```

File system operations (list, move, remove, stat, mkdir).

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, sandbox: 'CodeInterpreterSandbox')
```


---


#### 🔹 `list_async`

```python
async def list_async(self, path: Optional[str] = None, depth: Optional[int] = None)
```

List directory contents (async).

**Args:**

- `path`: Directory path (optional)
- `depth`: Traversal depth (optional)

**Returns:**

Directory contents

---


#### 🔹 `list`

```python
def list(self, path: Optional[str] = None, depth: Optional[int] = None)
```

List directory contents (async).

**Args:**

- `path`: Directory path (optional)
- `depth`: Traversal depth (optional)

**Returns:**

Directory contents

---


#### 🔹 `move_async`

```python
async def move_async(self, source: str, destination: str)
```

Move a file or directory (async).

**Args:**

- `source`: Source file or directory path
- `destination`: Target file or directory path

**Returns:**

Move operation result

---


#### 🔹 `move`

```python
def move(self, source: str, destination: str)
```

Move a file or directory (async).

**Args:**

- `source`: Source file or directory path
- `destination`: Target file or directory path

**Returns:**

Move operation result

---


#### 🔹 `remove_async`

```python
async def remove_async(self, path: str)
```

Remove a file or directory (async).

**Args:**

- `path`: File or directory path to remove

**Returns:**

Remove operation result

---


#### 🔹 `remove`

```python
def remove(self, path: str)
```

Remove a file or directory (async).

**Args:**

- `path`: File or directory path to remove

**Returns:**

Remove operation result

---


#### 🔹 `stat_async`

```python
async def stat_async(self, path: str)
```

Get file or directory statistics (async).

**Args:**

- `path`: File or directory path

**Returns:**

File/directory statistics

---


#### 🔹 `stat`

```python
def stat(self, path: str)
```

Get file or directory statistics (async).

**Args:**

- `path`: File or directory path

**Returns:**

File/directory statistics

---


#### 🔹 `mkdir_async`

```python
async def mkdir_async(self, path: str, parents: Optional[bool] = True, mode: Optional[str] = '0755')
```

Create a directory (async).

**Args:**

- `path`: Directory path to create
- `parents`: Whether to create parent directories (default: True)
- `mode`: Directory permissions mode (default: "0755")

**Returns:**

Mkdir operation result

---


#### 🔹 `mkdir`

```python
def mkdir(self, path: str, parents: Optional[bool] = True, mode: Optional[str] = '0755')
```

Create a directory (async).

**Args:**

- `path`: Directory path to create
- `parents`: Whether to create parent directories (default: True)
- `mode`: Directory permissions mode (default: "0755")

**Returns:**

Mkdir operation result

---


#### 🔹 `upload_async`

```python
async def upload_async(self, local_file_path: str, target_file_path: str)
```

Upload a file to the code interpreter (async).

**Args:**

- `local_file_path`: Local file path to upload
- `target_file_path`: Target file path in code interpreter

**Returns:**

Upload result

---


#### 🔹 `upload`

```python
def upload(self, local_file_path: str, target_file_path: str)
```

Upload a file to the code interpreter (async).

**Args:**

- `local_file_path`: Local file path to upload
- `target_file_path`: Target file path in code interpreter

**Returns:**

Upload result

---


#### 🔹 `download_async`

```python
async def download_async(self, path: str, save_path: str)
```

Download a file from the code interpreter (async).

**Args:**

- `path`: Remote file path in the code interpreter
- `save_path`: Local file path to save the downloaded file

**Returns:**

Download result with 'saved_path' and 'size'

---


#### 🔹 `download`

```python
def download(self, path: str, save_path: str)
```

Download a file from the code interpreter (async).

**Args:**

- `path`: Remote file path in the code interpreter
- `save_path`: Local file path to save the downloaded file

**Returns:**

Download result with 'saved_path' and 'size'

---




## ProcessOperations

```python
class ProcessOperations
```

Process management operations.

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, sandbox: 'CodeInterpreterSandbox')
```


---


#### 🔹 `cmd_async`

```python
async def cmd_async(self, command: str, cwd: str, timeout: Optional[int] = 30)
```

Execute a command in the code interpreter (async).

**Args:**

- `command`: Command to execute
- `cwd`: Working directory
- `timeout`: Execution timeout in seconds (default: 30)

**Returns:**

Command execution result

---


#### 🔹 `cmd`

```python
def cmd(self, command: str, cwd: str, timeout: Optional[int] = 30)
```

Execute a command in the code interpreter (async).

**Args:**

- `command`: Command to execute
- `cwd`: Working directory
- `timeout`: Execution timeout in seconds (default: 30)

**Returns:**

Command execution result

---


#### 🔹 `list_async`

```python
async def list_async(self)
```

List all processes (async).

**Returns:**

List of processes

---


#### 🔹 `list`

```python
def list(self)
```

List all processes (async).

**Returns:**

List of processes

---


#### 🔹 `get_async`

```python
async def get_async(self, pid: str)
```

Get a specific process by PID (async).

**Args:**

- `pid`: Process ID

**Returns:**

Process information

---


#### 🔹 `get`

```python
def get(self, pid: str)
```

Get a specific process by PID (async).

**Args:**

- `pid`: Process ID

**Returns:**

Process information

---


#### 🔹 `kill_async`

```python
async def kill_async(self, pid: str)
```

Kill a specific process by PID (async).

**Args:**

- `pid`: Process ID

**Returns:**

Kill operation result

---


#### 🔹 `kill`

```python
def kill(self, pid: str)
```

Kill a specific process by PID (async).

**Args:**

- `pid`: Process ID

**Returns:**

Kill operation result

---




## ContextOperations

```python
class ContextOperations
```

Context management operations.

### 属性

#### 📌 `context_id`

Get the current context ID.

---


### 方法

#### 🔹 `构造函数`

```python
def __init__(self, sandbox: 'CodeInterpreterSandbox')
```


---


#### 🔹 `list_async`

```python
async def list_async(self)
```

List all contexts (async).

---


#### 🔹 `list`

```python
def list(self)
```

List all contexts (async).

---


#### 🔹 `create_async`

```python
async def create_async(self, language: Optional[CodeLanguage] = CodeLanguage.PYTHON, cwd: str = '/home/user') -> 'ContextOperations'
```

Create a new context and save its ID (async).

**Args:**

- `name`: Context name
- `language`: Programming language (default: "python")
- `config`: Context configuration (optional)

**Returns:**

ContextOperations: Returns self for chaining and context manager support

---


#### 🔹 `create`

```python
def create(self, language: Optional[CodeLanguage] = CodeLanguage.PYTHON, cwd: str = '/home/user') -> 'ContextOperations'
```

Create a new context and save its ID (async).

**Args:**

- `name`: Context name
- `language`: Programming language (default: "python")
- `config`: Context configuration (optional)

**Returns:**

ContextOperations: Returns self for chaining and context manager support

---


#### 🔹 `get_async`

```python
async def get_async(self, context_id: Optional[str] = None) -> 'ContextOperations'
```

Get a specific context by ID (async).

**Args:**

- `context_id`: Context ID

**Returns:**

ContextOperations: Returns self for chaining and context manager support

---


#### 🔹 `get`

```python
def get(self, context_id: Optional[str] = None) -> 'ContextOperations'
```

Get a specific context by ID (async).

**Args:**

- `context_id`: Context ID

**Returns:**

ContextOperations: Returns self for chaining and context manager support

---


#### 🔹 `execute_async`

```python
async def execute_async(self, code: str, language: Optional[CodeLanguage] = None, context_id: Optional[str] = None, timeout: Optional[int] = 30)
```

Execute code in a context (async).

**Args:**

- `code`: Code to execute
- `context_id`: Context ID (optional, uses saved context_id if not provided)
- `timeout`: Execution timeout in seconds (default: 30)

**Returns:**

Execution result

**Raises:**

- `ValueError`: If no context_id is provided and none is saved

---


#### 🔹 `execute`

```python
def execute(self, code: str, language: Optional[CodeLanguage] = None, context_id: Optional[str] = None, timeout: Optional[int] = 30)
```

Execute code in a context (async).

**Args:**

- `code`: Code to execute
- `context_id`: Context ID (optional, uses saved context_id if not provided)
- `timeout`: Execution timeout in seconds (default: 30)

**Returns:**

Execution result

**Raises:**

- `ValueError`: If no context_id is provided and none is saved

---


#### 🔹 `delete_async`

```python
async def delete_async(self, context_id: Optional[str] = None)
```

Delete a context (async).

**Args:**

- `context_id`: Context ID (optional, uses saved context_id if not provided)

**Returns:**

Delete result

**Raises:**

- `ValueError`: If no context_id is provided and none is saved

---


#### 🔹 `delete`

```python
def delete(self, context_id: Optional[str] = None)
```

Delete a context (async).

**Args:**

- `context_id`: Context ID (optional, uses saved context_id if not provided)

**Returns:**

Delete result

**Raises:**

- `ValueError`: If no context_id is provided and none is saved

---




## CodeInterpreterSandbox

```python
class CodeInterpreterSandbox(Sandbox)
```


### 属性

#### 📌 `data_api`

Get data client.

---


#### 📌 `file`

Access file upload/download operations.

---


#### 📌 `file_system`

Access file system operations.

---


#### 📌 `context`

Access context management operations.

---


#### 📌 `process`

Access process management operations.

---


### 方法

#### 🔹 `check_health_async`

```python
async def check_health_async(self)
```


---


#### 🔹 `check_health`

```python
def check_health(self)
```


---




