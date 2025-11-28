---
sidebar_position: 5
title: PlaywrightSync
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# PlaywrightSync

Playwright同步API封装 / Playwright Sync API Wrapper

提供Playwright的同步API封装,用于浏览器沙箱操作。
Provides sync API wrapper for Playwright, used for browser sandbox operations.

## 类

## BrowserPlaywrightSync

```python
class BrowserPlaywrightSync
```

A small helper wrapper around Playwright's Sync API.

This class connects to an existing Chromium instance over CDP and exposes a set
of common page operations. Internally it lazily ensures a `Browser`,
`BrowserContext`, and `Page` and keeps references to reuse them across calls.

Notes
-----
- Connection is established via CDP using the given `url`.
- If `auto_close_browser`/`auto_close_page` are enabled, `close()` will attempt
  to close the browser/page respectively.
- Methods that act on the page automatically bring the page to the front.

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, url: str, browser_type: str = 'chrome', auto_close_browser: bool = False, auto_close_page: bool = False, headers: Optional[Dict[str, str]] = None)
```


---


#### 🔹 `open`

```python
def open(self) -> 'BrowserPlaywrightSync'
```

Establish a connection to the remote browser if not already connected.

Returns
-------
BrowserPlaywrightSync
    The current instance for fluent chaining.

---


#### 🔹 `close`

```python
def close(self) -> None
```

Close held resources according to the auto-close flags.

Closes page and/or browser if the corresponding auto-close flags are set
and stops the Playwright driver when present.

---


#### 🔹 `ensure_browser`

```python
def ensure_browser(self) -> Browser
```

Ensure a `Browser` instance is available.

Returns
-------
Browser
    A connected Playwright `Browser` instance.

---


#### 🔹 `ensure_context`

```python
def ensure_context(self) -> BrowserContext
```

Ensure a `BrowserContext` is available, creating one if necessary.

Returns
-------
BrowserContext
    The ensured `BrowserContext`.

---


#### 🔹 `ensure_page`

```python
def ensure_page(self) -> Page
```

Ensure a `Page` is available in the current context.

Returns
-------
Page
    The ensured `Page` which is brought to the front.

---


#### 🔹 `list_pages`

```python
def list_pages(self) -> List[Page]
```

List all pages across all contexts in the connected browser.

---


#### 🔹 `new_page`

```python
def new_page(self) -> Page
```

Create and switch to a new page in the ensured context.

---


#### 🔹 `select_tab`

```python
def select_tab(self, index: int) -> Page
```

Select a page by index across all open tabs.

Parameters
----------
index : int
    Zero-based page index.

Returns
-------
Page
    The selected page.

Raises
------
IndexError
    If the index is out of bounds.

---


#### 🔹 `goto`

```python
def goto(self, url: str, timeout: Optional[float] = None, wait_until: Optional[Literal['commit', 'domcontentloaded', 'load', 'networkidle']] = None, referer: Optional[str] = None) -> Optional[Response]
```

Navigate to a URL on the active page.

Returns
-------
Optional[Response]
    The main resource response if available; otherwise `None`.

---


#### 🔹 `click`

```python
def click(self, selector: str, modifiers: Optional[Sequence[Literal['Alt', 'Control', 'ControlOrMeta', 'Meta', 'Shift']]] = None, position: Optional[Position] = None, delay: Optional[float] = None, button: Optional[Literal['left', 'middle', 'right']] = None, click_count: Optional[int] = None, timeout: Optional[float] = None, force: Optional[bool] = None, no_wait_after: Optional[bool] = None, trial: Optional[bool] = None, strict: Optional[bool] = None) -> None
```

Click an element matching the selector on the active page.

---


#### 🔹 `drag_and_drop`

```python
def drag_and_drop(self, source: str, target: str, source_position: Optional[Position] = None, target_position: Optional[Position] = None, force: Optional[bool] = None, no_wait_after: Optional[bool] = None, timeout: Optional[float] = None, strict: Optional[bool] = None, trial: Optional[bool] = None) -> None
```

Alias for `drag` using Playwright's `drag_and_drop` under the hood.

---


#### 🔹 `dblclick`

```python
def dblclick(self, selector: str, modifiers: Optional[Sequence[Literal['Alt', 'Control', 'ControlOrMeta', 'Meta', 'Shift']]] = None, position: Optional[Position] = None, delay: Optional[float] = None, button: Optional[Literal['left', 'middle', 'right']] = None, timeout: Optional[float] = None, force: Optional[bool] = None, no_wait_after: Optional[bool] = None, strict: Optional[bool] = None, trial: Optional[bool] = None) -> None
```

Double-click an element matching the selector on the active page.

---


#### 🔹 `fill`

```python
def fill(self, selector: str, value: str, timeout: Optional[float] = None, no_wait_after: Optional[bool] = None, strict: Optional[bool] = None, force: Optional[bool] = None) -> None
```

Fill an input/textarea matched by selector with the provided value.

---


#### 🔹 `hover`

```python
def hover(self, selector: str, modifiers: Optional[Sequence[Literal['Alt', 'Control', 'ControlOrMeta', 'Meta', 'Shift']]] = None, position: Optional[Position] = None, timeout: Optional[float] = None, no_wait_after: Optional[bool] = None, force: Optional[bool] = None, strict: Optional[bool] = None, trial: Optional[bool] = None) -> None
```

Hover over the element matched by the selector.

---


#### 🔹 `type`

```python
def type(self, selector: str, text: str, delay: Optional[float] = None, timeout: Optional[float] = None, no_wait_after: Optional[bool] = None, strict: Optional[bool] = None) -> None
```

Type text into an element matched by the selector.

---


#### 🔹 `go_forward`

```python
def go_forward(self, timeout: Optional[float] = None, wait_until: Optional[Literal['commit', 'domcontentloaded', 'load', 'networkidle']] = None) -> Optional[Response]
```

Go forward in the page history if possible.

---


#### 🔹 `go_back`

```python
def go_back(self, timeout: Optional[float] = None, wait_until: Optional[Literal['commit', 'domcontentloaded', 'load', 'networkidle']] = None) -> Optional[Response]
```

Go back in the page history if possible.

---


#### 🔹 `evaluate`

```python
def evaluate(self, expression: str, arg: Optional[Any] = None) -> Any
```

Evaluate a JavaScript expression in the page context.

---


#### 🔹 `wait`

```python
def wait(self, timeout: float) -> None
```

Wait for the given timeout in milliseconds.

---


#### 🔹 `html_content`

```python
def html_content(self) -> str
```

Get the current page's HTML content as a string.

---


#### 🔹 `screenshot`

```python
def screenshot(self, timeout: Optional[float] = None, type: Optional[Literal['jpeg', 'png']] = None, path: Union[Path, str, None] = None, quality: Optional[int] = None, omit_background: Optional[bool] = None, full_page: Optional[bool] = None, clip: Optional[FloatRect] = None, animations: Optional[Literal['allow', 'disabled']] = None, caret: Optional[Literal['hide', 'initial']] = None, scale: Optional[Literal['css', 'device']] = None, mask: Optional[Sequence[Locator]] = None, mask_color: Optional[str] = None, style: Optional[str] = None) -> bytes
```

Capture a screenshot of the page.

Returns
-------
bytes
    The image bytes of the screenshot.

---


#### 🔹 `title`

```python
def title(self) -> str
```


---




