---
sidebar_position: 8
---

# 生产环境部署

将 Agent 部署到生产环境需要考虑稳定性、安全性、性能和可维护性等多个方面。本章将介绍如何使用 Serverless Devs 工具将 Agent 部署到 AgentRun 平台，并提供生产环境的最佳实践建议。

## 部署前检查清单

在开始部署之前，建议先完成以下准备工作，确保部署过程顺利进行。

**环境准备**方面，确认您已安装 Serverless Devs 工具并配置了有效的阿里云访问凭证。这些凭证需要具备创建和管理 AgentRun 资源的权限，包括创建 Agent Runtime、配置端点、管理网络等操作。同时确认您的账号已开通 AgentRun 服务，并了解服务的配额限制。

**代码准备**方面，确保您的 Agent 代码在本地环境已经过充分测试。所有依赖项都应明确声明在 `requirements.txt` 或等效的依赖文件中，避免使用隐式依赖导致部署后运行失败。代码中不应包含硬编码的密钥或敏感信息，这些信息应通过环境变量或凭证管理系统传递。

**资源规划**方面，根据您的 Agent 负载特征评估所需的计算资源。CPU 和内存的配置直接影响 Agent 的响应速度和并发处理能力。如果 Agent 需要访问数据库或其他内网资源，需要提前规划 VPC 网络配置，包括准备 VPC ID、交换机 ID 和安全组 ID。

**权限配置**方面，为 Agent Runtime 准备一个 RAM 角色。这个角色需要具备 Agent 运行所需的各种权限，例如访问 OSS 存储、写入日志到 SLS、调用其他云服务等。建议遵循最小权限原则，只授予必需的权限。

**监控规划**方面，如果需要使用日志服务，提前创建好 SLS 项目和日志库。日志配置应在部署配置中明确指定，这样 Agent 运行时的日志才能被正确收集和持久化。

## 配置部署文件

AgentRun 使用 Serverless Devs 作为部署工具，配置文件采用 YAML 格式。一个基础的生产环境配置文件结构如下：

```yaml
edition: 3.0.0
name: production-agent
access: default

resources:
  my-agent:
    component: agentrun
    props:
      region: cn-hangzhou
      agent:
        name: production-agent
        description: "生产环境 Agent"
        
        code: 
          src: ./code
          language: python3.12
          command:
            - python3
            - main.py
        
        cpu: 2.0
        memory: 4096
        diskSize: 1024
        timeout: 600
        port: 8000
        instanceConcurrency: 50
        
        role: acs:ram::123456789:role/AliyunAgentRunRole
        
        internetAccess: true
        
        environmentVariables:
          ENVIRONMENT: production
          LOG_LEVEL: info
        
        logConfig:
          project: agentrun-logs
          logstore: production-agent
```

这个配置定义了 Agent 的基本信息、代码来源、资源规格和运行参数。`name` 字段是 Agent Runtime 的唯一标识，部署后无法修改，建议使用有意义的命名规则。`code` 部分指定了代码的位置和运行方式，`src` 可以是本地目录、ZIP 文件或 OSS 路径。

资源配置需要根据实际负载调整。`cpu` 和 `memory` 决定了单个实例的计算能力，`instanceConcurrency` 控制单个实例可以同时处理的请求数。这三个参数的配置需要平衡性能和成本，过低会导致响应缓慢，过高则会浪费资源。

`role` 字段指定 Agent Runtime 使用的 RAM 角色。您可以使用 AgentRun 提供的快速授权链接创建一个默认角色，或者根据实际需求创建自定义角色。角色需要包含 AliyunAgentRunFullAccess 权限策略，如果使用了日志服务，还需要添加日志写入权限。

## 网络配置策略

AgentRun 支持三种网络访问模式，您需要根据 Agent 的实际需求选择合适的配置。

**纯公网模式**适合不需要访问内网资源的场景。这种模式下，Agent 只能访问公网服务，配置最简单，只需设置 `internetAccess: true`。这是测试和开发环境的推荐配置。

**纯 VPC 模式**适合需要访问 RDS、Redis 等内网资源的生产环境。在这种模式下，Agent 运行在指定的 VPC 网络中，可以访问 VPC 内的所有资源，但无法直接访问公网。配置示例：

```yaml
agent:
  vpcConfig:
    vpcId: vpc-bp1234567890abcdef
    vSwitchIds:
      - vsw-bp1111111111111111
      - vsw-bp2222222222222222
    securityGroupId: sg-bp1234567890abcdef
  internetAccess: false
```

配置 VPC 时需要注意几点：`vpcId` 必须是您账号下已存在的 VPC，交换机必须属于该 VPC，且与 Agent Runtime 在同一个地域。安全组需要配置适当的入站和出站规则，确保 Agent 能够访问所需的服务端口。

