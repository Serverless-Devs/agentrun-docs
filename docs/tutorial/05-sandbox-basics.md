---
sidebar_position: 15
---

# 沙箱使用基础

沙箱是 AgentRun 提供的隔离执行环境，让 Agent 能够安全地执行代码、操作文件和控制浏览器。每个沙箱运行在独立的容器中，与其他环境完全隔离，确保了安全性和资源隔离。AgentRun 目前提供两类沙箱：代码解释器沙箱用于执行动态生成的代码，浏览器沙箱则提供完整的浏览器自动化能力。

## 代码解释器沙箱

代码解释器沙箱为 Agent 提供了执行 Python 和 Shell 代码的能力。这是构建数据分析、科学计算、文件处理等类型 Agent 的基础设施。沙箱提供了完整的 Linux 环境，预装了常用的科学计算库和工具。

### 创建和连接沙箱

使用代码解释器沙箱的第一步是创建沙箱模板。模板定义了沙箱的运行环境配置，包括 Python 版本、预装的依赖包、资源限制等。您可以在 AgentRun 控制台创建模板，或者通过 SDK 创建：

```python
from agentrun.sandbox import Sandbox, TemplateType

# 创建代码解释器沙箱
sandbox = Sandbox.create(
    template_type=TemplateType.CODE_INTERPRETER,
    template_name="my-code-sandbox",
    sandbox_idle_timeout_seconds=600
)

print(f"沙箱 ID: {sandbox.sandbox_id}")
print(f"状态: {sandbox.status}")
```

`sandbox_idle_timeout_seconds` 参数指定沙箱的空闲超时时间。超过这个时间没有操作，沙箱会自动停止以节省资源。对于需要长时间保持状态的场景，可以适当增大这个值。

沙箱创建后会自动启动，状态会从 Creating 变为 Running。如果您已经有一个正在运行的沙箱，可以通过 ID 连接到它：

```python
# 连接到已存在的沙箱
sandbox = Sandbox.connect(
    sandbox_id="existing-sandbox-id",
    template_type=TemplateType.CODE_INTERPRETER
)
```

连接沙箱不会创建新的实例，而是获取已存在沙箱的控制权。这在需要恢复之前的执行上下文时特别有用。

### 执行代码

代码执行是代码解释器沙箱的核心功能。SDK 提供了基于上下文的代码执行机制，每个上下文维护独立的变量空间和执行状态：

```python
# 创建执行上下文
context = sandbox.context.create(
    language="python",
    cwd="/home/user"
)

# 在上下文中执行代码
result = context.execute("""
import math
import datetime

# 计算圆的面积
radius = 5
area = math.pi * radius ** 2

# 获取当前时间
current_time = datetime.datetime.now()

print(f"半径为 {radius} 的圆面积: {area:.2f}")
print(f"当前时间: {current_time}")
""")

print("执行结果:")
print(result.get("stdout"))
```

执行结果包含标准输出、标准错误和退出码。如果代码抛出异常，异常信息会出现在标准错误中。上下文会保持执行状态，后续的代码可以访问之前定义的变量：

```python
# 继续在同一上下文中执行
result = context.execute("""
# 使用之前定义的 radius 变量
circumference = 2 * math.pi * radius
print(f"周长: {circumference:.2f}")
""")
```

这种机制使得 Agent 可以进行多步骤的代码执行，每一步都基于前一步的结果。例如，先加载数据，然后清洗数据，最后进行分析，每个步骤都在同一个上下文中进行。

对于需要异步执行的场景，可以使用异步版本的方法：

```python
import asyncio

async def run_analysis():
    sandbox = await Sandbox.create_async(
        template_type=TemplateType.CODE_INTERPRETER,
        template_name="my-code-sandbox"
    )
    
    context = await sandbox.context.create_async()
    
    # 并发执行多个分析任务
    tasks = [
        context.execute_async("result1 = 1 + 1"),
        context.execute_async("result2 = 2 + 2"),
        context.execute_async("result3 = 3 + 3")
    ]
    
    results = await asyncio.gather(*tasks)
    return results

results = asyncio.run(run_analysis())
```

