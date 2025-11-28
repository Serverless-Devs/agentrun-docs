---
sidebar_position: 100
---

# 常见问题

## 安装与配置

### Q: 如何安装 AgentRun SDK？

```bash
pip install agentrun-sdk
```

:::warning
要求 Python 3.10 或更高版本。
:::

### Q: 如何配置认证信息？

**方式一：环境变量（推荐）**

```bash
export AGENTRUN_ACCESS_KEY_ID="your-access-key-id"
export AGENTRUN_ACCESS_KEY_SECRET="your-access-key-secret"
export AGENTRUN_ACCOUNT_ID="your-account-id"
export AGENTRUN_REGION="cn-hangzhou"
```

**方式二：代码配置**

```python
from agentrun.utils.config import Config

config = Config(
    access_key_id="your-key-id",
    access_key_secret="your-secret",
    account_id="your-account-id",
    region_id="cn-hangzhou",
)
```

### Q: 支持哪些区域？

目前支持：
- `cn-hangzhou` - 杭州
- `cn-shanghai` - 上海
- `cn-beijing` - 北京
- 更多区域请参考阿里云官方文档

---

## Agent Runtime

### Q: 如何查看 Agent 运行日志？

配置日志收集后，可在阿里云日志服务 (SLS) 查看：

```python
agent = client.create(
    agent_runtime.AgentRuntimeCreateInput(
        # ... 其他配置
        log_configuration=agent_runtime.AgentRuntimeLogConfig(
            enabled=True,
            project="your-sls-project",
            log_store="your-log-store",
        ),
    )
)
```



## 其他问题

### Q: SDK 支持哪些 Python 版本？

Python 3.10 及以上版本。

### Q: 同步 API 和异步 API 有什么区别？

- **同步 API**：阻塞调用，简单直接
- **异步 API**：非阻塞，适合高并发场景

异步 API 方法名以 `_async` 结尾：
```python
# 同步
agent = client.create(config)

# 异步
agent = await client.create_async(config)
```


---

## 还有问题？

如果以上内容没有解决你的问题，欢迎：

1. 在 [GitHub Issues](https://github.com/AgentRunDev/agentrun-sdk/issues/new) 提问
2. 查阅 [阿里云官方文档](https://help.aliyun.com/zh/functioncompute/fc/agentrun)
