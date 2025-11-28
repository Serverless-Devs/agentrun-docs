---
sidebar_position: 1
title: BrowserSandbox
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# BrowserSandbox

浏览器沙箱高层API模板 / Browser Sandbox High-Level API Template

此模板用于生成浏览器沙箱资源的高级API代码。
This template is used to generate high-level API code for browser sandbox resources.

## 类

## BrowserSandbox

```python
class BrowserSandbox(Sandbox)
```


### 属性

#### 📌 `data_api`


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


#### 🔹 `get_cdp_url`

```python
def get_cdp_url(self, record: Optional[bool] = False)
```


---


#### 🔹 `get_vnc_url`

```python
def get_vnc_url(self, record: Optional[bool] = False)
```


---


#### 🔹 `sync_playwright`

```python
def sync_playwright(self, record: Optional[bool] = False)
```


---


#### 🔹 `async_playwright`

```python
def async_playwright(self, record: Optional[bool] = False)
```


---


#### 🔹 `list_recordings_async`

```python
async def list_recordings_async(self)
```


---


#### 🔹 `list_recordings`

```python
def list_recordings(self)
```


---


#### 🔹 `download_recording_async`

```python
async def download_recording_async(self, filename: str, save_path: str)
```

Asynchronously download a recording video file and save it to local path.

**Args:**

- `filename`: The name of the recording file to download
- `save_path`: Local file path to save the downloaded video file (.mkv)

**Returns:**

Dictionary with 'saved_path' and 'size' keys

---


#### 🔹 `download_recording`

```python
def download_recording(self, filename: str, save_path: str)
```

Synchronously download a recording video file and save it to local path.

**Args:**

- `filename`: The name of the recording file to download
- `save_path`: Local file path to save the downloaded video file (.mkv)

**Returns:**

Dictionary with 'saved_path' and 'size' keys

---


#### 🔹 `delete_recording_async`

```python
async def delete_recording_async(self, filename: str)
```


---


#### 🔹 `delete_recording`

```python
def delete_recording(self, filename: str)
```


---




