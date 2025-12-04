---
sidebar_position: 150
---

# Agent OpenAI 兼容性说明

## 背景说明

### Q: Agent 服务与 OpenAI API 的关系是什么？

Agent 服务提供了与 OpenAI Chat Completions API 兼容的接口格式，允许您使用熟悉的 OpenAI 客户端或 HTTP 请求方式调用 Agent。

```bash
# OpenAI 标准格式调用
curl http://127.0.0.1:9000/openai/v1/chat/completions -XPOST \
    -H "content-type: application/json" \
    -d '{
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "Hello"}],
        "temperature": 0.7,
        "stream": true
    }'
```

:::warning
虽然接口格式兼容，但 Agent 与纯 LLM 服务在功能定位上有本质区别。
:::

### Q: 为什么有些 OpenAI 参数不生效？

**原因分析：**
- OpenAI API 设计用于通用 LLM 文本生成
- Agent 是预配置的任务型智能体，已绑定特定模型和工具
- 默认的 Agent 模板未处理所有 OpenAI 参数

**当前状态：**
```python
# 默认模板只处理了这些参数
✅ messages  # 对话历史
✅ stream    # 流式输出

# 这些参数被忽略
❌ model, temperature, max_tokens, top_p 等
```

---

## 参数兼容性

### Q: 哪些参数可以传递但默认不生效？

| 参数 | 说明 | 默认处理方式 |
|-----|------|------------|
| `model` | 模型选择 | 忽略，使用预设模型 |
| `temperature` | 创造性控制 (0-2) | 忽略 |
| `max_tokens` | 最大输出长度 | 忽略 |
| `top_p` | 核采样参数 | 忽略 |
| `frequency_penalty` | 频率惩罚 (-2.0 到 2.0) | 忽略 |
| `presence_penalty` | 存在惩罚 (-2.0 到 2.0) | 忽略 |
| `stop` | 停止序列 | 忽略 |
| `n` | 生成数量 | 忽略 |
| `seed` | 随机种子 | 忽略 |

---

## 修改指南

### Q: 如何让 OpenAI 参数生效？

修改 `invoke_agent` 函数，将参数传递给底层 agent：

```python
def invoke_agent(request: AgentRequest):
    content = request.messages[0].content
    input = {"messages": [{"role": "user", "content": content}]}
    
    # 收集 OpenAI 标准参数
    config_params = {}
    openai_params = [
        'temperature', 'max_tokens', 'top_p', 
        'frequency_penalty', 'presence_penalty', 
        'stop', 'seed'
    ]
    
    for param in openai_params:
        if hasattr(request, param):
            config_params[param] = getattr(request, param)
    
    # 传递参数给 agent
    runtime_config = {"configurable": config_params} if config_params else {}
    
    try:
        if request.stream:
            def stream_generator():
                result = agent.stream(
                    input, 
                    config=runtime_config,  # ← 关键：传递配置
                    stream_mode="messages"
                )
                for chunk in result:
                    yield pydash.get(chunk, "[0].content")
            return stream_generator()
        else:
            result = agent.invoke(
                input,
                config=runtime_config  # ← 关键：传递配置
            )
            return pydash.get(result, "messages.-1.content")
    except Exception as e:
        logger.error("调用出错: %s", e)
        raise e
```

:::tip
修改后，temperature、max_tokens 等参数将传递到底层 LLM，实际生效情况取决于您使用的模型支持程度。
:::

### Q: 如何支持动态 model 参数？

如果需要根据请求动态切换模型：

```python
def invoke_agent(request: AgentRequest):
    content = request.messages[0].content
    input = {"messages": [{"role": "user", "content": content}]}
    
    # 动态处理 model 参数
    model_name = getattr(request, 'model', MODEL_NAME)
    
    # 如果请求的模型与预设不同，创建新的 agent
    if model_name != MODEL_NAME:
        dynamic_agent = create_agent(
            model=model(model_name),  # 使用请求的模型
            tools=[*code_interpreter_tools],
            system_prompt="你是一个 AgentRun 的 AI 专家..."
        )
    else:
        dynamic_agent = agent
    
    # 其余参数处理...
    config_params = {}
    for param in ['temperature', 'max_tokens', 'top_p']:
        if hasattr(request, param):
            config_params[param] = getattr(request, param)
    
    runtime_config = {"configurable": config_params} if config_params else {}
    
    # 使用 dynamic_agent 执行
    if request.stream:
        result = dynamic_agent.stream(input, config=runtime_config, stream_mode="messages")
        # ...
    else:
        result = dynamic_agent.invoke(input, config=runtime_config)
        # ...
```

:::warning
动态创建 agent 会增加响应延迟，建议在必要时才使用此方案。
:::

---

## 最佳实践

### Q: 推荐的参数处理策略是什么？

1. **明确文档说明**：告知用户哪些参数有效
2. **参数验证**：检查参数范围和类型
3. **日志记录**：记录忽略或转换的参数
4. **优雅降级**：不支持的参数给出警告但不报错

```python
def invoke_agent(request: AgentRequest):
    # 参数分类处理
    SUPPORTED = ['temperature', 'max_tokens', 'top_p']
    IGNORED = ['model', 'n', 'tools']
    
    # 记录被忽略的参数
    for param in IGNORED:
        if hasattr(request, param):
            logger.warning(f"参数 '{param}' 在 Agent 模式下不支持，将被忽略")
    
    # 处理支持的参数
    config_params = {}
    for param in SUPPORTED:
        if hasattr(request, param):
            value = getattr(request, param)
            # 参数验证（示例）
            if param == 'temperature' and not (0 <= value <= 2):
                logger.warning(f"temperature={value} 超出范围 [0,2]，使用默认值")
                continue
            config_params[param] = value
            logger.debug(f"应用参数: {param}={value}")
    
    # 继续执行...
```

### Q: Agent 特有参数如何处理？

可以扩展支持 Agent 特有的参数：

```python
# 在请求中支持 Agent 特有参数
{
    "messages": [...],
    "stream": true,
    # OpenAI 标准参数
    "temperature": 0.7,
    # Agent 特有参数（通过 metadata 或自定义字段）
    "agent_config": {
        "sandbox_timeout": 300,
        "tool_choice": "auto",
        "max_iterations": 5
    }
}
```

---

## 常见错误

### Q: 参数传递了但还是不生效？

检查以下几点：
1. 确认参数通过 `config` 传递给了 `agent.stream()` 或 `agent.invoke()`
2. 验证底层模型是否支持该参数
3. 查看日志确认参数是否被正确解析

### Q: 如何调试参数传递？

添加详细日志：
```python
import json

def invoke_agent(request: AgentRequest):
    # 打印收到的所有参数
    logger.info(f"收到请求参数: {json.dumps(request.__dict__, default=str)}")
    
    # 打印传递给 agent 的配置
    logger.info(f"传递配置: {json.dumps(runtime_config, default=str)}")
```

---

## 还有问题？

如果需要更深入的定制，请参考：
1. [LangChain Agent 文档](https://python.langchain.com/docs/modules/agents/)
2. [OpenAI API 参考](https://platform.openai.com/docs/api-reference/chat)
3. 联系 AgentRun 技术支持：134570017218（钉钉群，AI 成长之路）
