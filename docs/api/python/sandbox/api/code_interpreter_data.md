---
sidebar_position: 2
title: CodeInterpreterData
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# CodeInterpreterData

代码解释器沙箱数据API模板 / Code Interpreter Sandbox Data API Template

此模板用于生成代码解释器沙箱数据API代码。
This template is used to generate code interpreter sandbox data API code.

## 类

## CodeInterpreterDataAPI

```python
class CodeInterpreterDataAPI(SandboxDataAPI)
```


### 方法

#### 🔹 `构造函数`

```python
def __init__(self, sandbox_id: str, config: Optional[Config] = None)
```


---


#### 🔹 `list_directory_async`

```python
async def list_directory_async(self, path: Optional[str] = None, depth: Optional[int] = None)
```


---


#### 🔹 `list_directory`

```python
def list_directory(self, path: Optional[str] = None, depth: Optional[int] = None)
```


---


#### 🔹 `stat_async`

```python
async def stat_async(self, path: str)
```


---


#### 🔹 `stat`

```python
def stat(self, path: str)
```


---


#### 🔹 `mkdir_async`

```python
async def mkdir_async(self, path: str, parents: Optional[bool] = True, mode: Optional[str] = '0755')
```


---


#### 🔹 `mkdir`

```python
def mkdir(self, path: str, parents: Optional[bool] = True, mode: Optional[str] = '0755')
```


---


#### 🔹 `move_file_async`

```python
async def move_file_async(self, source: str, destination: str)
```


---


#### 🔹 `move_file`

```python
def move_file(self, source: str, destination: str)
```


---


#### 🔹 `remove_file_async`

```python
async def remove_file_async(self, path: str)
```


---


#### 🔹 `remove_file`

```python
def remove_file(self, path: str)
```


---


#### 🔹 `list_contexts_async`

```python
async def list_contexts_async(self)
```


---


#### 🔹 `list_contexts`

```python
def list_contexts(self)
```


---


#### 🔹 `create_context_async`

```python
async def create_context_async(self, language: Optional[CodeLanguage] = CodeLanguage.PYTHON, cwd: str = '/home/user')
```


---


#### 🔹 `create_context`

```python
def create_context(self, language: Optional[CodeLanguage] = CodeLanguage.PYTHON, cwd: str = '/home/user')
```


---


#### 🔹 `get_context_async`

```python
async def get_context_async(self, context_id: str)
```


---


#### 🔹 `get_context`

```python
def get_context(self, context_id: str)
```


---


#### 🔹 `execute_code_async`

```python
async def execute_code_async(self, code: str, context_id: Optional[str], language: Optional[CodeLanguage] = None, timeout: Optional[int] = 30)
```


---


#### 🔹 `execute_code`

```python
def execute_code(self, code: str, context_id: Optional[str], language: Optional[CodeLanguage] = None, timeout: Optional[int] = 30)
```


---


#### 🔹 `delete_context_async`

```python
async def delete_context_async(self, context_id: str)
```


---


#### 🔹 `delete_context`

```python
def delete_context(self, context_id: str)
```


---


#### 🔹 `read_file_async`

```python
async def read_file_async(self, path: str)
```


---


#### 🔹 `read_file`

```python
def read_file(self, path: str)
```


---


#### 🔹 `write_file_async`

```python
async def write_file_async(self, path: str, content: str, mode: Optional[str] = '644', encoding: Optional[str] = 'utf-8', create_dir: Optional[bool] = True)
```


---


#### 🔹 `write_file`

```python
def write_file(self, path: str, content: str, mode: Optional[str] = '644', encoding: Optional[str] = 'utf-8', create_dir: Optional[bool] = True)
```


---


#### 🔹 `upload_file_async`

```python
async def upload_file_async(self, local_file_path: str, target_file_path: str)
```


---


#### 🔹 `upload_file`

```python
def upload_file(self, local_file_path: str, target_file_path: str)
```


---


#### 🔹 `download_file_async`

```python
async def download_file_async(self, path: str, save_path: str)
```


---


#### 🔹 `download_file`

```python
def download_file(self, path: str, save_path: str)
```


---


#### 🔹 `cmd_async`

```python
async def cmd_async(self, command: str, cwd: str, timeout: Optional[int] = 30)
```


---


#### 🔹 `cmd`

```python
def cmd(self, command: str, cwd: str, timeout: Optional[int] = 30)
```


---


#### 🔹 `list_processes_async`

```python
async def list_processes_async(self)
```


---


#### 🔹 `list_processes`

```python
def list_processes(self)
```


---


#### 🔹 `get_process_async`

```python
async def get_process_async(self, pid: str)
```


---


#### 🔹 `get_process`

```python
def get_process(self, pid: str)
```


---


#### 🔹 `kill_process_async`

```python
async def kill_process_async(self, pid: str)
```


---


#### 🔹 `kill_process`

```python
def kill_process(self, pid: str)
```


---




