---
sidebar_position: 4
---

# 模型使用基础

模型是 Agent 的核心能力来源。AgentRun 提供了统一的模型管理接口，屏蔽不同模型供应商的 API 差异，让您可以用一致的方式调用各种大语言模型。本章将介绍如何创建和使用模型，以及如何在实际应用中发挥模型的最大价值。

## 理解模型服务与模型代理

AgentRun 支持两种模型接入方式：ModelService（模型服务）和 ModelProxy（模型代理）。理解它们的区别有助于您根据实际需求选择合适的方案。

ModelService 用于接入您自己部署的模型服务。如果您在自己的服务器或容器中运行了开源模型（如 Llama、ChatGLM 等），或者搭建了私有化的模型推理服务，可以通过 ModelService 将这些服务注册到 AgentRun 平台。ModelService 会记录您的服务端点信息和认证配置，当 Agent 调用模型时，请求会被转发到您的服务地址。

ModelProxy 则是一个更高级的抽象，提供了模型治理能力。它可以代理一个或多个模型服务，并在其上实现负载均衡、故障转移、请求限流等企业级特性。例如，您可以创建一个 ModelProxy，配置多个后端模型（可能来自不同供应商），当某个模型响应缓慢或出现故障时，请求会自动路由到其他可用的模型。这种机制大大提升了 Agent 应用的可靠性和性能。

对于大多数场景，建议使用 ModelProxy。即使您只有一个模型，通过 ModelProxy 也能获得更好的监控、限流、错误处理等能力。

## 创建模型服务

创建模型服务需要提供服务的基本信息和访问配置。以下示例展示了如何通过 SDK 创建一个 ModelService：

```python
from agentrun.model import ModelService, ModelServiceCreateInput, Provider

# 创建模型服务
input_data = ModelServiceCreateInput(
    name="my-model-service",
    description="我的自建模型服务",
    provider=Provider.OPENAI,
    model_name="gpt-3.5-turbo",
    api_endpoint="https://api.openai.com/v1",
    credential_name="my-openai-credential"
)

service = ModelService.create(input_data)
print(f"模型服务创建成功: {service.name}")
```

在这个例子中，我们创建了一个指向 OpenAI API 的模型服务。`provider` 参数指定模型供应商，SDK 会根据供应商类型处理请求格式转换。`credential_name` 引用了一个预先创建的凭证对象，该凭证中存储了 API Key 等敏感信息。

创建完成后，您可以通过服务名称获取模型对象并进行调用：

```python
# 获取已创建的模型服务
service = ModelService.get_by_name("my-model-service")

# 查看模型信息
info = service.model_info()
print(f"模型类型: {info.model_type}")
print(f"支持的特性: {info.features}")
```

## 创建模型代理

ModelProxy 的创建过程与 ModelService 类似，但需要配置后端模型列表和路由策略：

```python
from agentrun.model import ModelProxy, ModelProxyCreateInput, ProxyConfig, ProxyMode

# 创建模型代理
input_data = ModelProxyCreateInput(
    name="my-model-proxy",
    description="智能路由的模型代理",
    proxy_config=ProxyConfig(
        mode=ProxyMode.LOAD_BALANCE,
        endpoints=[
            ProxyConfigEndpoint(
                model_name="gpt-3.5-turbo",
                weight=70
            ),
            ProxyConfigEndpoint(
                model_name="gpt-4",
                weight=30
            )
        ]
    )
)

proxy = ModelProxy.create(input_data)
print(f"模型代理创建成功: {proxy.name}")
```

这个配置创建了一个支持负载均衡的模型代理，70% 的请求会路由到 gpt-3.5-turbo，30% 路由到 gpt-4。这种配置既保证了成本效益，又能让部分请求享受到更强大模型的能力。

## 基础对话

模型创建完成后，就可以进行对话调用了。AgentRun SDK 提供了 `completions` 方法来发起对话请求：

```python
# 获取模型
service = ModelService.get_by_name("my-model-service")

# 构造对话消息
messages = [
    {"role": "system", "content": "你是一个有帮助的助手。"},
    {"role": "user", "content": "请介绍一下 Python 的特点。"}
]

# 调用模型
response = service.completions(messages=messages)

# 获取回复内容
for choice in response.choices:
    print(choice.message.content)
```

`completions` 方法接受标准的 OpenAI 格式消息列表，包含角色（role）和内容（content）两个字段。角色可以是 `system`、`user` 或 `assistant`，分别表示系统提示、用户输入和助手回复。

对于需要更多控制的场景，可以使用 `responses` 方法并传入额外参数：

```python
# 使用更多参数控制生成
response = service.completions(
    messages=messages,
    temperature=0.7,
    max_tokens=500,
    top_p=0.9
)
```

这些参数控制模型的生成行为。`temperature` 影响输出的随机性，值越高输出越多样化；`max_tokens` 限制生成的最大长度；`top_p` 控制核采样的概率阈值。

