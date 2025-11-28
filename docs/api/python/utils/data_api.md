---
sidebar_position: 3
title: DataApi
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# DataApi

AgentRun Data Client SDK / AgentRun 数据客户端 SDK

This module provides an async HTTP client for interacting with the AgentRun Data API.
此模块提供用于与 AgentRun Data API 交互的异步 HTTP 客户端。

It supports standard HTTP methods (GET, POST, PUT, PATCH, DELETE) with proper
error handling, type hints, and JSON serialization.

## 类

## ResourceType

```python
class ResourceType(Enum)
```




## DataAPI

```python
class DataAPI
```

Async HTTP client for AgentRun Data API.

This client provides async methods for making HTTP requests to the AgentRun Data API
with automatic URL construction, JSON handling, and error management.

The client automatically manages HTTP sessions - no need for manual session management
or context managers in simple use cases.

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, resource_name: str, resource_type: ResourceType, config: Optional[Config] = None, namespace: str = 'agents')
```

Initialize the AgentRun Data Client.

**Args:**

- `region`: Aliyun region (default: "cn-hangzhou")
- `protocol`: Protocol to use (default: "https")
- `account_id`: Aliyun account ID
- `version`: API version (default: "2025-09-10")
- `namespace`: API namespace (default: "agents")
- `timeout`: Request timeout in seconds (default: 600)
- `headers`: Default headers to include in all requests
- `auto_manage_session`: Whether to automatically manage sessions (default: True)

**Raises:**

- `ValueError`: If account_id is not provided or protocol is invalid

---


#### 🔹 `get_base_url`

```python
def get_base_url(self) -> str
```

Get the base URL for API requests.

**Returns:**

The base URL string

---


#### 🔹 `with_path`

```python
def with_path(self, path: str, query: Optional[Dict[str, Any]] = None) -> str
```

Construct full URL with the given path and query parameters.

**Args:**

- `path`: API path (may include query string)
- `query`: Query parameters to add/merge

**Returns:**

Complete URL string with query parameters

**Examples:**

```python
>>> client.with_path("resources")
    "http://account.agentrun-data.cn-hangzhou.aliyuncs.com/2025-09-10/agents/resources"

    >>> client.with_path("resources", {"limit": 10})
    "http://account.agentrun-data.cn-hangzhou.aliyuncs.com/2025-09-10/agents/resources?limit=10"

    >>> client.with_path("resources?page=1", {"limit": 10})
    "http://account.agentrun-data.cn-hangzhou.aliyuncs.com/2025-09-10/agents/resources?page=1&limit=10"
```

---


#### 🔹 `auth`

```python
def auth(self, url: str = '', headers: Optional[Dict[str, str]] = None, query: Optional[Dict[str, Any]] = None, config: Optional[Config] = None) -> tuple[str, Dict[str, str], Optional[Dict[str, Any]]]
```

Authentication hook for modifying requests before sending.

This method can be overridden in subclasses to implement custom
authentication logic (e.g., signing requests, adding auth tokens).

**Args:**

- `url`: The request URL
- `headers`: The request headers
- `query`: The query parameters

**Returns:**

Tuple of (modified_url, modified_headers, modified_query)

**Examples:**

```python
Override this method to add custom authentication:

    >>> class AuthedClient(AgentRunDataClient):
    ...     def auth(self, url, headers, query):
    ...         # Add auth token to headers
    ...         headers["Authorization"] = "Bearer token123"
    ...         # Or add signature to query
    ...         query = query or {}
    ...         query["signature"] = self._sign_request(url)
    ...         return url, headers, query
