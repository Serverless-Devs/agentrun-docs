---
sidebar_position: 5
title: Tool
---

:::info 自动生成
此文档由 `make doc-gen` 命令从 Python 源码注释自动生成。
:::

# Tool

通用工具定义和转换模块

提供跨框架的通用工具定义和转换功能。

支持多种定义方式：
1. 使用 @tool 装饰器 - 最简单，推荐
2. 使用 Pydantic BaseModel - 类型安全
3. 使用 ToolParameter 列表 - 灵活但繁琐

支持转换为以下框架格式：
- OpenAI Function Calling
- Anthropic Claude Tools
- LangChain Tools
- Google ADK Tools
- AgentScope Tools

## 类

## ToolParameter

```python
class ToolParameter
```

工具参数定义

**Attributes:**

- `name`: 参数名称
- `param_type`: 参数类型（string, integer, number, boolean, array, object）
- `description`: 参数描述
- `required`: 是否必填
- `default`: 默认值
- `enum`: 枚举值列表
- `items`: 数组元素类型（当 param_type 为 array 时使用）
- `properties`: 对象属性（当 param_type 为 object 时使用）
- `format`: 额外的格式限定（如 int32、int64 等）
- `nullable`: 是否允许为空

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, name: str, param_type: str, description: str = '', required: bool = False, default: Any = None, enum: Optional[List[Any]] = None, items: Optional[Dict[str, Any]] = None, properties: Optional[Dict[str, Any]] = None, format: Optional[str] = None, nullable: bool = False)
```


---


#### 🔹 `to_json_schema`

```python
def to_json_schema(self) -> Dict[str, Any]
```

转换为 JSON Schema 格式

---




## Tool

```python
class Tool
```

通用工具定义

支持多种参数定义方式：
1. 使用 parameters 列表（ToolParameter）
2. 使用 args_schema（Pydantic BaseModel）

**Attributes:**

- `name`: 工具名称
- `description`: 工具描述
- `parameters`: 参数列表（使用 ToolParameter 定义）
- `args_schema`: 参数模型（使用 Pydantic BaseModel 定义）
- `func`: 工具执行函数

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, name: str, description: str = '', parameters: Optional[List[ToolParameter]] = None, args_schema: Optional[Type[BaseModel]] = None, func: Optional[Callable] = None)
```


---


#### 🔹 `get_parameters_schema`

```python
def get_parameters_schema(self) -> Dict[str, Any]
```

获取参数的 JSON Schema

---


#### 🔹 `to_openai_function`

```python
def to_openai_function(self) -> Dict[str, Any]
```

转换为 OpenAI Function Calling 格式

---


#### 🔹 `to_anthropic_tool`

```python
def to_anthropic_tool(self) -> Dict[str, Any]
```

转换为 Anthropic Claude Tools 格式

---


#### 🔹 `to_langchain`

```python
def to_langchain(self) -> Any
```

转换为 LangChain Tool 格式

优先使用适配器模式，如果适配器未注册则回退到旧实现。

---


#### 🔹 `to_google_adk`

```python
def to_google_adk(self) -> Callable
```

转换为 Google ADK Tool 格式

优先使用适配器模式，如果适配器未注册则回退到旧实现。
Google ADK 直接使用 Python 函数作为工具。

---


#### 🔹 `to_agentscope`

```python
def to_agentscope(self) -> Dict[str, Any]
```

转换为 AgentScope Tool 格式

---


#### 🔹 `to_langgraph`

```python
def to_langgraph(self) -> Any
```

转换为 LangGraph Tool 格式

LangGraph 与 LangChain 完全兼容，因此使用相同的接口。

---


#### 🔹 `to_crewai`

```python
def to_crewai(self) -> Any
```

转换为 CrewAI Tool 格式

CrewAI 内部使用 LangChain，因此使用相同的接口。

---


#### 🔹 `to_pydanticai`

```python
def to_pydanticai(self) -> Any
```

转换为 PydanticAI Tool 格式

---


#### 🔹 `bind`

```python
def bind(self, instance: Any) -> 'Tool'
```

绑定工具到实例，便于在类中定义工具方法

---


#### 🔹 `openai`

```python
def openai(self) -> Dict[str, Any]
```

to_openai_function 的别名

---


#### 🔹 `langchain`

```python
def langchain(self) -> Any
```

to_langchain 的别名

---


#### 🔹 `google_adk`

```python
def google_adk(self) -> Callable
```

to_google_adk 的别名

---


#### 🔹 `pydanticai`

```python
def pydanticai(self) -> Any
```

to_pydanticai 的别名（暂未实现）

---




## CommonToolSet

```python
class CommonToolSet
```

工具集

管理多个工具，提供批量转换和过滤功能。

默认会收集子类中定义的 `Tool` 属性，因此简单的继承即可完成
工具集的声明。也可以通过传入 ``tools_list`` 或调用 ``register``
方法来自定义工具集合。

**Attributes:**

- `tools_list`: 工具列表

### 方法

#### 🔹 `构造函数`

```python
def __init__(self, tools_list: Optional[List[Tool]] = None)
```


---


#### 🔹 `tools`

```python
def tools(self, prefix: Optional[str] = None, modify_tool_name: Optional[Callable[[Tool], Tool]] = None, filter_tools_by_name: Optional[Callable[[str], bool]] = None)
```

获取工具列表

**Args:**

- `prefix`: 为所有工具名称添加前缀
- `modify_tool_name`: 自定义工具修改函数
- `filter_tools_by_name`: 工具名称过滤函数