**混合模式**同时支持 VPC 内网和公网访问，适合需要访问内网资源同时对外提供服务的场景。配置时同时指定 `vpcConfig` 和 `internetAccess: true`。这种模式提供了最大的灵活性，但也需要更仔细地配置安全组规则。

## 环境变量管理

生产环境的环境变量管理需要特别注意安全性。敏感信息如 API Key、数据库密码等不应直接写入配置文件，而应通过环境变量注入。

Serverless Devs 支持从本地环境变量读取配置值。您可以创建一个 `.env` 文件来管理环境变量：

```env
API_KEY=your_secret_key
DB_HOST=rds.example.com
DB_PASSWORD=your_db_password
MODEL_ENDPOINT=https://model.example.com
```

在 `s.yaml` 中引用这些变量：

```yaml
agent:
  environmentVariables:
    API_KEY: ${env(API_KEY)}
    DB_HOST: ${env(DB_HOST)}
    DB_PASSWORD: ${env(DB_PASSWORD)}
    MODEL_ENDPOINT: ${env(MODEL_ENDPOINT)}
    ENVIRONMENT: production
```

部署时，Serverless Devs 会自动读取 `.env` 文件并替换配置中的变量引用。务必将 `.env` 文件添加到 `.gitignore`，避免敏感信息被提交到版本控制系统。

对于团队协作场景，可以提供一个 `.env.example` 模板文件，列出所有需要配置的环境变量，但不包含实际的值。团队成员复制这个模板并填入自己的配置。

## 日志配置

完善的日志配置是生产环境监控和故障排查的基础。AgentRun 支持将日志输出到阿里云日志服务（SLS），提供持久化存储和强大的查询分析能力。

配置日志服务需要先在 SLS 中创建项目和日志库，然后在部署配置中引用：

```yaml
agent:
  logConfig:
    project: agentrun-production
    logstore: agent-runtime-logs
  
  role: acs:ram::123456789:role/AliyunAgentRunLogRole
```

执行角色需要具备写入指定日志库的权限。可以为角色附加以下权限策略：

```json
{
  "Version": "1",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "log:PostLogStoreLogs"
      ],
      "Resource": "acs:log:*:*:project/agentrun-production/logstore/agent-runtime-logs"
    }
  ]
}
```

日志配置完成后，Agent 的标准输出和标准错误都会被自动收集到 SLS。您可以在 SLS 控制台查询和分析日志，设置告警规则，或者将日志导出到其他系统。

建议在代码中使用结构化日志格式，例如 JSON，这样便于后续的日志分析。同时合理设置日志级别，避免在生产环境输出过多的调试信息。

## 执行部署

完成配置后，就可以执行部署操作了。首先确保您已配置 Serverless Devs 的访问凭证：

```bash
s config add
```

按照提示输入您的 Access Key ID 和 Access Key Secret，并为这组凭证设置一个名称，例如 `production`。

如果您的项目使用了 Python 依赖，建议先执行构建步骤。构建过程会在 Docker 容器中安装依赖，确保与云端运行环境兼容：

```bash
s build
```

构建完成后执行部署：

```bash
s deploy -a production
```

其中 `-a production` 指定使用名为 `production` 的访问凭证。您也可以在 `s.yaml` 的 `access` 字段中指定凭证名称，这样就不需要每次都传递 `-a` 参数。

部署过程可能需要几分钟时间。Serverless Devs 会显示部署进度，包括代码上传、资源创建、实例启动等步骤。部署成功后会输出 Agent 的访问信息，包括 Agent ID、ARN 和端点地址。

如果您配置了多个端点，部署输出会显示每个端点的详细信息：

```
agent: 
  id: 1062cdd0-042e-407b-8a3f-234370c2c68c
  name: production-agent
  status: READY
  endpoints:
    - id: endpoint-prod
      name: production
      url: https://xxx.agentrun-data.cn-hangzhou.aliyuncs.com/...
    - id: endpoint-canary
      name: canary
      url: https://xxx.agentrun-data.cn-hangzhou.aliyuncs.com/...
```

## 端点管理与灰度发布

生产环境通常需要多个端点来支持不同的发布策略。最基本的配置是创建一个稳定的生产端点：

```yaml
agent:
  endpoints:
    - name: production
      version: 1
      description: "生产环境主端点"
```

当需要发布新版本时，可以采用灰度发布策略来降低风险。首先修改代码并更新配置，创建一个新版本的端点，并配置较小的流量权重：

```yaml
agent:
  endpoints:
    - name: production
      version: 1
      description: "当前生产版本"
    
    - name: canary
      version: 2
      description: "金丝雀测试"
```

