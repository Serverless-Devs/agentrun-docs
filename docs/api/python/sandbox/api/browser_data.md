---
sidebar_position: 1
title: BrowserData
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# BrowserData

浏览器沙箱数据API模板 / Browser Sandbox Data API Template

此模板用于生成浏览器沙箱数据API代码。
This template is used to generate browser sandbox data API code.

## 类

## BrowserDataAPI

```python
class BrowserDataAPI(SandboxDataAPI)
```


### 方法

#### 🔹 `构造函数`

```python
def __init__(self, sandbox_id: str, config: Optional[Config] = None)
```


---


#### 🔹 `get_cdp_url`

```python
def get_cdp_url(self, record: Optional[bool] = False)
```

Generate the WebSocket URL for Chrome DevTools Protocol (CDP) connection.

This method constructs a WebSocket URL by:
1. Converting the HTTP endpoint to WebSocket protocol (ws://)
2. Parsing the existing URL and query parameters
3. Adding the session ID to the query parameters
4. Reconstructing the complete WebSocket URL

**Returns:**

str: The complete WebSocket URL for CDP automation connection,
         including the session ID in the query parameters.

**Example:**

```python
>>> api = BrowserDataAPI("browser123", "session456")
    >>> api.get_cdp_url()
    'ws://example.com/ws/automation?sessionId=session456'
```

---


#### 🔹 `get_vnc_url`

```python
def get_vnc_url(self, record: Optional[bool] = False)
```

Generate the WebSocket URL for VNC (Virtual Network Computing) live view connection.

This method constructs a WebSocket URL for real-time browser viewing by:
1. Converting the HTTP endpoint to WebSocket protocol (ws://)
2. Parsing the existing URL and query parameters
3. Adding the session ID to the query parameters
4. Reconstructing the complete WebSocket URL

**Returns:**

str: The complete WebSocket URL for VNC live view connection,
         including the session ID in the query parameters.

**Example:**

```python
>>> api = BrowserDataAPI("browser123", "session456")
    >>> api.get_vnc_url()
    'ws://example.com/ws/liveview?sessionId=session456'
```

---


#### 🔹 `sync_playwright`

```python
def sync_playwright(self, browser_type: str = 'chrome', record: Optional[bool] = False, config: Optional[Config] = None)
```


---


#### 🔹 `async_playwright`

```python
def async_playwright(self, browser_type: str = 'chrome', record: Optional[bool] = False, config: Optional[Config] = None)
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

**Examples:**

```python
>>> await api.download_recording_async("recording.mp4", "/local/video.mkv")
```

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

**Examples:**

```python
>>> api.download_recording("recording.mp4", "/local/video.mkv")
```

---