### 文件操作

代码解释器沙箱提供了完整的文件系统操作能力。您可以在沙箱中读写文件、管理目录结构，以及在本地和沙箱之间传输文件。

读写文件是最基础的操作：

```python
# 写入文件
sandbox.file.write(
    path="/home/user/data.txt",
    content="这是测试数据\n第二行数据",
    encoding="utf-8"
)

# 读取文件
content = sandbox.file.read("/home/user/data.txt")
print(content)
```

对于需要从本地上传文件的场景，可以使用上传方法：

```python
# 上传本地文件到沙箱
sandbox.file_system.upload(
    local_file_path="/local/path/dataset.csv",
    target_file_path="/home/user/dataset.csv"
)

# 在沙箱中处理文件
context.execute("""
import pandas as pd

df = pd.read_csv('/home/user/dataset.csv')
print(f"数据集包含 {len(df)} 行")
print(df.head())
""")
```

处理完成后，可以将结果文件下载到本地：

```python
# 下载沙箱中的文件
sandbox.file_system.download(
    path="/home/user/result.csv",
    save_path="/local/path/result.csv"
)
```

文件系统操作还包括目录管理、文件移动、权限设置等功能：

```python
# 创建目录
sandbox.file_system.mkdir("/home/user/analysis")

# 列出目录内容
files = sandbox.file_system.list("/home/user")
for file in files:
    print(f"{file['name']}: {file['type']}")

# 移动文件
sandbox.file_system.move(
    source="/home/user/data.txt",
    destination="/home/user/analysis/data.txt"
)

# 获取文件信息
stat = sandbox.file_system.stat("/home/user/analysis/data.txt")
print(f"文件大小: {stat['size']} 字节")
print(f"修改时间: {stat['mtime']}")
```

### 案例：数据分析 Agent

让我们通过一个完整的例子来展示代码解释器沙箱的实际应用。这个数据分析 Agent 可以接收 CSV 数据文件，进行统计分析，并生成可视化报告：

```python
from agentrun.sandbox import Sandbox, TemplateType
from agentrun.integration.langchain import model, sandbox_toolset

# 创建沙箱
sandbox = Sandbox.create(
    template_type=TemplateType.CODE_INTERPRETER,
    template_name="data-analysis-sandbox",
    sandbox_idle_timeout_seconds=1800
)

# 上传数据文件
sandbox.file_system.upload(
    local_file_path="./sales_data.csv",
    target_file_path="/home/user/sales_data.csv"
)

# 创建执行上下文
context = sandbox.context.create()

# 安装分析所需的库（如果模板中未预装）
context.execute("""
import subprocess
subprocess.run(['pip', 'install', 'pandas', 'matplotlib', 'seaborn'])
""")

# 执行数据分析
analysis_code = """
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 加载数据
df = pd.read_csv('/home/user/sales_data.csv')

# 基础统计
stats = {
    'total_rows': len(df),
    'columns': list(df.columns),
    'summary': df.describe().to_dict()
}

# 生成可视化
plt.figure(figsize=(10, 6))
sns.barplot(data=df, x='category', y='sales')
plt.title('Sales by Category')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('/home/user/sales_chart.png')

print("分析完成")
print(f"数据集包含 {len(df)} 行，{len(df.columns)} 列")
"""

result = context.execute(analysis_code)
print(result.get("stdout"))

# 下载生成的图表
sandbox.file_system.download(
    path="/home/user/sales_chart.png",
    save_path="./sales_chart.png"
)

print("分析报告已生成: sales_chart.png")
```

这个 Agent 展示了沙箱的完整工作流：上传数据、执行分析代码、生成可视化、下载结果。整个过程在隔离的环境中进行，不会影响宿主系统，也不会被其他任务干扰。