重新部署后，`canary` 端点会运行新版本的代码。此时可以通过 `canary` 端点的 URL 直接测试新版本，验证功能是否正常。

确认新版本稳定后，可以逐步增加其流量比例。通过配置 `weight` 参数来控制流量分配，例如将 10% 的流量切换到新版本：

```yaml
endpoints:
  - name: production
    version: 1
  
  - name: canary
    version: 2
    weight: 0.1
```

继续观察新版本的运行指标，如果一切正常，可以进一步提高流量比例，最终将全部流量切换到新版本。这个过程可以分多个阶段进行，例如 10% → 30% → 50% → 100%，每个阶段观察一段时间确保稳定。

如果新版本出现问题，可以快速回滚到旧版本，只需将流量权重调回或删除新版本端点即可。这种灰度发布机制大大降低了发布风险。

## 性能优化建议

生产环境的性能优化需要根据实际负载特征来调整配置参数。

**资源配置**方面，CPU 和内存的分配要匹配 Agent 的计算需求。如果 Agent 主要是 I/O 密集型（大量网络请求或数据库查询），可以适当降低 CPU 配置，增加实例并发数。如果是 CPU 密集型（复杂计算或大量数据处理），则需要增加 CPU 配置。建议通过压测来确定最优配置。

**并发控制**通过 `instanceConcurrency` 参数配置。这个值决定了单个实例可以同时处理多少个请求。设置过低会导致频繁启动新实例，增加冷启动延迟和成本；设置过高可能导致实例过载，请求响应变慢。一般建议从较低的值（如 10）开始，根据监控数据逐步调整。

**超时配置**通过 `timeout` 参数控制。这个值应该略大于 Agent 处理最复杂请求所需的时间，但也不宜设置过大，避免异常请求长时间占用资源。可以通过日志分析来确定合理的超时时间。

**磁盘配置**通过 `diskSize` 参数设置。如果 Agent 需要处理大文件或生成临时文件，需要增加磁盘空间。默认的 512MB 通常足够普通应用使用。

**网络优化**方面，如果 Agent 需要频繁访问某些云服务（如 OSS、RDS），建议配置 VPC 网络，利用内网传输来降低延迟和成本。同时确保安全组规则不会限制必要的网络连接。

## 监控与告警

生产环境需要完善的监控体系来及时发现和处理问题。AgentRun 与阿里云的监控服务深度集成，提供了丰富的监控指标。

通过 SLS 日志服务，您可以查询和分析 Agent 的运行日志。建议配置以下几类告警规则：错误日志告警，当错误日志数量超过阈值时发送通知；响应时间告警，当 Agent 响应时间持续超过预期值时发送通知；资源使用告警，当 CPU 或内存使用率持续较高时发送通知。

除了系统级监控，还应该在应用层添加业务监控。例如记录关键操作的成功率、耗时分布、异常类型等。这些指标可以帮助您快速定位问题，了解系统的健康状况。

建议建立监控大盘，将关键指标可视化展示。这样团队成员可以直观地了解系统状态，在出现异常时快速响应。

## 故障排查指南

当生产环境出现问题时，需要快速定位原因并恢复服务。以下是一些常见问题的排查方法。

**部署失败**是最常见的问题。首先检查 Serverless Devs 的输出日志，通常会有明确的错误信息。常见原因包括权限不足、配置参数错误、代码依赖缺失等。可以使用 `s deploy --debug` 启用详细日志来获取更多信息。

**Agent 无法启动**通常是代码或环境配置问题。查看 SLS 日志中的错误信息，检查是否缺少环境变量、依赖包是否安装正确、代码是否有语法错误等。可以先在本地环境复现问题，修复后再重新部署。

**Agent 响应缓慢**可能是资源不足或代码性能问题。检查实例的 CPU 和内存使用率，如果接近上限，需要增加资源配置或优化代码。也可能是外部服务响应慢，检查网络连接和依赖服务的状态。

**网络连接问题**通常与 VPC 配置或安全组规则有关。确认交换机和安全组配置正确，出站规则允许访问目标服务的端口。如果需要访问公网，确保 `internetAccess` 设置为 `true`。

**日志无法收集**可能是日志配置或权限问题。确认 SLS 项目和日志库存在且名称正确，执行角色具有写入日志的权限。检查 RAM 角色的权限策略是否包含 `log:PostLogStoreLogs` 操作。

遇到无法解决的问题时，可以使用 `s info` 命令查看 Agent 的详细信息，包括当前状态、配置参数、错误信息等。这些信息对于问题排查很有帮助。

通过本章介绍的部署流程和最佳实践，您应该能够将 Agent 稳定地部署到生产环境，并通过合理的监控和运维策略保障服务的可靠性。