## 流式输出

在实际应用中，用户往往希望尽快看到模型的响应，而不是等待整个回答生成完毕。流式输出通过逐步返回生成的内容来改善用户体验：

```python
# 启用流式输出
response = service.completions(
    messages=messages,
    stream=True
)

# 逐块处理返回的内容
for chunk in response:
    if hasattr(chunk.choices[0].delta, 'content'):
        content = chunk.choices[0].delta.content
        if content:
            print(content, end='', flush=True)
```

流式模式下，`completions` 方法返回一个迭代器，每次迭代产生一个响应块。响应块的 `delta` 字段包含增量内容，您需要将这些增量拼接起来得到完整的回答。

流式输出特别适合构建交互式应用。例如在聊天界面中，用户可以看到回答逐字显示，就像真人在打字一样，这大大提升了体验的流畅感。

## 模型切换与负载均衡

使用 ModelProxy 可以实现灵活的模型切换和负载均衡。前面的例子展示了基于权重的负载均衡，此外还支持故障转移和优先级路由等策略。

故障转移模式下，请求会优先发送到主模型，当主模型出现错误或超时时，自动切换到备用模型：

```python
proxy_config = ProxyConfig(
    mode=ProxyMode.FALLBACK,
    endpoints=[
        ProxyConfigEndpoint(
            model_name="primary-model",
            priority=1
        ),
        ProxyConfigEndpoint(
            model_name="backup-model",
            priority=2
        )
    ]
)
```

这种配置确保了服务的高可用性。即使主模型暂时不可用，Agent 仍然能够正常工作，只是会使用备用模型来处理请求。

您也可以在运行时动态选择使用哪个模型。ModelProxy 的 `completions` 方法支持 `model` 参数来指定具体的后端模型：

```python
# 使用代理中的特定模型
response = proxy.completions(
    messages=messages,
    model="gpt-4"  # 明确指定使用 gpt-4
)
```

这种灵活性使得您可以根据任务的重要性或复杂度来选择合适的模型。例如，简单的问答使用较小的模型，复杂的推理任务则使用更强大的模型。

## 实战案例：构建智能客服

让我们通过一个完整的例子来综合运用前面学到的知识。这个智能客服 Agent 能够回答常见问题，并在必要时升级到更强大的模型来处理复杂问题。

首先创建模型配置：

```python
from agentrun.model import ModelProxy, ModelProxyCreateInput, ProxyConfig, ProxyMode

# 创建支持多模型的代理
proxy_input = ModelProxyCreateInput(
    name="customer-service-proxy",
    description="客服专用模型代理",
    proxy_config=ProxyConfig(
        mode=ProxyMode.LOAD_BALANCE,
        endpoints=[
            ProxyConfigEndpoint(
                model_name="gpt-3.5-turbo",
                weight=80
            ),
            ProxyConfigEndpoint(
                model_name="gpt-4",
                weight=20
            )
        ]
    )
)

proxy = ModelProxy.create(proxy_input)
```

然后实现客服逻辑：

```python
def handle_customer_query(query: str, use_advanced_model: bool = False):
    """处理客户查询"""
    proxy = ModelProxy.get_by_name("customer-service-proxy")
    
    # 构造系统提示
    system_prompt = """你是一个专业的客服助手。请遵循以下原则：
    1. 友好、耐心地回答客户问题
    2. 如果问题涉及技术细节，提供准确的信息
    3. 如果不确定答案，诚实地告知并建议联系人工客服
    """
    
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": query}
    ]
    
    # 根据问题复杂度选择模型
    model_name = "gpt-4" if use_advanced_model else None
    
    # 调用模型
    response = proxy.completions(
        messages=messages,
        model=model_name,
        temperature=0.7,
        stream=True
    )
    
    # 流式返回答案
    answer = ""
    for chunk in response:
        if hasattr(chunk.choices[0].delta, 'content'):
            content = chunk.choices[0].delta.content
            if content:
                answer += content
                print(content, end='', flush=True)
    
    return answer

# 使用示例
print("客户问题：如何重置密码？")
handle_customer_query("如何重置密码？")

print("\n\n客户问题：你们的API限流策略是什么？")
handle_customer_query(
    "你们的API限流策略和计费规则具体是怎样的？",
    use_advanced_model=True  # 复杂问题使用高级模型
)
```

这个客服系统通过模型代理实现了成本和性能的平衡。大部分简单问题由 gpt-3.5-turbo 处理，成本较低；遇到复杂问题时，可以主动切换到 gpt-4 获得更准确的答案。系统提示确保了回答的专业性和一致性，流式输出则提供了良好的交互体验。

在实际部署时，您可以进一步优化这个系统。例如，添加问题分类逻辑，自动判断何时需要使用高级模型；集成历史对话记录，提供上下文感知的回答；连接知识库，让 Agent 能够引用企业内部的文档和政策。这些高级功能将在后续章节中详细介绍。