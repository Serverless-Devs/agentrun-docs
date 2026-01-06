---
sidebar_position: 20
---

# 最佳实践

在生产环境中使用 AgentRun SDK 时，遵循一些最佳实践可以帮助您构建更健壮、更高效、更安全的应用。本章汇总了在实际开发和部署过程中的经验和建议，帮助您规避常见陷阱并充分发挥平台的能力。

## 错误处理

正确的错误处理是构建可靠应用的基础。AgentRun SDK 定义了完整的异常体系，通过捕获和处理这些异常，您的应用可以优雅地应对各种故障场景。

SDK 的所有异常都继承自 `AgentRunError` 基类。在最外层使用这个基类捕获异常可以确保不会漏掉任何 SDK 抛出的错误：

```python
from agentrun.utils.exception import AgentRunError
from agentrun.agent_runtime import AgentRuntime

try:
    runtime = AgentRuntime.get_by_id("my-agent")
    # 执行操作
except AgentRunError as e:
    print(f"操作失败: {e}")
    # 记录日志、告警或降级处理
```

对于需要区分不同错误类型的场景，可以使用更具体的异常类。`ResourceNotExistError` 表示请求的资源不存在，这通常意味着资源 ID 错误或资源已被删除：

```python
from agentrun.utils.exception import ResourceNotExistError

try:
    runtime = AgentRuntime.get_by_id("non-existent-id")
except ResourceNotExistError:
    print("Agent Runtime 不存在，可能已被删除")
    # 创建新的或使用默认的
except AgentRunError as e:
    print(f"其他错误: {e}")
```

`ResourceAlreadyExistError` 在尝试创建已存在的资源时抛出。如果您的应用支持幂等性，可以捕获这个异常并直接使用现有资源：

```python
from agentrun.utils.exception import ResourceAlreadyExistError
from agentrun.model import ModelService, ModelServiceCreateInput

try:
    service = ModelService.create(
        ModelServiceCreateInput(name="my-model", ...)
    )
except ResourceAlreadyExistError:
    # 资源已存在，直接获取
    service = ModelService.get_by_name("my-model")
```

HTTP 相关的错误分为 `ClientError` 和 `ServerError` 两类。ClientError 表示客户端请求有误（如参数错误、认证失败），通常需要修正请求；ServerError 表示服务端错误，通常是临时性的，可以通过重试解决：

```python
from agentrun.utils.exception import ClientError, ServerError
import time

def call_with_retry(func, max_retries=3):
    """带重试的函数调用"""
    for attempt in range(max_retries):
        try:
            return func()
        except ClientError as e:
            # 客户端错误不重试
            print(f"请求错误: {e}")
            raise
        except ServerError as e:
            # 服务器错误重试
            if attempt < max_retries - 1:
                wait_time = 2 ** attempt  # 指数退避
                print(f"服务器错误，{wait_time}秒后重试...")
                time.sleep(wait_time)
            else:
                print(f"重试{max_retries}次后仍失败")
                raise
```

在异步代码中，也需要注意错误处理。异步异常的传播机制与同步代码略有不同，确保在 async 函数中正确捕获：

```python
async def safe_create_runtime(input_config):
    try:
        runtime = await AgentRuntime.create_async(input_config)
        return runtime
    except ResourceAlreadyExistError:
        return await AgentRuntime.get_by_id_async(input_config.name)
    except AgentRunError as e:
        # 记录错误并返回 None 或抛出
        print(f"创建失败: {e}")
        return None
```

## 安全性考虑

安全性在企业级应用中至关重要。AgentRun SDK 提供了多层安全机制，正确使用这些机制可以有效保护您的应用和数据。

首要原则是避免在代码中硬编码敏感信息。Access Key、API Token 等凭证应该通过环境变量或密钥管理服务提供：

```python
import os
from agentrun.utils.config import Config

# 推荐：从环境变量读取
config = Config()  # 自动读取 AGENTRUN_* 环境变量

# 避免：硬编码敏感信息
# config = Config(
#     access_key_id="LTAI...",  # 不要这样做
#     access_key_secret="..."
# )
```

在容器化部署时，建议使用 Kubernetes Secret 或云服务商的密钥管理服务来注入环境变量。在本地开发时，使用 `.env` 文件并确保它被 `.gitignore` 排除。

对于需要访问第三方服务的工具，使用 AgentRun 的凭证管理系统来存储 API Key。这样凭证会被加密存储在平台上，Agent 运行时自动注入，避免了在代码中传递敏感信息：

```python
from agentrun.credential import Credential, CredentialCreateInput, CredentialConfig

# 创建凭证
credential = Credential.create(
    CredentialCreateInput(
        name="third-party-api-key",
        config=CredentialConfig.outbound_tool_api_key(
            api_key=os.getenv("THIRD_PARTY_KEY")
        )
    )
)

# 在 ToolSet 中引用凭证名称，而不是直接传递 API Key
```

