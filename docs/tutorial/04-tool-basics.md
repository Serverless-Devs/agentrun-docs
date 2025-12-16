---
sidebar_position: 14
---

# 工具使用基础

工具是扩展 Agent 能力的关键机制。通过工具，Agent 可以突破纯文本对话的限制，访问外部 API、查询数据库、操作文件系统等。AgentRun 提供了完整的工具管理系统，支持 OpenAPI 规范和 MCP 协议两种标准，让您能够快速集成各类工具服务。

## 什么是 ToolSet

ToolSet 是 AgentRun 中工具的组织单元。一个 ToolSet 包含一组相关的工具，这些工具通常来自同一个服务或针对同一个领域。例如，天气服务的 ToolSet 可能包含查询当前天气、预报未来天气、查询历史天气等多个工具。

AgentRun 支持两种类型的工具定义方式。基于 OpenAPI 规范的工具通过标准的 REST API 来提供服务，SDK 会自动解析 OpenAPI 文档，提取工具的描述、参数定义和调用方式。基于 MCP（Model Context Protocol）的工具则遵循统一的工具协议，提供了更标准化的工具发现和调用机制。

在 AgentRun 控制台创建 ToolSet 时，您需要提供工具服务的端点信息、认证配置和 OpenAPI 规范文档或 MCP 服务地址。创建完成后，ToolSet 会自动注册到平台，Agent 就可以通过 SDK 获取和使用这些工具。

## 获取内置工具集

使用 ToolSet 的第一步是从平台获取已创建的工具集。SDK 提供了 ToolSetClient 来管理工具集：

```python
from agentrun.toolset import ToolSetClient

# 创建客户端
client = ToolSetClient()

# 获取指定名称的工具集
toolset = client.get("weather-api")
print(f"工具集: {toolset.name}")
print(f"描述: {toolset.description}")
```

获取到的 ToolSet 对象包含了工具集的完整元数据，包括名称、描述、工具列表等信息。您可以查看工具集包含哪些工具：

```python
# 列出工具集中的所有工具
tools = toolset.list_tools()
for tool in tools:
    print(f"工具名称: {tool.name}")
    print(f"工具描述: {tool.description}")
    print(f"参数: {tool.parameters}")
    print("---")
```

这个方法返回的是标准化的 ToolInfo 对象列表，每个对象描述一个工具的完整信息。工具信息采用 JSON Schema 格式定义参数，与大多数 AI 框架兼容。

如果您需要浏览平台上所有可用的工具集，可以使用列表方法：

```python
# 列出所有工具集
all_toolsets = client.list()
for ts in all_toolsets:
    print(f"{ts.name}: {ts.description}")
```

## 工具调用示例

获取工具集后，就可以调用其中的工具了。工具调用需要提供工具名称和参数，SDK 会自动处理 HTTP 请求的构建和发送：

```python
# 获取工具集
toolset = ToolSetClient().get("weather-api")

# 调用工具查询天气
result = toolset.call_tool(
    name="get_current_weather",
    arguments={
        "location": "杭州",
        "unit": "celsius"
    }
)

print(f"查询结果: {result}")
```

工具调用是同步的，会等待远程服务返回结果。对于可能耗时较长的工具，建议使用异步版本：

```python
import asyncio

async def query_weather():
    toolset = ToolSetClient().get("weather-api")
    
    # 异步调用工具
    result = await toolset.call_tool_async(
        name="get_current_weather",
        arguments={"location": "杭州"}
    )
    
    return result

# 运行异步任务
result = asyncio.run(query_weather())
```

异步调用在处理多个工具请求时特别有用，可以并发执行多个查询来提升性能。

工具调用的结果是一个字典，包含工具返回的所有数据。结果的具体格式取决于工具的实现，但通常会包含状态码、数据内容和可能的错误信息。您需要根据工具的文档来解析结果：

```python
result = toolset.call_tool(
    name="get_current_weather",
    arguments={"location": "杭州"}
)

# 解析结果
if result.get("success"):
    weather_data = result.get("data", {})
    temperature = weather_data.get("temperature")
    description = weather_data.get("description")
    print(f"当前温度: {temperature}°C")
    print(f"天气状况: {description}")
else:
    error_msg = result.get("error", "未知错误")
    print(f"查询失败: {error_msg}")
```

## 工具与 Agent 集成

工具的真正价值在于与 Agent 的集成。Agent 可以根据用户的问题自主决策是否需要使用工具，选择合适的工具，构造参数并调用，然后将结果整合到回答中。

AgentRun SDK 的集成模块提供了便捷的工具转换功能。以 LangChain 为例，可以这样集成工具：

