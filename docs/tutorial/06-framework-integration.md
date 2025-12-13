---
sidebar_position: 16
---

# 框架集成入门

AgentRun 的设计理念是开放生态和灵活组装。您可以继续使用熟悉的 AI 开发框架编写 Agent 逻辑，同时享受 AgentRun 平台提供的模型管理、沙箱环境、工具系统等企业级能力。本章将介绍如何将 AgentRun 与主流框架集成，以及如何在集成过程中发挥各自的优势。

## 集成设计理念

AgentRun SDK 的集成模块采用适配器模式，将平台的核心能力抽象为 CommonModel 和 CommonToolSet 两个通用对象。这两个对象封装了与 AgentRun 平台的所有交互细节，并提供了转换方法来生成各个框架所需的原生对象。

这种设计带来了几个重要优势。首先是代码的可移植性，您可以编写框架无关的核心逻辑，在需要时轻松切换框架。其次是渐进式集成，可以先在某个框架中验证 Agent 的可行性，然后迁移到更适合生产环境的框架。最后是混合使用，在同一个应用中可以同时使用多个框架的特性，取长补短。

CommonModel 对象代表一个 AgentRun 模型，可以是 ModelService 或 ModelProxy。它封装了模型调用的底层 API，并提供了 `to_langchain()`、`to_agentscope()` 等转换方法。这些方法返回对应框架的模型对象，可以直接用于框架的 Agent 构建。

CommonToolSet 对象则代表一组工具，可以来自 ToolSet、沙箱模板或自定义工具定义。它同样提供了转换方法，将工具描述转换为各个框架的工具格式。工具转换时会自动处理参数映射、调用包装等细节，确保工具在不同框架中的行为一致。

## 选择合适的框架

AgentRun 目前支持六个主流 AI 开发框架，它们各有特点和适用场景。

LangChain 是最成熟和生态最丰富的框架，提供了完整的 Agent 开发工具链，包括提示词模板、记忆管理、链式调用等。它特别适合构建复杂的对话流程和知识密集型应用。LangChain 的社区活跃，有大量的示例和第三方集成可以参考。

AgentScope 是阿里云推出的多智能体框架，强调分布式部署和多 Agent 协作。它提供了消息传递机制和 Agent 编排能力，适合构建需要多个 Agent 协同工作的复杂系统。AgentScope 的设计考虑了生产环境的稳定性和可观测性。

LangGraph 是 LangChain 团队开发的状态图框架，用于构建具有复杂控制流的 Agent。它将 Agent 的行为建模为状态机，每个状态对应一个处理节点，通过边连接形成执行图。LangGraph 适合需要精确控制执行流程的场景，如审批流程、多步骤任务等。

CrewAI 专注于团队协作场景，提供了角色、任务、团队等高层抽象。在 CrewAI 中，您定义多个 Agent 作为团队成员，每个 Agent 有特定的角色和技能，然后协作完成复杂任务。它内部使用 LangChain，可以看作是 LangChain 的高层封装。

Google ADK（Agent Development Kit）是 Google 推出的 Agent 开发工具包，强调简洁性和工程化。它使用 Python 函数作为工具，通过类型注解来定义工具参数，提供了类型安全的 API。Google ADK 适合追求代码整洁和类型安全的团队。

Pydantic AI 是基于 Pydantic 的 Agent 框架，利用 Pydantic 的数据验证能力来确保 Agent 输入输出的正确性。它支持 OpenAI 兼容的模型接口，提供了函数调用和结构化输出等特性。Pydantic AI 适合需要严格数据验证的应用场景。

选择框架时，建议考虑以下因素：如果您已经在使用某个框架，优先选择集成该框架以降低迁移成本；如果是新项目，LangChain 是最安全的选择，它的生态和文档最完善；如果需要多 Agent 协作，考虑 AgentScope 或 CrewAI；如果强调类型安全，选择 Google ADK 或 Pydantic AI；如果需要复杂的控制流，LangGraph 是最佳选择。

## LangChain 集成详解

LangChain 是使用最广泛的框架，我们先详细了解它的集成方式。AgentRun SDK 提供了 `agentrun.integration.langchain` 模块，包含三个核心函数：`model`、`toolset` 和 `sandbox_toolset`。

`model` 函数用于获取 AgentRun 模型并转换为 LangChain 的 BaseChatModel：