沙箱环境提供了代码执行的安全隔离。在让 Agent 执行用户提供的代码时，务必使用沙箱而不是直接在宿主环境中执行。沙箱限制了文件系统访问、网络访问和系统资源使用，即使恶意代码也无法危害宿主系统：

```python
from agentrun.sandbox import Sandbox, TemplateType

# 在沙箱中执行代码
sandbox = Sandbox.create(
    template_type=TemplateType.CODE_INTERPRETER,
    template_name="python-sandbox"
)

# 执行用户提供的代码
result = sandbox.context.execute(
    code=user_provided_code,
    timeout=30  # 设置超时防止无限循环
)

# 使用完毕后清理
sandbox.delete()
```

对于 HTTP 服务器，确保在生产环境中配置适当的认证和授权机制。虽然 AgentRunServer 提供了 OpenAI 兼容的 API，但它本身不包含认证逻辑，您需要在前端添加 API Gateway 或使用反向代理来实现认证：

```python
from agentrun.server import AgentRunServer

# 服务器本身不包含认证
server = AgentRunServer(invoke_agent=my_agent)

# 在生产环境中，应该在前面加一层认证
# 例如使用 Nginx 反向代理 + JWT 验证
# 或者使用阿里云 API Gateway
```

## 性能优化

合理的性能优化可以显著降低成本并提升用户体验。AgentRun SDK 提供了多种机制来帮助您优化应用性能。

优先使用异步 API。在处理并发请求或需要调用多个远程服务时，异步 API 可以大幅提升吞吐量。SDK 的大部分方法都提供了异步版本：

```python
import asyncio
from agentrun.model import ModelProxy

async def process_batch(queries):
    """并发处理多个查询"""
    proxy = ModelProxy.get_by_name("my-proxy")
    
    # 创建并发任务
    tasks = [
        proxy.completions_async(
            messages=[{"role": "user", "content": query}]
        )
        for query in queries
    ]
    
    # 等待所有任务完成
    results = await asyncio.gather(*tasks)
    return results

# 处理 10 个查询只需要一次最慢查询的时间
queries = ["问题1", "问题2", ..., "问题10"]
results = asyncio.run(process_batch(queries))
```

使用模型代理的负载均衡功能可以提升模型服务的可用性和性能。将请求分散到多个模型实例上，避免单点瓶颈：

```python
from agentrun.model import ModelProxy, ModelProxyCreateInput, ProxyConfig

# 配置负载均衡
proxy = ModelProxy.create(
    ModelProxyCreateInput(
        name="balanced-proxy",
        proxy_config=ProxyConfig(
            mode="LOAD_BALANCE",
            endpoints=[
                {"model_name": "model-1", "weight": 50},
                {"model_name": "model-2", "weight": 50}
            ]
        )
    )
)
```

合理设置超时时间。默认的请求超时是 600 秒，对于大多数场景足够，但某些长时间运行的任务可能需要更长的超时：

```python
from agentrun.utils.config import Config

# 为长时间运行的任务设置更长的超时
config = Config(
    timeout=1800,  # 30 分钟
    read_timeout=100000  # 读取超时
)

# 在调用时传入配置
result = sandbox.context.execute(code, config=config)
```

沙箱的复用可以减少创建和销毁的开销。如果您需要执行多次代码，考虑复用同一个沙箱实例而不是每次都创建新的：

```python
# 不推荐：每次都创建新沙箱
for code_snippet in code_list:
    sandbox = Sandbox.create(...)
    result = sandbox.context.execute(code_snippet)
    sandbox.delete()

# 推荐：复用沙箱
sandbox = Sandbox.create(...)
try:
    for code_snippet in code_list:
        result = sandbox.context.execute(code_snippet)
finally:
    sandbox.delete()
```

使用流式输出改善用户体验。即使后端处理需要时间，用户也能尽早看到部分结果，感知上的响应速度会大幅提升：

```python
# 启用流式输出
response = model.completions(
    messages=messages,
    stream=True
)

# 逐步返回内容
for chunk in response:
    content = chunk.choices[0].delta.content
    if content:
        print(content, end='', flush=True)
```

## 资源管理

良好的资源管理习惯可以避免资源泄漏和不必要的费用。AgentRun 的资源都有生命周期，需要在使用完毕后正确清理。

沙箱是需要特别注意清理的资源。创建沙箱会分配计算资源，如果不及时释放会持续产生费用。使用 try-finally 模式确保沙箱总是被删除：

```python
sandbox = Sandbox.create(template_type=TemplateType.CODE_INTERPRETER)
try:
    # 使用沙箱
    result = sandbox.context.execute(code)
    # 处理结果
finally:
    # 确保清理
    sandbox.delete()
```

对于长时间运行的沙箱，设置合适的空闲超时时间。沙箱在一段时间无活动后会自动停止，避免忘记清理导致的资源浪费：

