---
sidebar_position: 19
---

# 最佳实践案例：构建舆情分析系统

本章通过一个完整的舆情分析系统案例，展示 AgentRun SDK 在实际项目中的应用。该系统实现了从数据收集、深度分析到报告生成的完整流程，并提供了流式输出、多沙箱管理、智能探索等高级特性。

> 目前该代码已经发布到 Serverless Registry，可以通过 Serverless Devs 工具进行下载：`s init opinion_analysis`

## 系统概述

这个舆情分析系统的核心目标是自动化地监测和分析网络舆情。系统接收用户提供的关键词，自动在多个平台搜索相关信息，使用浏览器沙箱深度抓取内容，通过 AI 进行情感分析和趋势预测，最终生成专业的可视化报告。整个过程通过 Server-Sent Events 实时推送状态更新，让用户可以实时观察分析进展。

系统采用代码控制流程的设计理念，将整个分析任务拆解为明确的阶段：数据收集、数据分析、报告撰写、HTML 渲染。每个阶段由专门的工具函数实现，Agent 只负责按顺序调用这些工具，而不是让 LLM 自主决策流程。这种设计保证了流程的可控性和稳定性。

## 架构设计

系统基于 FastAPI 构建 HTTP 服务，使用 PydanticAI 作为 Agent 框架，集成 AgentRun 的浏览器沙箱能力。核心架构包含三个层次：HTTP 层处理前端请求和 SSE 通信，Agent 层控制分析流程和工具调用，工具层实现具体的数据操作。

HTTP 层的设计采用异步流式响应。当收到分析请求时，系统立即返回一个 SSE 连接，然后在后台启动 Agent 任务。Agent 执行过程中的所有状态变化都通过事件队列实时推送到前端，前端可以展示进度条、日志输出、中间结果等信息。这种设计让用户能够清楚地了解系统正在做什么，即使分析过程需要几分钟时间也不会感到焦虑。

```python
@app.post("/api/agent")
async def agent_endpoint(request: Request):
    body = await request.json()
    run_input = RunAgentInput.model_validate(body)
    run_id = run_input.run_id
    
    # 获取事件队列
    queue = event_manager.get_queue(run_id)
    
    async def event_generator():
        # 发送开始事件
        yield f"data: {json.dumps({'type': 'RUN_STARTED', 'runId': run_id})}\n\n"
        
        # 后台启动 Agent
        agent_task = asyncio.create_task(run_agent_in_background(run_input, deps, run_id))
        
        # 消费事件队列
        while not agent_task.done():
            try:
                event = queue.get_nowait()
                yield f"data: {json.dumps(event.model_dump())}\n\n"
            except asyncio.QueueEmpty:
                await asyncio.sleep(0.1)
        
        # 发送完成事件
        yield f"data: {json.dumps({'type': 'RUN_FINISHED', 'runId': run_id})}\n\n"
    
    return StreamingResponse(event_generator(), media_type="text/event-stream")
```

Agent 层使用 PydanticAI 框架，定义了严格的工具调用顺序。系统提示词明确指示 Agent 必须按照收集数据、分析数据、撰写报告、渲染 HTML 的顺序执行，不允许跳过步骤或改变顺序。这种设计避免了 LLM 的不确定性带来的问题。

```python
opinion_agent = Agent(
    agentrun_model,
    deps_type=StateDeps,
    system_prompt="""你是舆情分析系统的执行者。

你的任务是按照以下严格流程执行舆情分析：

1. 收到关键词后，调用 collect_data 工具收集数据
2. 数据收集完成后，调用 analyze_data 工具分析数据
3. 分析完成后，调用 write_report 工具撰写报告
4. 报告完成后，调用 render_html 工具生成 HTML

必须按顺序调用工具，每个工具只调用一次，不要跳过任何步骤。""",
    retries=3,
)
```

## 多沙箱管理策略

浏览器沙箱是系统的核心资源，用于模拟真实浏览器访问网页和提取内容。系统实现了完善的多沙箱管理机制，支持创建、复用、销毁和自动恢复。

沙箱管理使用全局字典存储所有活跃的沙箱实例，每个沙箱通过唯一的 sandbox_id 标识。系统提供了创建新沙箱、获取可用沙箱、移除沙箱等基础操作，并通过异步锁保证线程安全。

```python
_sandboxes: Dict[str, BrowserSandbox] = {}
_sandbox_lock = asyncio.Lock()

async def create_browser_sandbox() -> Optional[BrowserSandbox]:
    async with _sandbox_lock:
        sandbox = await Sandbox.create_async(
            template_type=TemplateType.BROWSER,
            template_name=agentrun_browser_sandbox_name,
        )
        _sandboxes[sandbox.sandbox_id] = sandbox
        return sandbox

async def get_browser_sandbox(sandbox_id: str = None) -> Optional[BrowserSandbox]:
    async with _sandbox_lock:
        if sandbox_id and sandbox_id in _sandboxes:
            return _sandboxes[sandbox_id]
        
        # 返回任意可用沙箱
        for sid, sandbox in _sandboxes.items():
            return sandbox
        
        # 没有可用沙箱时创建新的
        return await create_browser_sandbox()
```