```python
from agentrun.integration.langchain import model

# 从模型名称创建
llm = model("my-model")

# 从 ModelProxy 对象创建
from agentrun.model import ModelProxy
proxy = ModelProxy.get_by_name("my-proxy")
llm = model(proxy)

# 从 ModelService 对象创建
from agentrun.model import ModelService
service = ModelService.get_by_name("my-service")
llm = model(service)
```

返回的 `llm` 对象是一个标准的 LangChain ChatModel，可以直接用于 LangChain 的各种组件。它支持同步和异步调用，支持流式输出和函数调用等特性。

`toolset` 函数将 AgentRun ToolSet 转换为 LangChain StructuredTool 列表：

```python
from agentrun.integration.langchain import toolset

# 从工具集名称创建
tools = toolset("weather-api")

# 从 ToolSet 对象创建
from agentrun.toolset import ToolSet
ts = ToolSet.get_by_name("weather-api")
tools = toolset(ts)
```

`sandbox_toolset` 函数则将沙箱模板转换为工具列表：

```python
from agentrun.integration.langchain import sandbox_toolset
from agentrun.sandbox import TemplateType

# 创建代码解释器工具
code_tools = sandbox_toolset(
    template_name="my-sandbox",
    template_type=TemplateType.CODE_INTERPRETER,
    sandbox_idle_timeout_seconds=300
)

# 创建浏览器工具
browser_tools = sandbox_toolset(
    template_name="my-browser",
    template_type=TemplateType.BROWSER
)
```

有了这些组件，就可以构建 LangChain Agent 了：

```python
from langchain.agents import create_openai_functions_agent, AgentExecutor
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder

# 准备组件
llm = model("my-model")
tools = toolset("my-toolset") + sandbox_toolset("my-sandbox", TemplateType.CODE_INTERPRETER)

# 定义提示词
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个有帮助的助手。"),
    ("user", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad")
])

# 创建 Agent
agent = create_openai_functions_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# 运行 Agent
result = agent_executor.invoke({"input": "帮我计算斐波那契数列的第20项"})
print(result["output"])
```

这个 Agent 结合了远程模型和代码执行能力。当用户提问时，Agent 会自动决定是否需要编写代码，在沙箱中执行代码，并基于结果回答问题。

## AgentScope 集成详解

AgentScope 的集成方式与 LangChain 类似，但返回的是 AgentScope 原生对象。使用 `agentrun.integration.agentscope` 模块：

```python
from agentrun.integration.agentscope import model, toolset, sandbox_toolset
from agentscope.agents import DialogAgent

# 获取模型
llm = model("my-model")

# 获取工具
tools = toolset("my-toolset")

# 创建 AgentScope Agent
agent = DialogAgent(
    name="assistant",
    model_config_name=llm,
    use_memory=True,
    sys_prompt="你是一个有帮助的助手。"
)

# 与 Agent 对话
response = agent({"content": "你好"})
print(response.content)
```

AgentScope 强调多 Agent 协作。您可以创建多个 Agent，让它们相互交互：

```python
from agentscope.agents import DialogAgent, UserAgent
from agentscope.pipelines import SequentialPipeline

# 创建多个 Agent
user = UserAgent(name="user")
assistant = DialogAgent(
    name="assistant",
    model_config_name=model("my-model"),
    sys_prompt="你是一个有帮助的助手。"
)
analyst = DialogAgent(
    name="analyst",
    model_config_name=model("my-model"),
    sys_prompt="你是一个数据分析专家。"
)

# 定义协作流程
pipeline = SequentialPipeline([user, assistant, analyst])
result = pipeline.run()
```

在这个例子中，用户的输入先发送给助手 Agent，助手处理后转给分析师 Agent，最后返回结果。这种协作模式适合需要多个专业角色配合的场景。

## 其他框架快速参考

LangGraph 的集成与 LangChain 相同，因为 LangGraph 本身就是 LangChain 生态的一部分：

```python
from agentrun.integration.langgraph import model, toolset
from langgraph.prebuilt import create_react_agent

llm = model("my-model")
tools = toolset("my-toolset")

# 创建 LangGraph Agent
agent = create_react_agent(llm, tools)
result = agent.invoke({"messages": [{"role": "user", "content": "你好"}]})
```

CrewAI 的集成也类似，因为它内部使用 LangChain：

```python
from agentrun.integration.crewai import model, toolset
from crewai import Agent, Task, Crew

llm = model("my-model")
tools = toolset("my-toolset")

# 创建 CrewAI Agent
agent = Agent(
    role="助手",
    goal="帮助用户解决问题",
    backstory="你是一个经验丰富的助手",
    llm=llm,
    tools=tools
)

task = Task(description="回答用户问题", agent=agent)
crew = Crew(agents=[agent], tasks=[task])
result = crew.kickoff()
```