**Returns:**

处理后的工具列表

---


#### 🔹 `from_agentrun_toolset`

```python
def from_agentrun_toolset(cls, toolset: ToolSet, config: Optional[Any] = None, refresh: bool = False) -> 'CommonToolSet'
```

从 AgentRun ToolSet 创建通用工具集

**Args:**

- `toolset`: agentrun.toolset.toolset.ToolSet 实例
- `config`: 额外的请求配置,调用工具时会自动合并
- `refresh`: 是否先刷新最新信息

**Returns:**

通用 ToolSet 实例,可直接调用 .to_openai_function()、.to_langchain() 等

**Example:**

```python
>>> from agentrun.toolset.client import ToolSetClient
    >>> from agentrun.integration.common import from_agentrun_toolset
    >>>
    >>> client = ToolSetClient()
    >>> remote_toolset = client.get(name="my-toolset")
    >>> common_toolset = from_agentrun_toolset(remote_toolset)
    >>>
    >>> # 使用已有的转换方法
    >>> openai_tools = common_toolset.to_openai_function()
    >>> google_adk_tools = common_toolset.to_google_adk()
```

---


#### 🔹 `to_openai_function`

```python
def to_openai_function(self, prefix: Optional[str] = None, modify_tool_name: Optional[Callable[[Tool], Tool]] = None, filter_tools_by_name: Optional[Callable[[str], bool]] = None) -> List[Dict[str, Any]]
```

批量转换为 OpenAI Function Calling 格式

---


#### 🔹 `to_anthropic_tool`

```python
def to_anthropic_tool(self, prefix: Optional[str] = None, modify_tool_name: Optional[Callable[[Tool], Tool]] = None, filter_tools_by_name: Optional[Callable[[str], bool]] = None) -> List[Dict[str, Any]]
```

批量转换为 Anthropic Claude Tools 格式

---


#### 🔹 `to_langchain`

```python
def to_langchain(self, prefix: Optional[str] = None, modify_tool_name: Optional[Callable[[Tool], Tool]] = None, filter_tools_by_name: Optional[Callable[[str], bool]] = None) -> List[Any]
```

批量转换为 LangChain Tool 格式

优先使用适配器模式进行批量转换，提高效率。

---


#### 🔹 `to_google_adk`

```python
def to_google_adk(self, prefix: Optional[str] = None, modify_tool_name: Optional[Callable[[Tool], Tool]] = None, filter_tools_by_name: Optional[Callable[[str], bool]] = None)
```

批量转换为 Google ADK Tool 格式

优先使用适配器模式进行批量转换，提高效率。

---


#### 🔹 `to_agentscope`

```python
def to_agentscope(self, prefix: Optional[str] = None, modify_tool_name: Optional[Callable[[Tool], Tool]] = None, filter_tools_by_name: Optional[Callable[[str], bool]] = None)
```

批量转换为 AgentScope Tool 格式

---


#### 🔹 `to_langgraph`

```python
def to_langgraph(self, prefix: Optional[str] = None, modify_tool_name: Optional[Callable[[Tool], Tool]] = None, filter_tools_by_name: Optional[Callable[[str], bool]] = None) -> List[Any]
```

批量转换为 LangGraph Tool 格式

LangGraph 与 LangChain 完全兼容，因此使用相同的接口。

---


#### 🔹 `to_crewai`

```python
def to_crewai(self, prefix: Optional[str] = None, modify_tool_name: Optional[Callable[[Tool], Tool]] = None, filter_tools_by_name: Optional[Callable[[str], bool]] = None) -> List[Any]
```

批量转换为 CrewAI Tool 格式

CrewAI 内部使用 LangChain，因此使用相同的接口。

---


#### 🔹 `to_pydantic_ai`

```python
def to_pydantic_ai(self, prefix: Optional[str] = None, modify_tool_name: Optional[Callable[[Tool], Tool]] = None, filter_tools_by_name: Optional[Callable[[str], bool]] = None) -> List[Any]
```

批量转换为 PydanticAI Tool 格式

---




## 函数

## tool

```python
def tool(name: Optional[str] = None, description: Optional[str] = None) -> Callable[[Callable], Tool]
```

工具装饰器

从函数自动创建 Tool 实例。

**Args:**

- `name`: 工具名称，默认使用函数名
- `description`: 工具描述，默认使用函数文档字符串

**Returns:**

装饰后的 Tool 实例

**Example:**

```python
>>> @tool()
    ... def calculator(operation: Literal["add", "subtract"], a: float, b: float) -> float:
    ...     '''执行数学运算'''
    ...     if operation == "add":
    ...         return a + b
    ...     return a - b
```



## from_pydantic

```python
def from_pydantic(name: str, description: str, args_schema: Type[BaseModel], func: Callable) -> Tool
```

从 Pydantic BaseModel 创建 Tool

**Args:**

- `name`: 工具名称
- `description`: 工具描述
- `args_schema`: Pydantic BaseModel 类
- `func`: 工具执行函数

**Returns:**

Tool 实例

**Example:**

```python
>>> class SearchArgs(BaseModel):
    ...     query: str = Field(description="搜索关键词")
    ...     limit: int = Field(description="结果数量", default=10)
    >>>
    >>> search_tool = from_pydantic(
    ...     name="search",
    ...     description="搜索网络信息",
    ...     args_schema=SearchArgs,
    ...     func=lambda query, limit: f"搜索: {query}"
    ... )
```