系统实现了智能的错误恢复机制。当检测到沙箱已关闭的错误时，会自动创建新的沙箱替换失效的实例。这个机制通过解析错误消息判断是否是沙箱关闭导致的异常，如果是则触发重建流程。

```python
async def recreate_sandbox_if_closed(sandbox_id: str, error_message: str):
    closed_error_patterns = [
        "Target page, context or browser has been closed",
        "Browser has been closed",
        "Session closed",
    ]
    
    is_closed_error = any(pattern.lower() in error_message.lower() 
                         for pattern in closed_error_patterns)
    
    if is_closed_error:
        await remove_sandbox(sandbox_id)
        new_sandbox = await create_browser_sandbox()
        return new_sandbox
    
    return None
```

在数据收集过程中，系统会持续监控沙箱状态。一旦捕获到异常，首先尝试判断是否是沙箱关闭错误，如果是则重建沙箱并重新连接 Playwright。这种设计保证了即使沙箱意外失效，任务也能自动恢复继续执行。

## 智能内容抓取

数据收集是舆情分析的基础。系统通过多层次的抓取策略来获取高质量数据。首先使用必应搜索 API 进行关键词搜索，获取搜索结果的标题、摘要和链接。然后对高相关性的结果进行深度抓取，使用 Playwright 访问原始页面提取完整内容。

搜索策略采用多角度查询。系统根据关键词生成多组搜索查询，包括基础搜索、平台特定搜索、时效性搜索、观点类搜索等。不同类型的查询用于获取不同维度的信息，综合起来形成全面的数据视图。

```python
def generate_search_queries(keyword: str) -> List[Dict[str, str]]:
    queries = []
    
    # 基础搜索
    queries.extend([
        {"query": f"{keyword}", "category": "general"},
        {"query": f"{keyword} 最新消息", "category": "general"},
    ])
    
    # 知乎搜索
    queries.extend([
        {"query": f"{keyword} 知乎", "category": "zhihu"},
        {"query": f"{keyword} 如何评价 知乎", "category": "zhihu"},
    ])
    
    # 微博搜索
    queries.extend([
        {"query": f"{keyword} 微博", "category": "weibo"},
        {"query": f"{keyword} 微博热搜", "category": "weibo"},
    ])
    
    # 新闻、评论、B站等其他类别...
    
    return queries
```

相关性评估是数据质量控制的关键环节。系统对每个搜索结果计算相关性得分，只保留得分超过阈值的结果。评估考虑关键词匹配度、时效性、舆情相关性、平台来源等多个因素。这个机制有效过滤了广告、无关内容和低质量页面。

深度抓取使用 Playwright 访问原始页面，根据不同平台使用不同的内容提取策略。知乎提取问题描述和回答内容，微博提取微博正文，B站提取视频描述和评论，新闻网站提取文章正文。系统针对每个平台的页面结构编写了专门的选择器规则，确保能够准确提取核心内容。

```python
if "zhihu.com" in url:
    content_selectors = [
        ".QuestionRichText",
        ".RichContent-inner",
        ".Post-RichText",
    ]
    for sel in content_selectors:
        elems = await detail_page.query_selector_all(sel)
        for elem in elems[:3]:
            text = await elem.inner_text()
            if text and len(text) > 50:
                detailed_content += text[:1000] + "\n\n"
```

系统还实现了 LLM 辅助的智能探索机制。对于已经打开的页面，系统会询问 LLM 是否需要进一步探索（如点击评论区、查看更多回复等）。LLM 根据当前页面内容、搜索关键词、已获取的信息量等因素做出决策。这种设计在深度和效率之间取得了平衡，避免了盲目抓取所有可能的内容。

```python
async def llm_decide_exploration(keyword, page_url, page_content, source, available_actions):
    prompt = f"""根据以下信息决定是否需要进一步探索页面：

【关键词】{keyword}
【当前页面】{page_url}
【已获取内容】{page_content[:500]}
【可用操作】{available_actions}

如果当前内容已经足够丰富，可能不需要进一步探索。
如果是微博/B站等平台，评论区通常包含重要舆情信息。

返回 JSON: {{"should_explore": true/false, "action": "操作名", "reason": "原因"}}
"""
    
    result = await explorer.run(prompt)
    return json.loads(result.output)
```

## 流式分析输出