```python
from agentrun.integration.langchain import toolset
from langchain.agents import create_openai_functions_agent
from langchain.prompts import ChatPromptTemplate

# 获取 AgentRun 工具集并转换为 LangChain 格式
tools = toolset("weather-api")

# 创建 Agent
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个有帮助的助手，可以查询天气信息。"),
    ("user", "{input}"),
    ("assistant", "{agent_scratchpad}")
])

# 这里的 model 是之前章节创建的 LangChain 模型
agent = create_openai_functions_agent(model, tools, prompt)
```

转换后的工具对象可以直接传递给 LangChain 的 Agent 创建函数。LangChain 会自动处理工具调用的逻辑，包括决策何时使用工具、解析工具结果等。

对于其他框架，SDK 也提供了相应的转换方法。例如 AgentScope：

```python
from agentrun.integration.agentscope import toolset

# 转换为 AgentScope 工具格式
tools = toolset("weather-api")

# tools 现在可以用于 AgentScope Agent
```

这种设计使得您可以无缝地在不同框架之间切换，而不需要重写工具集成代码。

## 使用 ApiSet 进行高级操作

对于需要更精细控制的场景，可以使用 ApiSet 类。ApiSet 提供了更底层的工具操作接口，支持从 OpenAPI 规范动态创建工具集：

```python
from agentrun.toolset.api.openapi import ApiSet

# 从 OpenAPI 规范创建工具集
apiset = ApiSet.from_openapi_schema(
    schema="https://api.example.com/openapi.json",
    base_url="https://api.example.com",
    headers={"Authorization": "Bearer your-token"}
)

# 列出所有工具
tools = apiset.tools()
for tool in tools:
    print(f"{tool.name}: {tool.description}")

# 调用工具
result = apiset.invoke(
    name="get_weather",
    arguments={"location": "北京"}
)
```

ApiSet 还支持将工具转换为 Python 函数，这在某些框架中很有用：

```python
# 获取单个工具并转换为函数
get_weather = apiset.to_function_tool("get_weather")

# 现在可以像调用普通函数一样使用
result = get_weather(location="上海", unit="celsius")
```

这个功能对于 Google ADK 等需要原生 Python 函数的框架特别有用。

## 实战案例：构建天气查询 Agent

让我们通过一个完整的例子来展示如何构建一个能够查询天气的 Agent。这个 Agent 会理解用户的自然语言问题，提取地点信息，调用天气 API，并用友好的方式回答。

首先在 AgentRun 控制台创建一个天气 API 的 ToolSet。假设您已经有一个提供天气查询的 REST API，可以将其 OpenAPI 规范上传到平台。规范可能类似这样：

```yaml
openapi: 3.0.0
info:
  title: Weather API
  version: 1.0.0
paths:
  /current:
    get:
      operationId: getCurrentWeather
      summary: 查询当前天气
      parameters:
        - name: location
          in: query
          required: true
          schema:
            type: string
        - name: unit
          in: query
          schema:
            type: string
            enum: [celsius, fahrenheit]
```

创建完 ToolSet 后，编写 Agent 代码：

```python
from agentrun.integration.langchain import model, toolset
from langchain.agents import create_openai_functions_agent, AgentExecutor
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder

# 获取模型和工具
llm = model("my-model")
tools = toolset("weather-api")

# 定义 Agent 提示词
prompt = ChatPromptTemplate.from_messages([
    ("system", """你是一个天气查询助手。你可以帮用户查询世界各地的天气信息。

使用工具时请注意：
1. 从用户问题中提取准确的地点名称
2. 默认使用摄氏度作为温度单位
3. 将查询结果用通俗易懂的语言告诉用户

如果用户没有提供地点，请友好地询问。"""),
    ("user", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad")
])

# 创建 Agent
agent = create_openai_functions_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# 处理用户查询
def query_weather(user_input: str):
    result = agent_executor.invoke({"input": user_input})
    return result["output"]

# 测试
print(query_weather("杭州今天天气怎么样？"))
print(query_weather("北京和上海哪里更热？"))
```

这个 Agent 展示了工具集成的完整流程。当用户问"杭州今天天气怎么样"时，Agent 会：

1. 理解用户意图是查询天气
2. 识别地点是"杭州"
3. 决定使用 getCurrentWeather 工具
4. 构造参数 `{"location": "杭州", "unit": "celsius"}`
5. 调用工具获取天气数据
6. 将结果整合成自然语言回答

对于"北京和上海哪里更热"这样的复杂问题，Agent 会自动进行两次工具调用，分别查询两个城市的天气，然后对比温度给出答案。

您可以进一步增强这个 Agent。例如，添加历史天气查询工具，让 Agent 能够回答"杭州过去一周的天气"；添加天气预报工具，支持"明天会下雨吗"这类问题；或者集成地图工具，让 Agent 能够根据模糊的地点描述找到准确的位置。

工具的组合使用为 Agent 提供了强大而灵活的能力。通过合理设计工具集和 Agent 逻辑，您可以构建出能够处理复杂任务的智能应用。