```

---


#### 🔹 `get_async`

```python
async def get_async(self, path: str, query: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```

Make an async GET request.

**Args:**

- `path`: API path (may include query string)
- `query`: Query parameters to add/merge
- `headers`: Additional headers

**Returns:**

Response body as dictionary

**Raises:**

- `AgentRunClientError`: If the request fails

**Examples:**

```python
>>> await client.get("resources")
    >>> await client.get("resources", query={"limit": 10, "page": 1})
    >>> await client.get("resources?status=active", query={"limit": 10})
```

---


#### 🔹 `get`

```python
def get(self, path: str, query: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```

Make an async GET request.

**Args:**

- `path`: API path (may include query string)
- `query`: Query parameters to add/merge
- `headers`: Additional headers

**Returns:**

Response body as dictionary

**Raises:**

- `AgentRunClientError`: If the request fails

**Examples:**

```python
>>> client.get("resources")
    >>> client.get("resources", query={"limit": 10, "page": 1})
    >>> client.get("resources?status=active", query={"limit": 10})
```

---


#### 🔹 `post_async`

```python
async def post_async(self, path: str, data: Optional[Union[Dict[str, Any], str]] = None, query: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```

Make an async POST request.

**Args:**

- `path`: API path (may include query string)
- `data`: Request body
- `query`: Query parameters to add/merge
- `headers`: Additional headers

**Returns:**

Response body as dictionary

**Raises:**

- `AgentRunClientError`: If the request fails

**Examples:**

```python
>>> await client.post("resources", data={"name": "test"})
    >>> await client.post("resources", data={"name": "test"}, query={"async": "true"})
```

---


#### 🔹 `post`

```python
def post(self, path: str, data: Optional[Union[Dict[str, Any], str]] = None, query: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```

Make an async POST request.

**Args:**

- `path`: API path (may include query string)
- `data`: Request body
- `query`: Query parameters to add/merge
- `headers`: Additional headers

**Returns:**

Response body as dictionary

**Raises:**

- `AgentRunClientError`: If the request fails

**Examples:**

```python
>>> client.post("resources", data={"name": "test"})
    >>> client.post("resources", data={"name": "test"}, query={"async": "true"})
```

---


#### 🔹 `put_async`

```python
async def put_async(self, path: str, data: Optional[Union[Dict[str, Any], str]] = None, query: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```

Make an async PUT request.

**Args:**

- `path`: API path (may include query string)
- `data`: Request body
- `query`: Query parameters to add/merge
- `headers`: Additional headers

**Returns:**

Response body as dictionary

**Raises:**

- `AgentRunClientError`: If the request fails

---


#### 🔹 `put`

```python
def put(self, path: str, data: Optional[Union[Dict[str, Any], str]] = None, query: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```

Make an async PUT request.

**Args:**

- `path`: API path (may include query string)
- `data`: Request body
- `query`: Query parameters to add/merge
- `headers`: Additional headers

**Returns:**

Response body as dictionary

**Raises:**

- `AgentRunClientError`: If the request fails

---


#### 🔹 `patch_async`

```python
async def patch_async(self, path: str, data: Optional[Union[Dict[str, Any], str]] = None, query: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```

Make an async PATCH request.

**Args:**

- `path`: API path (may include query string)
- `data`: Request body
- `query`: Query parameters to add/merge
- `headers`: Additional headers

**Returns:**

Response body as dictionary

**Raises:**

- `AgentRunClientError`: If the request fails

---


#### 🔹 `patch`

```python
def patch(self, path: str, data: Optional[Union[Dict[str, Any], str]] = None, query: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```

Make an async PATCH request.

**Args:**

- `path`: API path (may include query string)
- `data`: Request body
- `query`: Query parameters to add/merge
- `headers`: Additional headers

**Returns:**

Response body as dictionary

**Raises:**

- `AgentRunClientError`: If the request fails

---


#### 🔹 `delete_async`

```python
async def delete_async(self, path: str, query: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```

Make an async DELETE request.

**Args:**

- `path`: API path (may include query string)
- `query`: Query parameters to add/merge
- `headers`: Additional headers

**Returns:**

Response body as dictionary

**Raises:**

- `AgentRunClientError`: If the request fails

---


#### 🔹 `delete`

```python
def delete(self, path: str, query: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```

Make an async DELETE request.

**Args:**

- `path`: API path (may include query string)
- `query`: Query parameters to add/merge
- `headers`: Additional headers

**Returns:**

Response body as dictionary

**Raises:**

- `AgentRunClientError`: If the request fails

---


#### 🔹 `post_file_async`

```python
async def post_file_async(self, path: str, local_file_path: str, target_file_path: str, form_data: Optional[Dict[str, Any]] = None, query: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```

Asynchronously upload a file using multipart/form-data (POST request).

**Args:**

- `path`: API path (may include query string)
- `local_file_path`: Local file path to upload
- `target_file_path`: Target file path on the server
- `form_data`: Additional form data fields
- `query`: Query parameters to add/merge
- `headers`: Additional headers

**Returns:**

Response body as dictionary

**Raises:**

- `AgentRunClientError`: If the request fails

**Examples:**

```python
>>> await client.post_file_async("/files", local_file_path="/local/data.csv", target_file_path="/remote/data.csv")
    >>> await client.post_file_async("/files", local_file_path="/local/data.csv", target_file_path="/remote/input.csv")
```

---


#### 🔹 `post_file`

```python
def post_file(self, path: str, local_file_path: str, target_file_path: str, form_data: Optional[Dict[str, Any]] = None, query: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```

Synchronously upload a file using multipart/form-data (POST request).

**Args:**

- `path`: API path (may include query string)
- `local_file_path`: Local file path to upload
- `target_file_path`: Target file path on the server
- `form_data`: Additional form data fields
- `query`: Query parameters to add/merge
- `headers`: Additional headers

**Returns:**

Response body as dictionary

**Raises:**

- `AgentRunClientError`: If the request fails

**Examples:**

```python
>>> client.post_file("/files", local_file_path="/local/data.csv", target_file_path="/remote/data.csv")
    >>> client.post_file("/files", local_file_path="/local/data.csv", target_file_path="/remote/input.csv")
```

---


#### 🔹 `get_file_async`

```python
async def get_file_async(self, path: str, save_path: str, query: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```

Asynchronously download a file and save it to local path (GET request).

**Args:**

- `path`: API path (may include query string)
- `save_path`: Local file path to save the downloaded file
- `query`: Query parameters to add/merge
- `headers`: Additional headers

**Returns:**

Dictionary with 'saved_path' and 'size' keys

**Raises:**

- `AgentRunClientError`: If the request fails

**Examples:**

```python
>>> await client.get_file_async("/files", save_path="/local/data.csv", query={"path": "/remote/file.csv"})
```

---


#### 🔹 `get_file`

```python
def get_file(self, path: str, save_path: str, query: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```

Synchronously download a file and save it to local path (GET request).

**Args:**

- `path`: API path (may include query string)
- `save_path`: Local file path to save the downloaded file
- `query`: Query parameters to add/merge
- `headers`: Additional headers

**Returns:**

Dictionary with 'saved_path' and 'size' keys

**Raises:**

- `AgentRunClientError`: If the request fails

**Examples:**

```python
>>> client.get_file("/files", save_path="/local/data.csv", query={"path": "/remote/file.csv"})
```

---


#### 🔹 `get_video_async`

```python
async def get_video_async(self, path: str, save_path: str, query: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```

Asynchronously download a video file and save it to local path (GET request).

**Args:**

- `path`: API path (may include query string)
- `save_path`: Local file path to save the downloaded video file (.mkv)
- `query`: Query parameters to add/merge
- `headers`: Additional headers

**Returns:**

Dictionary with 'saved_path' and 'size' keys

**Raises:**

- `AgentRunClientError`: If the request fails

**Examples:**

```python
>>> await client.get_video_async("/videos", save_path="/local/video.mkv", query={"path": "/remote/video.mp4"})
```

---


#### 🔹 `get_video`

```python
def get_video(self, path: str, save_path: str, query: Optional[Dict[str, Any]] = None, headers: Optional[Dict[str, str]] = None, config: Optional[Config] = None) -> Dict[str, Any]
```

Synchronously download a video file and save it to local path (GET request).

**Args:**

- `path`: API path (may include query string)
- `save_path`: Local file path to save the downloaded video file (.mkv)
- `query`: Query parameters to add/merge
- `headers`: Additional headers

**Returns:**

Dictionary with 'saved_path' and 'size' keys

**Raises:**

- `AgentRunClientError`: If the request fails

**Examples:**

```python
>>> client.get_video("/videos", save_path="/local/video.mkv", query={"path": "/remote/video.mp4"})
```

---




