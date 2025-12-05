---
sidebar_position: 160
---


# AgentRun Sandbox 自定义镜像最佳实践

## 一、为什么需要自定义镜像

AgentRun 平台提供的标准 Sandbox 镜像（代码解释器、浏览器工具）覆盖了大部分通用场景，但随着业务深入，越来越多的用户需要特定的运行环境。比如量化交易团队需要专业的金融分析库，AI 团队需要深度学习框架，自动化测试团队需要特定版本的测试工具。直接修改或重新构建镜像会破坏 AgentRun 平台的数据链路接口，导致 Sandbox 无法正常工作。因此，正确的做法是基于官方镜像进行扩展，在保留核心功能的基础上添加自定义能力。

## 二、官方基础镜像

```yaml
# 代码解释器镜像
code-interpreter:
  - serverless-registry.cn-hangzhou.cr.aliyuncs.com/functionai/sandbox-code_interpreter_dev:v0.3.2
  
# 浏览器工具镜像  
browsertool:
  - serverless-registry.cn-hangzhou.cr.aliyuncs.com/functionai/sandbox-browsertool_dev:v0.7.6
```

## 三、创建自定义镜像

### 3.1 基于代码解释器扩展

假设您需要添加数据科学相关的工具包：

```dockerfile
# Dockerfile
FROM serverless-registry.cn-hangzhou.cr.aliyuncs.com/functionai/sandbox-code_interpreter_dev:v0.3.2

# 安装额外的 Python 包
RUN pip install --no-cache-dir \
    pandas==2.0.0 \
    numpy==1.24.0 \
    scikit-learn==1.3.0 \
    matplotlib==3.7.0

# 如果需要系统级依赖
RUN apt-get update && apt-get install -y \
    libgomp1 \  # 某些科学计算库需要
    && rm -rf /var/lib/apt/lists/*

# 添加您的自定义代码（可选）
COPY my_utils/ /app/my_utils/
```

### 3.2 基于浏览器工具扩展

假设您需要添加网页自动化相关的工具：

```dockerfile
# Dockerfile
FROM serverless-registry.cn-hangzhou.cr.aliyuncs.com/functionai/sandbox-browsertool_dev:v0.7.6

# 安装额外的 Node.js 包
RUN npm install -g \
    cheerio \
    playwright \
    @playwright/test

# 安装 Python 爬虫库（如果需要）
RUN pip install --no-cache-dir \
    beautifulsoup4 \
    scrapy \
    selenium
```

## 四、关键注意事项

### 绝对不要修改的内容

```yaml
保留项:
  目录结构:
    - /app/handler.py      # 主处理器
    - /app/api/            # API 接口
    - /app/config/         # 配置文件
  
  环境变量:
    - FC_* 开头的所有变量
    - SANDBOX_* 开头的所有变量
  
  启动命令:
    - 不要覆盖 ENTRYPOINT
    - 不要修改 CMD
```

### 可以安全添加的内容

- 新的 Python/Node.js 依赖包
- 系统工具和库
- 自定义目录（避开 `/app/api`、`/app/config`）
- 新的环境变量（使用自己的前缀）

## 五、构建和测试

### 5.1 构建镜像

```bash
# 构建镜像
docker build -t my-custom-sandbox:latest .

# 验证镜像层（确保基础镜像在最底层）
docker history my-custom-sandbox:latest
```

### 5.2 本地测试

```bash
# 运行容器
docker run -d \
  --name test-sandbox \
  -p 9000:9000 \
  my-custom-sandbox:latest

# 测试基础功能是否正常
curl http://localhost:9000/health

# 如果返回 200 状态码，说明核心功能正常
```

### 5.3 简单验证脚本

```python
# test.py
import requests

# 测试核心 API 是否正常
response = requests.get("http://localhost:9000/health")
if response.status_code == 200:
    print("核心功能正常")
else:
    print("核心功能异常，请检查是否破坏了数据链路")
```

## 六、推送镜像并使用

### 6.1 推送到阿里云容器镜像服务（ACR）

```bash
# 1. 登录 ACR
docker login --username=<您的用户名> registry.cn-hangzhou.aliyuncs.com

# 2. 打标签（使用您的命名空间）
docker tag my-custom-sandbox:latest \
  registry.cn-hangzhou.aliyuncs.com/<您的命名空间>/custom-sandbox:v1.0

# 3. 推送
docker push registry.cn-hangzhou.aliyuncs.com/<您的命名空间>/custom-sandbox:v1.0
```

### 6.2 在 AgentRun 中使用

在 AgentRun 平台创建 Sandbox 时：
1. 选择 "自定义镜像" 选项
2. 填入您的镜像地址：`registry.cn-hangzhou.aliyuncs.com/<您的命名空间>/custom-sandbox:v1.0`
3. 完成创建

<img alt="image" src="https://github.com/user-attachments/assets/3fe1a326-5aac-48bc-a899-54cca53f3257" />


## 七、实际案例

### 案例1：金融数据分析环境

```dockerfile
FROM serverless-registry.cn-hangzhou.cr.aliyuncs.com/functionai/sandbox-code_interpreter_dev:v0.3.2

# 金融数据分析包
RUN pip install --no-cache-dir \
    yfinance \           # 获取金融数据
    ta-lib \             # 技术分析
    quantlib \           # 量化金融
    pandas-datareader    # 数据读取
```

### 案例2：机器学习开发环境

```dockerfile
FROM serverless-registry.cn-hangzhou.cr.aliyuncs.com/functionai/sandbox-code_interpreter_dev:v0.3.2

# ML/DL 框架
RUN pip install --no-cache-dir \
    torch==2.0.0 \
    transformers==4.30.0 \
    langchain==0.0.200 \
    openai==1.0.0
```

### 案例3：Web自动化测试环境

```dockerfile
FROM serverless-registry.cn-hangzhou.cr.aliyuncs.com/functionai/sandbox-browsertool_dev:v0.7.6

# 自动化测试工具
RUN npm install -g \
    puppeteer \
    cypress \
    testcafe
    
# 安装中文字体（用于截图）
RUN apt-get update && apt-get install -y \
    fonts-wqy-microhei \
    fonts-wqy-zenhei \
    && rm -rf /var/lib/apt/lists/*
```

## 八、常见问题

**Q: 为什么不能从头构建镜像？**  
A: 官方镜像包含与 AgentRun 平台通信的专有接口和配置，从头构建会丢失这些关键组件。

**Q: 如何知道是否破坏了核心功能？**  
A: 运行容器后，如果 `/health` 接口返回非 200 状态码，说明核心功能被破坏。

**Q: 可以修改 Python 版本吗？**  
A: 不建议。修改 Python 版本可能导致核心依赖不兼容。

**Q: 镜像太大怎么办？**  
A: 1) 使用 `--no-cache-dir` 安装包  2) 清理 apt 缓存  3) 使用多阶段构建

---

**核心要点**：基于官方镜像扩展，只添加不修改，测试验证后推送 ACR，在 AgentRun 选择自定义镜像即可使用。