数据分析和报告生成是计算密集型任务，可能需要较长时间。系统使用流式输出让用户能够实时看到进展，而不是等待所有工作完成。

流式输出的核心是 PydanticAI 的 `run_stream` API。这个 API 返回一个异步生成器，可以逐 token 地获取模型输出。系统在生成过程中定期检查内容增量，当累积一定字符数或经过一定时间后，就将当前状态推送到前端。

```python
async with analyzer.run_stream(analysis_prompt) as result:
    response_text = ""
    last_length = 0
    last_time = asyncio.get_event_loop().time()
    
    async for text in result.stream_text():
        response_text = text
        current_time = asyncio.get_event_loop().time()
        content_delta = len(response_text) - last_length
        time_delta = current_time - last_time
        
        # 每 200 字符或每 0.5 秒更新一次
        if content_delta >= 200 or (content_delta > 0 and time_delta >= 0.5):
            state.analysis_progress = f"正在分析中... ({len(response_text)} 字)\n"
            await push_state_event(run_id, state)
            last_length = len(response_text)
            last_time = current_time
```

状态推送通过事件队列实现。每个分析任务有独立的事件队列，工具函数执行过程中可以随时向队列推送状态更新事件。HTTP 层的 SSE 连接持续消费这个队列，将事件转换为 SSE 消息发送给前端。

```python
async def push_state_event(run_id: str, state: OpinionState):
    event = StateSnapshotEvent(
        type=EventType.STATE_SNAPSHOT,
        snapshot=state.model_dump(),
        timestamp=int(time.time() * 1000)
    )
    await event_manager.push_event(run_id, event)
```

报告撰写使用相同的流式机制。系统使用更细的粒度控制，每 100 字符或每 0.3 秒推送一次更新，让用户可以看到报告文本逐步生成的过程。这种实时反馈显著改善了用户体验，即使完整报告需要几分钟才能生成，用户也不会觉得系统无响应。

## 数据质量控制

高质量的数据是准确分析的前提。系统在多个环节实施质量控制，确保最终使用的数据与关键词高度相关且内容有价值。

相关性评分是第一道关卡。系统实现了严格的评分算法，要求关键词必须在标题或摘要中出现，否则直接判定为不相关。对于中文关键词，还会检查结果是否包含中文内容，避免返回无关的英文结果。评分考虑关键词完全匹配、部分匹配、时效性关键词、舆情关键词、平台来源等多个维度。

```python
async def evaluate_relevance(keyword: str, title: str, snippet: str) -> float:
    text = f"{title} {snippet}"
    text_lower = text.lower()
    
    # 检测语言匹配
    has_chinese_keyword = any('\u4e00' <= char <= '鿿' for char in keyword)
    result_has_chinese = any('一' <= char <= '鿿' for char in text)
    
    if has_chinese_keyword and not result_has_chinese:
        return 0.0
    
    score = 0.0
    
    # 关键词完全匹配
    if keyword in text:
        score += 0.6
    else:
        # 部分匹配检查，匹配率低于 50% 则返回 0
        # ...
        
    # 时效性加分
    time_keywords = ["最新", "今日", "近日", "2024", "2025"]
    if any(tk in text for tk in time_keywords):
        score += 0.1
    
    # 舆情相关性加分
    opinion_keywords = ["评价", "评论", "看法", "观点", "讨论"]
    if any(ok in text for ok in opinion_keywords):
        score += 0.1
    
    return max(0.0, min(1.0, score))
```

系统还实现了动态质量监控机制。在搜索过程中，系统跟踪每个搜索类别的效果。如果某个类别连续多次返回低相关性结果，系统会自动跳过该类别后续的查询，避免浪费时间在低效的搜索路径上。

```python
category_low_relevance_count: Dict[str, int] = {}
skipped_categories: set = set()

# 检查该类别是否已被跳过
if category in skipped_categories:
    continue

# 统计低相关性结果
if new_results_in_query == 0 and low_relevance_in_query > 3:
    category_low_relevance_count[category] += 1
    if category_low_relevance_count[category] >= max_low_relevance_per_category:
        skipped_categories.add(category)
```

数据去重确保不会重复收集相同的内容。系统使用集合记录已访问的 URL，在处理新结果前检查 URL 是否已存在。这个简单但有效的机制避免了重复抓取和数据冗余。

## 错误处理与恢复

分布式系统中错误不可避免，完善的错误处理是系统稳定性的保障。舆情分析系统实现了多层次的错误处理和自动恢复机制。

沙箱错误是最常见的问题之一。浏览器沙箱可能因为超时、资源限制或其他原因意外关闭。系统通过解析异常消息识别沙箱关闭错误，一旦检测到就立即创建新的沙箱实例替换。整个过程对用户透明，只会在日志中显示沙箱重建的提示。