```python
sandbox = Sandbox.create(
    template_type=TemplateType.CODE_INTERPRETER,
    template_name="my-template",
    sandbox_idle_timeout_seconds=300  # 5分钟无活动后自动停止
)
```

在创建资源时使用等待方法来确保资源就绪。某些资源创建是异步的，立即使用可能会失败：

```python
# 创建 Agent Runtime
runtime = AgentRuntime.create(input_config)

# 等待就绪
runtime.wait_until_ready_or_failed(
    interval_seconds=5,
    timeout_seconds=300
)

# 现在可以安全使用
endpoint = runtime.create_endpoint(endpoint_config)
```

删除资源时也可以等待删除完成，确保资源真正被清理：

```python
# 删除并等待完成
runtime.delete_and_wait_until_finished(
    interval_seconds=5,
    timeout_seconds=300
)
```

定期清理不再使用的资源。可以编写清理脚本定期检查和删除长期未使用的 Agent Runtime、模型服务等：

```python
from datetime import datetime, timedelta

# 清理超过 7 天未使用的测试环境
runtimes = AgentRuntime.list()
cutoff_time = datetime.now() - timedelta(days=7)

for runtime in runtimes:
    if runtime.name.startswith("test-"):
        if runtime.last_modified_time < cutoff_time:
            print(f"清理旧资源: {runtime.name}")
            runtime.delete()
```

## 日志和监控

完善的日志和监控对于排查问题和优化性能至关重要。SDK 提供了内置的日志功能，合理使用可以帮助您快速定位问题。

在开发和调试时，启用 DEBUG 日志可以看到 SDK 的详细执行过程：

```python
import os

# 设置环境变量启用 DEBUG 日志
os.environ["AGENTRUN_SDK_DEBUG"] = "true"

# 或者在代码中配置
from agentrun.utils.log import logger
logger.setLevel("DEBUG")
```

DEBUG 模式会输出所有 HTTP 请求和响应的详细信息，包括请求 URL、Headers、Body 等。注意在生产环境中关闭 DEBUG 模式，避免日志过多和敏感信息泄露。

在生产环境中使用结构化日志。记录关键操作的结果、耗时和上下文信息，便于后续分析：

```python
import time
from agentrun.utils.log import logger

start_time = time.time()
try:
    result = model.completions(messages=messages)
    duration = time.time() - start_time
    
    logger.info(
        "模型调用成功",
        extra={
            "model": model.name,
            "duration": duration,
            "tokens": result.usage.total_tokens
        }
    )
except Exception as e:
    duration = time.time() - start_time
    logger.error(
        "模型调用失败",
        extra={
            "model": model.name,
            "duration": duration,
            "error": str(e)
        }
    )
```

利用 Agent Runtime 的日志配置将应用日志投递到阿里云日志服务（SLS）。在 `s.yaml` 中配置日志投递后，所有的标准输出和标准错误都会自动收集：

```yaml
logConfig:
  project: my-sls-project
  logstore: my-logstore
  enableRequestMetrics: true
  enableInstanceMetrics: true
```

这样您可以在 SLS 控制台查询和分析日志，设置告警规则，构建监控大盘。

## 常见陷阱规避

基于实际使用经验，以下是一些容易遇到的问题和避免方法。

不要在循环中重复创建客户端对象。客户端对象可以复用，重复创建会产生不必要的开销：

```python
# 不推荐
for item in items:
    client = ModelClient()  # 每次都创建
    model = client.get("my-model")
    # ...

# 推荐
client = ModelClient()
for item in items:
    model = client.get("my-model")
    # ...
```

注意异步上下文的正确使用。在异步函数中调用同步方法可能导致事件循环阻塞：

```python
import asyncio

# 错误：在异步函数中调用同步方法
async def bad_example():
    result = model.completions(messages)  # 阻塞事件循环
    return result

# 正确：使用异步版本
async def good_example():
    result = await model.completions_async(messages)
    return result
```

不要忽略资源状态检查。某些操作要求资源处于特定状态，直接操作可能失败：

```python
# 检查状态
runtime = AgentRuntime.get_by_id("my-agent")
if runtime.status != "Ready":
    print(f"Agent 尚未就绪，当前状态: {runtime.status}")
    runtime.wait_until_ready_or_failed()

# 现在可以安全操作
endpoint = runtime.create_endpoint(config)
```

合理使用配置合并机制。Config 对象支持链式合并，后面的配置会覆盖前面的：

```python
# 全局配置
global_config = Config(
    access_key_id="...",
    region_id="cn-hangzhou"
)

# 特定操作的配置
operation_config = Config(timeout=1800)

# 合并配置，operation_config 的 timeout 会覆盖 global_config 的默认值
merged_config = global_config.update(operation_config)
```

这些最佳实践来自于实际项目中的经验总结。遵循这些建议可以帮助您构建更加健壮和高效的 Agent 应用，减少在生产环境中遇到问题的概率。当然，每个项目都有其特殊性，您需要根据具体场景灵活应用这些原则。