在实际应用中，您可以将这个流程与 LLM 结合，让 Agent 根据用户的自然语言问题自动生成分析代码。例如，用户问"显示各个类别的销售额对比"，Agent 会理解需求，生成相应的 pandas 和 matplotlib 代码，在沙箱中执行，然后返回可视化结果。

## 浏览器沙箱

浏览器沙箱为 Agent 提供了完整的网页自动化能力。它基于 Chromium 浏览器和 Playwright 自动化框架，支持页面导航、元素操作、JavaScript 执行、截图录制等丰富功能。

### 创建和连接沙箱

浏览器沙箱的创建方式与代码解释器类似：

```python
from agentrun.sandbox import Sandbox, TemplateType

# 创建浏览器沙箱
sandbox = Sandbox.create(
    template_type=TemplateType.BROWSER,
    template_name="my-browser-sandbox",
    sandbox_idle_timeout_seconds=600
)

print(f"沙箱 ID: {sandbox.sandbox_id}")
```

浏览器沙箱启动后，会创建一个 Chromium 实例并等待连接。SDK 提供了两种使用浏览器的方式：通过 Playwright API 进行编程控制，或通过 CDP（Chrome DevTools Protocol）和 VNC 进行远程调试。

### 使用 Playwright 操作浏览器

Playwright 是 AgentRun 推荐的浏览器控制方式。SDK 提供了同步和异步两套 Playwright API 封装：

```python
# 获取 Playwright 同步客户端
browser = sandbox.sync_playwright()

# 打开浏览器并导航到网页
browser.open()
browser.goto("https://www.example.com")

# 等待页面加载
browser.wait(2000)  # 等待 2 秒

# 获取页面内容
html = browser.html_content()
print(html)
```

Playwright 提供了丰富的页面操作方法。您可以点击元素、填写表单、提取内容等：

```python
# 填写搜索表单
browser.fill("input[name='search']", "AgentRun")
browser.click("button[type='submit']")

# 等待结果加载
browser.wait(3000)

# 提取搜索结果
results = browser.evaluate("""
() => {
    const items = document.querySelectorAll('.result-item');
    return Array.from(items).map(item => ({
        title: item.querySelector('h3').textContent,
        link: item.querySelector('a').href
    }));
}
""")

for result in results:
    print(f"{result['title']}: {result['link']}")
```

`evaluate` 方法允许在页面上下文中执行 JavaScript 代码，这是提取动态内容和与网页交互的强大工具。

对于需要异步执行的场景，可以使用异步版本：

```python
import asyncio

async def scrape_website():
    sandbox = await Sandbox.create_async(
        template_type=TemplateType.BROWSER,
        template_name="my-browser-sandbox"
    )
    
    browser = sandbox.async_playwright()
    await browser.open()
    
    # 访问多个页面
    urls = [
        "https://example1.com",
        "https://example2.com",
        "https://example3.com"
    ]
    
    for url in urls:
        await browser.goto(url)
        await browser.wait(2000)
        html = await browser.html_content()
        print(f"抓取 {url}: {len(html)} 字符")
    
    await browser.close()

asyncio.run(scrape_website())
```

### 截图和录制

浏览器沙箱支持截图和视频录制功能，这在调试和监控自动化任务时非常有用：

```python
# 获取启用录制的浏览器客户端
browser = sandbox.sync_playwright(record=True)
browser.open()

# 执行一系列操作
browser.goto("https://www.example.com")
browser.click("a.more-info")
browser.wait(2000)

# 截图
screenshot_data = browser.screenshot(full_page=True)
with open("screenshot.png", "wb") as f:
    f.write(screenshot_data)

# 关闭浏览器后，录制会自动保存
browser.close()

# 列出所有录制文件
recordings = sandbox.list_recordings()
for rec in recordings:
    print(f"录制文件: {rec['filename']}, 大小: {rec['size']}")

# 下载录制
if recordings:
    sandbox.download_recording(
        filename=recordings[0]['filename'],
        save_path="./browser_session.mkv"
    )
```