网络错误通过重试机制处理。搜索和页面访问都设置了合理的超时时间，超时后会记录日志但继续处理其他任务。系统不会因为个别页面访问失败而中断整个流程，而是尽可能收集更多可用数据。

```python
try:
    await page.goto(search_url, timeout=30000)
    await page.wait_for_load_state("domcontentloaded")
except Exception as e:
    error_msg = str(e)
    
    # 检测是否是沙箱关闭错误
    new_sandbox = await recreate_sandbox_if_closed(sandbox.sandbox_id, error_msg)
    if new_sandbox:
        sandbox = new_sandbox
        # 重新连接浏览器
        browser = await playwright.chromium.connect_over_cdp(sandbox.get_cdp_url())
        context = browser.contexts[0]
        page = context.pages[0]
        continue
```

LLM 调用失败通过降级策略处理。分析和报告生成都依赖 LLM，如果调用失败系统会使用预定义的模板或算法生成结果。虽然质量可能不如 LLM 生成的版本，但能保证任务完成并给用户一个基本可用的结果。

```python
try:
    async with analyzer.run_stream(analysis_prompt) as result:
        # 流式获取分析结果
        pass
except Exception as e:
    # 使用默认值
    state.analysis = AnalysisResult(
        keywords=[state.keyword],
        sentiment_score=0,
        sentiment_distribution={"正面": 33, "中性": 34, "负面": 33},
    )
```

状态同步确保前端始终能获取最新信息。即使某个环节出错，系统也会推送包含错误信息的状态更新，让用户了解发生了什么问题。这种设计避免了前端长时间等待却得不到任何反馈的糟糕体验。

## 性能优化实践

舆情分析涉及大量的网络请求和计算任务，性能优化对用户体验至关重要。系统在多个方面进行了优化。

异步并发是性能提升的关键。虽然搜索查询是顺序执行的，但在深度抓取阶段系统可以并发处理多个页面。通过 asyncio.gather 同时打开多个页面提取内容，显著减少了总耗时。

```python
# 并发深度抓取
tasks = []
for url in high_relevance_urls[:5]:
    tasks.append(extract_detailed_content(url))

results = await asyncio.gather(*tasks, return_exceptions=True)
```

沙箱复用减少了创建销毁的开销。数据收集过程创建一个沙箱后会持续使用，直到任务结束才销毁。这避免了频繁创建沙箱带来的延迟和资源消耗。

早期过滤减少了无效处理。系统在多个阶段进行过滤：搜索结果级别的相关性评估、URL 去重、平台类别动态跳过。这些机制确保系统只对高价值的数据进行深度处理，避免在低质量内容上浪费资源。

流式输出本身也是一种性能优化。虽然完整的分析需要几分钟，但用户可以在几秒内就看到初步结果和进展信息。这种即时反馈让用户感知上的等待时间大大缩短。

## 总结

这个舆情分析系统展示了如何使用 AgentRun SDK 构建复杂的生产级应用。通过代码控制流程、多沙箱管理、智能内容抓取、流式输出、数据质量控制、错误恢复等机制的综合运用，系统实现了稳定、高效、用户体验良好的自动化舆情分析能力。

关键经验包括：使用明确的工具序列而不是让 LLM 自由决策，实现完善的错误检测和自动恢复，通过流式输出保持与用户的实时交互，建立多层次的数据质量控制体系。这些实践不仅适用于舆情分析，也可以推广到其他需要 Agent 进行复杂任务处理的场景。

在实际部署时，还需要考虑更多工程因素：日志和监控的完善性、成本控制、并发限制、数据存储、用户权限管理等。但核心的架构设计和最佳实践已经在这个案例中得到充分体现，可以作为构建类似系统的参考基础。

------

为了便于大家进行快速体验，可以通过 AgentRun 控制台探索页面进行快速体验

- 访问[AgentRun 探索页面](https://functionai.console.aliyun.com/cn-hangzhou/agent/explore): 

<img src="https://github.com/user-attachments/assets/35bbef8c-0863-47f4-8e68-f2d6972a7ac2" />

- 按照要求，填写模型和沙箱信息：

<img src="https://github.com/user-attachments/assets/0e875d1c-eb1c-46b2-965e-2905415fecf2" />

- 进行 Agent 创建：

<img src="https://github.com/user-attachments/assets/7bde3b80-1440-4793-a1e7-24521dd26447" />

- 访问创建后的 Agent 进行体验

<img src="https://github.com/user-attachments/assets/e581288b-a6dd-4b1b-9385-3d96b2eb4d73" />

<img src="https://github.com/user-attachments/assets/ad041c87-f1ba-492f-a23c-ae207d22e905" />

<img src="https://github.com/user-attachments/assets/7c57170e-9bbd-43be-b6b5-11ae14a07a18" />