Google ADK 使用原生 Python 函数作为工具：

```python
from agentrun.integration.google_adk import model, toolset

llm = model("my-model")
tools = toolset("my-toolset")

# Google ADK 的 Agent 创建
# tools 已经是 Python 函数列表，可以直接使用
```

Pydantic AI 支持 OpenAI 兼容接口：

```python
from agentrun.integration.pydantic_ai import model, toolset

llm = model("my-model")
tools = toolset("my-toolset")

# Pydantic AI 的 Agent 创建
```

所有框架的集成都遵循相同的模式：使用 `model` 函数获取模型对象，使用 `toolset` 或 `sandbox_toolset` 获取工具列表，然后按照框架的标准方式创建 Agent。

## 实战案例：构建多轮对话 Agent

让我们通过一个完整的案例来展示框架集成的实际应用。这个 Agent 能够进行多轮对话，记住上下文，并在需要时使用工具获取信息。我们使用 LangChain 实现，但同样的逻辑也适用于其他框架。

首先定义 Agent 的能力范围和工具集：

```python
from agentrun.integration.langchain import model, toolset, sandbox_toolset
from agentrun.sandbox import TemplateType
from langchain.agents import create_openai_functions_agent, AgentExecutor
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.memory import ConversationBufferMemory

# 准备模型
llm = model("my-model")

# 准备工具：天气查询 + 代码执行
tools = []
tools.extend(toolset("weather-api"))
tools.extend(sandbox_toolset(
    template_name="my-sandbox",
    template_type=TemplateType.CODE_INTERPRETER,
    sandbox_idle_timeout_seconds=300
))

# 创建记忆组件
memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

# 定义提示词模板
prompt = ChatPromptTemplate.from_messages([
    ("system", """你是一个智能助手，可以帮助用户查询天气和执行代码。

你拥有以下能力：
1. 查询世界各地的天气信息
2. 编写和执行 Python 代码来进行计算或数据处理

在对话中请注意：
- 记住之前的对话内容，提供连贯的服务
- 当用户提到"刚才"、"之前"等词时，参考对话历史
- 主动使用工具来获取准确信息，不要猜测
- 用友好、专业的语气回答"""),
    MessagesPlaceholder(variable_name="chat_history"),
    ("user", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad")
])

# 创建 Agent
agent = create_openai_functions_agent(llm, tools, prompt)
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    memory=memory,
    verbose=True,
    max_iterations=5
)

# 封装为对话接口
def chat(user_input: str) -> str:
    result = agent_executor.invoke({"input": user_input})
    return result["output"]
```

现在可以进行多轮对话了：

```python
# 第一轮：查询天气
response1 = chat("杭州今天天气怎么样？")
print(f"助手: {response1}\n")

# 第二轮：基于上下文继续
response2 = chat("那北京呢？")
print(f"助手: {response2}\n")

# 第三轮：使用代码工具
response3 = chat("帮我计算一下，如果明天杭州是今天的温度加上10度，会是多少？")
print(f"助手: {response3}\n")

# 第四轮：引用更早的上下文
response4 = chat("对比一下我问过的两个城市的温度")
print(f"助手: {response4}\n")
```

这个对话展示了 Agent 的几个关键能力。在第一轮中，Agent 识别出需要查询天气，调用天气工具获取杭州的天气信息。第二轮中，Agent 理解"那北京呢"指的是也要查询北京的天气，这展示了上下文理解能力。第三轮中，Agent 需要先回忆第一轮的杭州温度，然后使用代码工具进行计算。第四轮中，Agent 需要综合第一轮和第二轮的信息进行对比。

这个案例展示了框架集成的实际价值。通过 LangChain 的记忆管理和 Agent 执行器，我们获得了对话上下文管理能力。通过 AgentRun 的工具系统和沙箱环境，我们给 Agent 提供了实际的能力。两者结合，创造出了一个既智能又实用的对话系统。

您可以进一步扩展这个系统。例如，添加更多类型的工具（如搜索引擎、数据库查询），使 Agent 能够处理更广泛的问题；调整记忆策略，使用摘要记忆或向量记忆来处理长对话；添加用户画像，让 Agent 能够个性化回答；或者使用多 Agent 架构，让不同的 Agent 专注于不同的任务。这些高级特性的实现都建立在框架集成的基础之上。