录制功能会记录整个浏览器操作过程，生成视频文件。这对于审计自动化任务、调试问题或展示 Agent 的工作过程都很有价值。

### 案例：网页爬虫 Agent

让我们构建一个能够自动浏览网页并提取信息的爬虫 Agent。这个 Agent 可以处理动态加载的内容，填写表单，并智能地提取所需数据：

```python
from agentrun.sandbox import Sandbox, TemplateType

class WebScraperAgent:
    def __init__(self):
        self.sandbox = Sandbox.create(
            template_type=TemplateType.BROWSER,
            template_name="scraper-sandbox"
        )
        self.browser = self.sandbox.sync_playwright()
        self.browser.open()
    
    def search_and_extract(self, keyword: str):
        """在搜索引擎中搜索关键词并提取结果"""
        # 访问搜索引擎
        self.browser.goto("https://www.google.com")
        
        # 填写搜索框
        self.browser.fill("input[name='q']", keyword)
        self.browser.click("input[type='submit']")
        
        # 等待结果加载
        self.browser.wait(3000)
        
        # 提取搜索结果
        results = self.browser.evaluate("""
        () => {
            const items = document.querySelectorAll('div.g');
            return Array.from(items).slice(0, 10).map(item => {
                const title = item.querySelector('h3');
                const link = item.querySelector('a');
                const snippet = item.querySelector('.VwiC3b');
                
                return {
                    title: title ? title.textContent : '',
                    url: link ? link.href : '',
                    snippet: snippet ? snippet.textContent : ''
                };
            });
        }
        """)
        
        return results
    
    def visit_and_analyze(self, url: str):
        """访问页面并分析内容"""
        self.browser.goto(url)
        self.browser.wait(2000)
        
        # 获取页面元数据
        metadata = self.browser.evaluate("""
        () => {
            return {
                title: document.title,
                description: document.querySelector('meta[name="description"]')?.content,
                keywords: document.querySelector('meta[name="keywords"]')?.content,
                headings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.textContent),
                links: Array.from(document.querySelectorAll('a')).length,
                images: Array.from(document.querySelectorAll('img')).length
            };
        }
        """)
        
        # 截图保存
        screenshot = self.browser.screenshot()
        
        return {
            'metadata': metadata,
            'screenshot': screenshot
        }
    
    def close(self):
        self.browser.close()

# 使用示例
agent = WebScraperAgent()

# 搜索关键词
results = agent.search_and_extract("AgentRun platform")
print(f"找到 {len(results)} 条结果")

for i, result in enumerate(results, 1):
    print(f"\n{i}. {result['title']}")
    print(f"   URL: {result['url']}")
    print(f"   摘要: {result['snippet'][:100]}...")

# 分析第一个结果
if results:
    analysis = agent.visit_and_analyze(results[0]['url'])
    print(f"\n页面分析:")
    print(f"标题: {analysis['metadata']['title']}")
    print(f"描述: {analysis['metadata']['description']}")
    print(f"包含 {analysis['metadata']['links']} 个链接")
    print(f"包含 {analysis['metadata']['images']} 张图片")

agent.close()
```

这个爬虫 Agent 展示了浏览器沙箱的强大能力。它可以处理 JavaScript 渲染的动态内容，执行复杂的页面交互，并提取结构化数据。结合 LLM，Agent 可以根据用户的自然语言指令生成相应的抓取脚本，实现真正的智能爬虫。

在实际应用中，您可以扩展这个 Agent 的能力。例如，添加登录功能来访问需要认证的网站；实现分页处理来抓取大量数据；集成代理池来应对反爬虫机制；或者使用机器学习模型来智能识别页面结构。浏览器沙箱为这些高级功能提供了坚实的基础。

沙箱的使用显著扩展了 Agent 的能力边界。通过代码执行和浏览器控制，Agent 不再局限于文本对话，而是可以完成真实世界中的复杂任务。无论是数据处理、科学计算，还是网页自动化、信息抓取，沙箱都提供了安全可靠的执行环境。