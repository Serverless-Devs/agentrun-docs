---
sidebar_position: 20
---

# 最佳实践案例：通过 A2A 构建多 Agent 协作系统

<img src="https://github.com/user-attachments/assets/74590185-e734-4a0b-ab2f-9ea1af236837" />


> 目前该代码已经发布到 Serverless Registry，可以通过 Serverless Devs 工具进行下载：`s init buy-me-a-coffee`


## 案例概述

本案例展示了如何使用 AgentRun 和 Google ADK 构建一个完整的多 Agent 协作系统。该系统模拟了一个智能咖啡订购平台，包含日常助手、咖啡订购和配送服务三个独立的 Agent，它们通过 A2A（Agent-to-Agent）协议进行通信和协作。

整个系统的设计遵循微服务架构理念，每个 Agent 负责特定的业务领域，既可以独立部署运行，也可以统一部署在一个进程中。这种架构模式具有良好的可扩展性和维护性，是构建企业级 AI 应用的最佳实践。

## 架构设计

系统采用分层架构，自下而上分为数据层、服务层、Agent 层和网关层。数据层使用 SQLite 数据库存储咖啡商品和订单信息，每个业务领域维护独立的数据库文件。服务层提供 RESTful API 接口，封装数据库操作并对外提供标准的 HTTP 服务。Agent 层基于 Google ADK 框架实现，每个 Agent 封装特定的业务逻辑，并通过工具函数调用服务层接口。网关层作为系统的统一入口，负责路由用户请求到相应的 Agent，并管理 Agent 间的协作。

系统中的三个核心 Agent 各司其职。日常助手 Agent 提供天气查询、时间管理、提醒和日程安排等基础功能，这些功能通过内存数据结构实现，无需持久化存储。咖啡店 Agent 负责咖啡订购业务，包括菜单展示、商品搜索、订单创建和状态查询，所有操作通过 HTTP 请求调用咖啡店后端 API 完成。配送 Agent 专注于配送服务，支持创建配送单、查询配送状态和更新配送进度，同样通过 HTTP 调用配送服务 API。

Agent 间的通信采用两种机制。日常助手直接集成在网关层，作为本地子 Agent 运行。咖啡店和配送 Agent 则独立部署，通过 A2A 协议暴露服务，网关层通过 RemoteA2aAgent 与它们通信。这种混合架构既保证了核心功能的响应速度，又提供了业务模块的独立性和可扩展性。

<img width="1622" height="836" alt="image" src="https://github.com/user-attachments/assets/de002660-4299-41b0-bb25-178e87533cd2" />


## Google ADK 框架深度解析

### ADK 核心概念

Google ADK（Agent Development Kit）是一个用于构建智能 Agent 的框架。它的核心理念是将 Agent 抽象为可组合的模块，每个 Agent 包含模型、工具、子 Agent 和系统指令四个基本要素。

模型是 Agent 的推理引擎，负责理解用户意图和生成响应。在本案例中，所有 Agent 都使用 AgentRun 提供的模型，通过以下方式创建：

```python
from agentrun.integration.google_adk import model

MODEL_NAME = "qwen-max"
AGENTRUN_MODEL_NAME = "my-model-service"
DEFAULT_LLM = model(AGENTRUN_MODEL_NAME, model=MODEL_NAME)
```

这段代码展示了 AgentRun 与 Google ADK 的集成。`model` 函数接收两个参数：`AGENTRUN_MODEL_NAME` 是在 AgentRun 平台上创建的模型服务或代理名称，`model` 参数指定具体要调用的模型（如 qwen-max、gpt-4 等）。函数返回一个 ADK 兼容的模型对象，可以直接传递给 Agent 的 `model` 参数。

工具是 Agent 与外部世界交互的接口。ADK 要求工具必须是 Python 函数，函数签名和文档字符串会被自动解析为工具描述。以咖啡店的菜单查询工具为例：

```python
def tool_get_menu(category: str = None) -> dict:
    """
    获取希希咖啡店的菜单

    调用 API: GET /api/coffee/products

    Args:
        category: 商品分类，可选值：经典咖啡、特调饮品、甜点。不指定则返回全部菜单

    Returns:
        菜单信息，按分类整理
    """
    return tools.get_menu(category)
```

这个函数的文档字符串非常详细，说明了函数的用途、对应的 API 接口、参数含义和返回值格式。ADK 的模型会读取这些信息，理解工具的功能并在合适的时候调用。参数类型注解（`category: str`）和默认值（`= None`）也会被解析，帮助模型理解参数是否必填。

### Agent 的创建和配置

创建一个 Agent 需要指定名称、模型、描述、系统指令和工具列表。咖啡店 Agent 的完整定义如下：

```python
coffee_agent = Agent(
    name="coffee_agent",
    model=DEFAULT_LLM,
    description="希希咖啡店智能服务，可以帮助点咖啡和查询订单",
    instruction="""
你是"希希咖啡"智能服务（Root Agent），管理两个子助手：下单助手（order_agent）与查询助手（query_agent）。请遵守下列规则并用中文与顾客交互，语气热情且简洁。

重要行为规则（必须遵守）：
- 每次用户询问"订单状态/我的咖啡做好了么/订单进度"等相关问题时，必须发起真实的后端查询调用：
    - 若用户提供了订单号，**必须**调用 `tool_query_order(order_id)` 并使用该工具的返回结果构建回复；不可仅凭上下文或记忆直接回答。
    - 若用户未提供订单号，**必须**调用 `tool_get_recent_orders(limit=5)`，把最近订单列表返回给用户并在必要时提示用户选择或提供订单号；不可跳过该步骤。
- 禁止在未调用上述工具的情况下就断定或推测订单状态。每一次用户的"我的咖啡做好了么"都要触发后端查询（不使用缓存结果来回应用户）。

总体规则（补充）：
- 用户想点单、看菜单或需要推荐 → 转交给 `order_agent` 处理或直接调用下单相关工具。
- 对于门店基础信息（地址、营业时间、配送方式等）可直接回答：地址：人民路88号；营业时间：8:00-22:00；支持堂食/自取/外卖。
- 尽量减少轮次，不要无谓追问；但在缺少必要字段（例如订单号）时，应直接调用 `tool_get_recent_orders` 或询问最少的必要信息以完成工具调用。
""",
    tools=[
        tool_get_menu,
        tool_search_product,
        tool_create_order,
        tool_query_order,
        tool_get_recent_orders,
        tool_update_order_status,
    ],
)
```

这段配置展示了 Agent 定义的关键要素。`name` 是 Agent 的唯一标识符，在 A2A 通信中用于识别 Agent。`description` 是对 Agent 能力的简短描述，会出现在 Agent Card 中供其他 Agent 理解。

`instruction` 是 Agent 的系统指令，这是整个配置中最关键的部分。系统指令采用自然语言编写，详细说明了 Agent 的行为规则。注意指令中使用了大量的强调词汇（如"必须"、"禁止"），这是因为大语言模型有时会基于上下文推测而不是真实调用工具。通过明确的规则约束，可以确保 Agent 始终按照预期行为。

指令还包含了具体的业务规则，例如门店地址和营业时间。这些信息可以直接写入指令中，Agent 就能直接回答而不需要额外的工具。对于变化不频繁的静态信息，这种方式比创建专门的工具更高效。

### 工具函数的实现细节

工具函数的实现需要处理同步和异步的兼容性问题。ADK 要求工具必须是同步函数，但实际的业务逻辑（如数据库访问、HTTP 请求）往往是异步的。本案例采用了线程池隔离的方案：

```python
import requests
from concurrent.futures import ThreadPoolExecutor

_http_executor = ThreadPoolExecutor(max_workers=10, thread_name_prefix="http_worker_")

def _make_request(method: str, url: str, **kwargs) -> dict:
    """在独立线程中执行 HTTP 请求"""
    try:
        response = requests.request(method, url, timeout=30.0, **kwargs)
        response.raise_for_status()
        result = response.json()
        return {"success": True, "data": result}
    except requests.RequestException as e:
        return {"success": False, "error": str(e)}

class APIClient:
    def _execute(self, method: str, path: str, **kwargs) -> dict:
        """执行 HTTP 请求（通过线程池）"""
        url = self._build_url(path)
        future = _http_executor.submit(_make_request, method, url, **kwargs)
        result = future.result(timeout=35.0)
        if not result["success"]:
            raise Exception(result["error"])
        return result["data"]
```

这段代码展示了如何在同步函数中安全地执行异步操作。`_make_request` 在独立的工作线程中执行实际的 HTTP 请求，`_execute` 方法通过线程池提交任务并等待结果。这种设计避免了在 Agent 的主事件循环中执行阻塞操作，确保系统的响应性。

工具函数还需要处理数据验证和错误恢复。以创建订单工具为例：

```python
def _normalize_order_items(items: list) -> List[Dict[str, Any]]:
    """清洗并补全订单项数据，避免后端校验失败"""
    if not isinstance(items, list) or len(items) == 0:
        raise ValueError("订单至少需要包含一件商品。")

    catalog = _get_product_catalog()
    normalized_items: List[Dict[str, Any]] = []

    for raw_item in items:
        if isinstance(raw_item, dict):
            item = raw_item.copy()
            name = item.get("name") or item.get("product_name") or item.get("title")
            product_id = item.get("product_id") or item.get("productId") or item.get("id")
            quantity = item.get("quantity") or item.get("qty") or item.get("count") or 1
            price = item.get("price") or item.get("amount")
        elif isinstance(raw_item, str):
            name, quantity = _extract_name_and_quantity(raw_item)
            product_id = None
            price = None
        else:
            raise ValueError("无法解析的商品格式，请重新确认点单信息。")

        product_id = _safe_int(product_id)
        quantity = max(1, _safe_int(quantity, default=1))
        price_value = _parse_price(price)

        matched_product = None
        if product_id is not None:
            matched_product = next((p for p in catalog if int(p["id"]) == product_id), None)

        if not matched_product and name:
            matched_product = _find_product_by_name(name, catalog)
            if matched_product:
                product_id = int(matched_product["id"])
                name = matched_product["name"]

        if not matched_product:
            raise ValueError(f"未找到商品"{name or product_id}"，请重新选择菜单中的商品。")

        if price_value is None:
            price_value = matched_product["price"]

        normalized_items.append({
            "product_id": int(product_id),
            "name": name or matched_product["name"],
            "price": float(price_value),
            "quantity": int(quantity),
        })

    return normalized_items
```

这个函数处理了多种可能的输入格式。用户可能说"给我一杯拿铁"，也可能说"拿铁咖啡x2"，还可能直接提供商品 ID。函数会尝试解析这些不同的表达方式，并与产品目录匹配。如果匹配成功，会补全缺失的字段（如价格）；如果匹配失败，会抛出清晰的错误信息告诉用户问题所在。

## A2A 协议实现详解

### A2A 协议原理

A2A（Agent-to-Agent）协议是 Google ADK 定义的 Agent 间通信标准。它基于 JSON-RPC 2.0 规范，定义了 Agent 如何发现彼此的能力、如何发起任务请求以及如何交换中间状态。

A2A 协议的核心是 Agent Card，这是一个 JSON 文档，描述了 Agent 的基本信息：

```json
{
  "name": "coffee_agent",
  "description": "希希咖啡店智能服务，可以帮助点咖啡和查询订单",
  "url": "http://localhost:8003",
  "capabilities": {
    "streaming": true,
    "tools": [
      {
        "name": "tool_get_menu",
        "description": "获取希希咖啡店的菜单",
        "parameters": {
          "type": "object",
          "properties": {
            "category": {
              "type": "string",
              "description": "商品分类，可选值：经典咖啡、特调饮品、甜点"
            }
          }
        }
      }
    ]
  }
}
```

Agent Card 包含了其他 Agent 需要了解的所有信息。`name` 和 `description` 帮助调用者理解 Agent 的用途，`url` 指向 RPC 接口地址，`capabilities` 列出了 Agent 支持的功能和工具。

### 构建 A2A 服务端

将一个 ADK Agent 暴露为 A2A 服务需要几个步骤。首先创建必要的服务组件：

```python
from a2a.server.apps import A2AStarletteApplication
from a2a.server.request_handlers import DefaultRequestHandler
from a2a.server.tasks import InMemoryTaskStore
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.adk.a2a.utils.agent_card_builder import AgentCardBuilder
from google.adk.a2a.executor.a2a_agent_executor import A2aAgentExecutor

async def build_a2a_app(agent: BaseAgent, base_url: str) -> A2AStarletteApplication:
    """构建 A2A 应用"""
    
    async def create_runner() -> Runner:
        return Runner(
            app_name=agent.name,
            agent=agent,
            artifact_service=InMemoryArtifactService(),
            session_service=InMemorySessionService(),
            memory_service=InMemoryMemoryService(),
            credential_service=InMemoryCredentialService(),
        )

    task_store = InMemoryTaskStore()
    agent_executor = A2aAgentExecutor(runner=create_runner)
    request_handler = DefaultRequestHandler(
        agent_executor=agent_executor,
        task_store=task_store,
    )

    rpc_url = f"{base_url}/"
    card_builder = AgentCardBuilder(agent=agent, rpc_url=rpc_url)
    agent_card = await card_builder.build()

    a2a_app = A2AStarletteApplication(
        agent_card=agent_card,
        http_handler=request_handler,
    )

    return a2a_app
```

这段代码展示了 A2A 服务的构建过程。`create_runner` 函数定义了如何创建 Agent 运行器，运行器负责执行 Agent 的推理和工具调用。这里使用的都是内存实现（InMemory*），适合开发和测试。生产环境可以替换为持久化实现，例如使用 Redis 存储会话状态。

`task_store` 管理 A2A 任务的状态。当一个 Agent 调用另一个 Agent 时，会创建一个任务，任务的执行过程和结果都存储在 task_store 中。`agent_executor` 负责执行具体的 Agent 逻辑，`request_handler` 处理 HTTP 请求并调用 executor。

`AgentCardBuilder` 根据 Agent 的定义自动生成 Agent Card。它会读取 Agent 的名称、描述和工具列表，并转换为标准的 JSON 格式。生成的 Agent Card 会作为 A2AStarletteApplication 的构造参数。

A2A 应用需要注册到 FastAPI 路由中：

```python
async def lifespan(app):
    a2a_app = await build_a2a_app(coffee_agent, COFFEE_A2A_URL)
    
    a2a_app.add_routes_to_app(
        app,
        agent_card_url="/.well-known/agent-card.json",
        rpc_url="/",
    )

app = build_fastapi_app(COFFEE_A2A_PORT, name="咖啡店 A2A 服务", lifespan=lifespan)
```

`add_routes_to_app` 方法会在 FastAPI 应用上注册两个路由。`/.well-known/agent-card.json` 返回 Agent Card，这是一个标准路径，其他 Agent 可以通过这个路径发现 Agent 的能力。`/` 路径处理 JSON-RPC 请求，执行实际的 Agent 任务。

### 创建 A2A 客户端

调用远程 A2A Agent 非常简单，只需要创建 RemoteA2aAgent 对象：

```python
from google.adk.agents.remote_a2a_agent import RemoteA2aAgent

coffee_a2a_agent = RemoteA2aAgent(
    name="remote_coffee_agent",
    agent_card="http://localhost:8003/.well-known/agent-card.json",
    description="远程咖啡店服务 Agent",
)
```

RemoteA2aAgent 在初始化时会自动获取 Agent Card，解析其中的工具定义和 RPC 地址。之后就可以像使用本地 Agent 一样使用它：

```python
root_agent = Agent(
    name="root_agent",
    model=DEFAULT_LLM,
    description="智能助手系统，整合日常助手、咖啡服务和配送服务",
    instruction=system_instruction,
    sub_agents=[assistant_agent, coffee_a2a_agent, delivery_a2a_agent],
)
```

Root Agent 将远程 Agent 作为子 Agent 使用。当用户的请求需要咖啡服务时，Root Agent 会将请求委托给 coffee_a2a_agent。框架会自动构建 JSON-RPC 请求，发送到远程 Agent 的 RPC 端点，等待响应并解析结果。整个过程对 Root Agent 是透明的，它不需要知道子 Agent 是本地还是远程。

### A2A 通信流程

完整的 A2A 通信包含多个步骤。当用户向 Root Agent 发送消息"我要一杯拿铁"时，流程如下：

1. Root Agent 收到消息，分析用户意图，判断需要调用咖啡服务。

2. Root Agent 决定将任务委托给 coffee_a2a_agent，构建子任务描述。

3. RemoteA2aAgent 将任务转换为 JSON-RPC 请求：
```json
{
  "jsonrpc": "2.0",
  "method": "execute_task",
  "params": {
    "task_id": "task-12345",
    "message": "我要一杯拿铁",
    "context": {}
  },
  "id": "req-67890"
}
```

4. 请求发送到咖啡 Agent 的 RPC 端点（`http://localhost:8003/`）。

5. 咖啡 Agent 的 request_handler 接收请求，创建任务并调用 agent_executor。

6. agent_executor 创建 Runner，Runner 使用模型分析消息并决定调用工具。

7. 咖啡 Agent 分析后认为需要先展示菜单，调用 tool_get_menu 工具。

8. tool_get_menu 通过 HTTP 请求访问咖啡店后端 API，获取菜单数据。

9. 咖啡 Agent 将菜单展示给用户，并询问具体需求（尺寸、温度等）。

10. 中间状态通过 Server-Sent Events 流式返回给 Root Agent。

11. Root Agent 将咖啡 Agent 的回复转发给用户。

12. 用户补充信息后，整个流程再次执行，直到订单创建完成。

这个流程展示了 A2A 协议的强大之处。Root Agent 不需要了解咖啡业务的细节，只需要知道有一个咖啡服务可以处理相关请求。咖啡 Agent 也不需要知道调用者是谁，它只专注于处理咖啡订购逻辑。这种松耦合的设计使得系统易于扩展和维护。

## 核心模块深度剖析

### 数据库层实现

数据库层使用 aiosqlite 实现异步访问。咖啡店数据库的初始化逻辑展示了如何设计数据结构和初始化数据：

```python
class CoffeeDatabase:
    async def init_db(self):
        """初始化数据库，创建表和初始数据"""
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute("""
                CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    price REAL NOT NULL,
                    description TEXT,
                    category TEXT NOT NULL,
                    image_url TEXT,
                    available INTEGER DEFAULT 1
                )
            """)

            await db.execute("""
                CREATE TABLE IF NOT EXISTS orders (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    items TEXT NOT NULL,
                    total REAL NOT NULL,
                    status TEXT DEFAULT 'pending',
                    customer_name TEXT,
                    customer_phone TEXT,
                    customer_address TEXT,
                    notes TEXT,
                    created_at TEXT NOT NULL,
                    updated_at TEXT NOT NULL
                )
            """)

            await db.commit()

            cursor = await db.execute("SELECT COUNT(*) FROM products")
            count = await cursor.fetchone()
            if count[0] == 0:
                await self._insert_initial_products(db)
```

表设计遵循了 SQLite 的最佳实践。商品表使用自增主键，价格字段使用 REAL 类型存储浮点数，available 字段用整数表示布尔值（0 表示下架，1 表示在售）。订单表的 items 字段存储 JSON 字符串，这是一种反范式化设计，虽然不符合关系型数据库的标准范式，但对于订单这种历史记录来说是合理的，因为我们需要保存下单时的完整快照，即使商品信息后来发生变化也不影响历史订单。

订单创建方法展示了如何处理事务和返回结果：

```python
async def create_order(
    self,
    items: list[dict],
    customer_name: str,
    customer_phone: str,
    customer_address: Optional[str] = None,
    notes: Optional[str] = None,
) -> dict:
    """创建订单"""
    total = sum(item["price"] * item["quantity"] for item in items)
    now = datetime.now().isoformat()

    async with aiosqlite.connect(self.db_path) as db:
        cursor = await db.execute(
            """
            INSERT INTO orders (items, total, status, customer_name, customer_phone, 
                               customer_address, notes, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                json.dumps(items, ensure_ascii=False),
                total,
                "pending",
                customer_name,
                customer_phone,
                customer_address,
                notes,
                now,
                now,
            ),
        )
        await db.commit()
        order_id = cursor.lastrowid

        return {
            "id": order_id,
            "items": items,
            "total": total,
            "status": "pending",
            "customer_name": customer_name,
            "customer_phone": customer_phone,
            "customer_address": customer_address,
            "notes": notes,
            "created_at": now,
            "updated_at": now,
        }
```

这个方法在数据库插入完成后，立即返回包含所有字段的字典。这样做的好处是调用者不需要再查询一次数据库获取完整信息。方法使用 `cursor.lastrowid` 获取自动生成的订单 ID，这是 SQLite 提供的标准方式。

### FastAPI 服务层

服务层使用 FastAPI 实现 RESTful API。路由定义和请求处理的代码结构清晰：

```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(tags=["希希咖啡"])

class OrderItem(BaseModel):
    """订单项"""
    product_id: int
    name: str
    price: float
    quantity: int

class CreateOrderRequest(BaseModel):
    """创建订单请求"""
    items: list[OrderItem]
    customer_name: str
    customer_phone: str
    customer_address: Optional[str] = None
    notes: Optional[str] = None

@router.post("/orders")
async def create_order(request: CreateOrderRequest):
    """创建订单"""
    items = [item.model_dump() for item in request.items]
    order = await coffee_db.create_order(
        items=items,
        customer_name=request.customer_name,
        customer_phone=request.customer_phone,
        customer_address=request.customer_address,
        notes=request.notes,
    )

    return {
        "success": True,
        "data": order,
        "message": f"订单创建成功，订单号：{order['id']}",
    }
```

使用 Pydantic 模型定义请求和响应格式是 FastAPI 的最佳实践。Pydantic 会自动验证请求数据的类型和格式，如果验证失败会返回详细的错误信息。OrderItem 模型确保每个订单项都包含必需的字段，且字段类型正确。

API 统一使用包含 success、data 和 message 三个字段的响应格式。success 标志操作是否成功，data 包含实际的业务数据，message 提供人类可读的描述。这种统一格式使得前端或 Agent 可以用相同的逻辑处理所有 API 响应。

应用的生命周期管理通过 lifespan 机制实现：

```python
async def lifespan(app):
    from .database import coffee_db
    await coffee_db.init_db()
    yield

app = build_fastapi_app(
    COFFEE_API_PORT,
    name="希希咖啡店后端服务",
    description="希希咖啡店的 REST API 服务，提供商品和订单管理",
    lifespan=lifespan,
)

app.include_router(router, prefix="/api/coffee")
```

lifespan 函数在应用启动时初始化数据库，在应用关闭时可以执行清理操作（虽然这里没有）。`yield` 语句将函数分为启动阶段和关闭阶段，yield 之前的代码在启动时执行，yield 之后的代码在关闭时执行。

### HTTP 客户端层

HTTP 客户端封装了与后端 API 的通信逻辑，处理了同步异步兼容性问题：

```python
import requests
from concurrent.futures import ThreadPoolExecutor

_http_executor = ThreadPoolExecutor(max_workers=10, thread_name_prefix="http_worker_")

def _make_request(method: str, url: str, **kwargs) -> dict:
    """在独立线程中执行 HTTP 请求"""
    try:
        logger.info(f"🌐 [HTTP Worker] {method} {url}")
        response = requests.request(method, url, timeout=30.0, **kwargs)
        response.raise_for_status()
        result = response.json()
        logger.info(f"🌐 [HTTP Worker] {method} {url} -> {response.status_code}")
        return {"success": True, "data": result}
    except requests.Timeout:
        logger.error(f"🌐 [HTTP Worker] {method} {url} 超时")
        return {"success": False, "error": f"HTTP {method} {url} 超时"}
    except requests.RequestException as e:
        logger.error(f"🌐 [HTTP Worker] {method} {url} 失败: {e}")
        return {"success": False, "error": str(e)}
```

使用独立线程池的原因是 Google ADK 的工具必须是同步函数，但我们希望使用 async/await 编写优雅的异步代码。线程池提供了一个隔离层，在工作线程中执行阻塞的 HTTP 请求，不会影响主事件循环。

APIClient 类提供了高层封装：

```python
class APIClient:
    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url

    def _build_url(self, path: str) -> str:
        """构建完整 URL"""
        return f"{self.base_url}{path}"

    def _execute(self, method: str, path: str, **kwargs) -> dict:
        """执行 HTTP 请求（通过线程池）"""
        url = self._build_url(path)
        future = _http_executor.submit(_make_request, method, url, **kwargs)
        result = future.result(timeout=35.0)
        if not result["success"]:
            raise Exception(result["error"])
        return result["data"]

    def get(self, path: str, params: Optional[dict] = None) -> dict:
        """发送 GET 请求"""
        return self._execute("GET", path, params=params)

    def post(self, path: str, json: Optional[dict] = None) -> dict:
        """发送 POST 请求"""
        return self._execute("POST", path, json=json)
```

客户端使用了工厂模式，为不同的服务创建独立的客户端实例：

```python
_coffee_api_client: Optional[APIClient] = None

def get_coffee_api_client() -> APIClient:
    """获取咖啡店 API 客户端"""
    global _coffee_api_client
    if _coffee_api_client is None:
        _coffee_api_client = APIClient(base_url=COFFEE_API_URL)
    return _coffee_api_client
```

单例模式确保了每个服务只创建一个客户端实例，避免了重复创建线程池的开销。

### 网关层实现

网关层是系统的统一入口，负责路由和 API 转发。路由转发的实现使用了 FastAPI 的通配符路由：

```python
@app.api_route(
    "/api/coffee/{path:path}", 
    methods=["GET", "POST", "PUT", "DELETE", "PATCH"]
)
async def proxy_coffee_api(request: Request, path: str):
    """转发咖啡店 API 请求"""
    return await proxy_request(request, COFFEE_API_URL, f"/api/coffee/{path}")

async def proxy_request(
    request: Request,
    target_base_url: str,
    path: str,
) -> Response:
    """转发请求到目标服务"""
    client = await get_http_client()
    target_url = f"{target_base_url}{path}"
    if request.url.query:
        target_url = f"{target_url}?{request.url.query}"

    body = await request.body()
    headers = dict(request.headers)
    headers.pop("host", None)

    try:
        response = await client.request(
            method=request.method,
            url=target_url,
            headers=headers,
            content=body,
        )

        return Response(
            content=response.content,
            status_code=response.status_code,
            headers=dict(response.headers),
            media_type=response.headers.get("content-type"),
        )
    except httpx.RequestError as e:
        return JSONResponse(
            status_code=502,
            content={
                "success": False,
                "error": f"无法连接到后端服务: {str(e)}",
            },
        )
```

这段代码实现了一个透明的 HTTP 代理。网关接收前端的请求，保持原始的 HTTP 方法、请求头和请求体，转发到后端服务，然后将后端的响应原样返回给前端。唯一需要移除的是 host 请求头，因为转发后的目标地址不同。

Root Agent 的创建展示了如何组合本地和远程 Agent：

```python
def create_root_agent(a2a_urls: List[str]):
    """创建根 Agent（A2A 模式）"""
    a2a_agents = []
    for url in a2a_urls:
        if url.strip() == "":
            continue
        a2a_agents.append(
            RemoteA2aAgent(
                name=f"remote_agent_{len(a2a_agents)+1}",
                agent_card=url,
                description="远程 A2A 服务 Agent",
            )
        )

    agent = Agent(
        name="root_agent",
        model=DEFAULT_LLM,
        description="智能助手系统，整合日常助手、咖啡服务和配送服务",
        instruction=system_instruction,
        sub_agents=[assistant_agent, *a2a_agents],
    )

    return agent
```

通过遍历配置的 A2A URL 列表，动态创建多个 RemoteA2aAgent 并添加到子 Agent 列表中。这种设计使得系统可以方便地添加或移除远程服务，只需修改配置即可。

聊天接口的实现展示了如何使用 ADK 的 Runner 执行 Agent：

```python
@app.post("/api/chat/stream")
async def chat_stream(request: ChatRequest):
    """流式聊天（SSE）"""
    session_id = request.session_id or str(uuid.uuid4())

    runner = Runner(
        agent=get_root_agent(),
        app_name=APP_NAME,
        session_service=session_service,
    )

    session = await session_service.get_session(
        app_name=APP_NAME, user_id=USER_ID, session_id=session_id
    )
    if session is None:
        session = await session_service.create_session(
            app_name=APP_NAME, user_id=USER_ID, session_id=session_id
        )

    message = types.Content(
        role="user",
        parts=[types.Part(text=request.message)],
    )

    run_config = RunConfig(streaming_mode=StreamingMode.SSE)

    async def generate():
        """生成 SSE 事件"""
        yield {"event": "session", "data": json.dumps({"session_id": session_id})}

        try:
            async for event in runner.run_async(
                user_id=USER_ID,
                session_id=session_id,
                new_message=message,
                run_config=run_config,
            ):
                if hasattr(event, "content") and event.content:
                    for part in event.content.parts:
                        if hasattr(part, "text") and part.text:
                            yield {
                                "event": "message",
                                "data": json.dumps({
                                    "type": "text",
                                    "content": part.text,
                                })
                            }
        except Exception as e:
            yield {"event": "error", "data": json.dumps({"error": str(e)})}

        yield {"event": "done", "data": "{}"}

    return EventSourceResponse(generate())
```

这段代码展示了 ADK 的会话管理和流式输出机制。每个用户会话通过 session_id 标识，会话状态存储在 session_service 中。Runner 的 run_async 方法异步执行 Agent，返回一个事件流。每个事件可能包含文本内容、工具调用或其他类型的数据。代码遍历事件流，提取文本部分并转换为 Server-Sent Events 格式发送给客户端。

## 部署和运行

### 环境配置详解

系统的配置管理使用了环境变量和合理的默认值相结合的方式：

```python
def get_env_with_default(default_value: str, *env_names: str) -> str:
    """按优先级获取环境变量值"""
    for name in env_names:
        value = os.getenv(name)
        if value is not None:
            return value
    return default_value

GATEWAY_PORT = int(
    get_env_with_default(
        "8000", "GATEWAY_PORT", "FC_SERVER_PORT", "FC_CUSTOM_LISTEN_PORT"
    )
)

COFFEE_API_URL = os.getenv("COFFEE_API_URL", f"http://localhost:{COFFEE_API_PORT}")
```

这种配置方式支持多个环境变量名，优先级从前到后。例如 GATEWAY_PORT 会依次尝试读取 GATEWAY_PORT、FC_SERVER_PORT、FC_CUSTOM_LISTEN_PORT 三个环境变量，如果都不存在则使用默认值 8000。这样既兼容了 AgentRun 的函数计算环境（使用 FC_ 前缀的变量），也支持自定义配置。

AgentRun 集成通过 SDK 的 integration 模块实现：

```python
from agentrun.integration.google_adk import model, toolset

MODEL_NAME = get_env_with_default("", "MODEL_NAME")
AGENTRUN_MODEL_NAME = get_env_with_default("", "AGENTRUN_MODEL_NAME")
DEFAULT_LLM = model(AGENTRUN_MODEL_NAME, model=MODEL_NAME)

COFFEE_TOOLSET_NAME = get_env_with_default("", "COFFEE_TOOLSET_NAME")
COFFEE_TOOLSET = toolset(COFFEE_TOOLSET_NAME) if COFFEE_TOOLSET_NAME else []
```

如果配置了 COFFEE_TOOLSET_NAME，系统会从 AgentRun 加载远程工具集；否则使用本地定义的工具函数。这种设计使得工具的实现可以灵活切换，例如在开发时使用本地工具，在生产环境使用托管在 AgentRun 上的工具服务。

### 统一部署实践

统一部署模式下，所有服务在同一进程中启动。项目提供了统一的启动脚本：

```bash
python -m gateway.main
```

这个命令会启动网关服务，网关的 lifespan 钩子会初始化所有数据库和 Agent：

```python
async def lifespan(app: FastAPI):
    """应用生命周期"""
    global _root_agent
    
    # 初始化数据库
    from coffee.database import coffee_db
    from delivery.database import delivery_db
    await coffee_db.init_db()
    await delivery_db.init_db()
    
    # 创建 Root Agent
    _root_agent = create_root_agent(A2A_URLS)
```

统一部署的优势是简单快速，适合开发测试。缺点是所有服务共享同一进程的资源，某个服务的问题可能影响整个系统。

### 分布式部署实践

分布式部署需要依次启动各个服务：

```bash
# 终端 1：启动咖啡店后端 API
python -m coffee.main

# 终端 2：启动配送后端 API
python -m delivery.main

# 终端 3：启动咖啡店 A2A 服务
python -m coffee.a2a

# 终端 4：启动配送 A2A 服务
python -m delivery.a2a

# 终端 5：启动网关
export COFFEE_A2A_URL="http://localhost:8003/.well-known/agent-card.json"
export DELIVERY_A2A_URL="http://localhost:8004/.well-known/agent-card.json"
python -m gateway.main
```

每个服务监听不同的端口，通过环境变量配置服务间的通信地址。这种部署方式的优势是每个服务独立运行，可以单独扩展和更新。例如咖啡订单量大时，可以启动多个咖啡 API 实例并配置负载均衡。

### Docker 容器化部署

项目可以很容易地容器化。每个服务的 Dockerfile 结构类似：

```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PYTHONPATH=/app
CMD ["python", "-m", "coffee.main"]
```

使用 Docker Compose 可以方便地管理多个容器：

```yaml
version: '3.8'

services:
  coffee-api:
    build: .
    command: python -m coffee.main
    ports:
      - "8001:8001"
    environment:
      - COFFEE_API_PORT=8001

  coffee-a2a:
    build: .
    command: python -m coffee.a2a
    ports:
      - "8003:8003"
    environment:
      - COFFEE_A2A_PORT=8003
      - COFFEE_API_URL=http://coffee-api:8001

  gateway:
    build: .
    command: python -m gateway.main
    ports:
      - "8000:8000"
    environment:
      - GATEWAY_PORT=8000
      - COFFEE_A2A_URL=http://coffee-a2a:8003/.well-known/agent-card.json
    depends_on:
      - coffee-api
      - coffee-a2a
```

容器化部署的优势是环境一致性和易于扩展。所有服务使用相同的基础镜像，避免了环境差异导致的问题。

## 最佳实践总结

### 系统指令的编写技巧

系统指令是 Agent 行为的核心控制手段，编写时应该遵循以下原则。首先要明确 Agent 的职责边界，清楚地说明什么应该做、什么不应该做。例如咖啡店 Agent 的指令明确规定只处理咖啡订购相关的请求，其他问题应该拒绝或转发。

其次要详细描述工作流程。不要假设模型会自动理解业务逻辑，而应该像编写操作手册一样，一步步说明应该如何处理请求。例如下单流程应该规定：展示菜单 -> 确认商品和数量 -> 询问顾客信息 -> 创建订单，每一步都要明确。

使用强调词汇（如"必须"、"禁止"、"始终"）来约束关键行为。大语言模型有时会基于概率而不是规则行事，通过强调可以提高模型遵守规则的可能性。但不要过度使用强调词，否则会让指令显得啰嗦。

包含具体的示例可以帮助模型理解预期行为。例如在指令中写上"示例回复：订单123的状态是..."，让模型知道应该使用什么样的格式和语气回复。

### 工具设计的最佳实践

工具函数应该保持单一职责，每个工具只做一件事。不要创建一个"万能工具"来处理所有操作，而应该将功能拆分为多个小工具。这样既便于模型理解和选择，也便于测试和维护。

工具的文档字符串应该包含完整的信息：功能描述、参数说明（包括类型、是否必填、可选值范围）、返回值格式、可能的错误情况。文档字符串越详细，模型使用工具的成功率越高。

工具的返回值应该使用结构化格式，建议统一使用字典并包含 success、data、message 三个字段。这种统一格式使得 Agent 可以用相同的逻辑处理所有工具的返回值。

错误处理要做到友好和可操作。当工具执行失败时，不要只返回技术性的错误信息（如"Connection refused"），而应该解释问题原因并给出建议（如"无法连接到后端服务，请稍后重试"）。

### A2A 集成的注意事项

设计 Agent 时要考虑它是否需要独立部署。如果一个 Agent 可能被多个系统使用，或者需要独立扩展，就应该支持 A2A 协议。如果只是内部使用的辅助 Agent，作为本地子 Agent 集成更简单。

Agent Card 的描述要准确清晰，这是其他 Agent 理解你的 Agent 能力的唯一途径。描述应该说明 Agent 能做什么、不能做什么、适用于什么场景。避免使用模糊的描述，例如"智能助手"就太宽泛了。

A2A 通信涉及网络请求，会有延迟和失败的可能。要设置合理的超时时间，并实现重试机制。同时要处理网络错误，当远程 Agent 不可用时，应该给出友好的错误提示而不是让整个系统崩溃。

### 性能优化建议

数据库查询应该添加必要的索引。例如订单表的 order_id、status 字段经常用于查询，应该创建索引。虽然 SQLite 的性能已经很好，但随着数据量增长，没有索引的查询会明显变慢。

HTTP 请求是系统的性能瓶颈之一。可以考虑实现请求缓存，对于不经常变化的数据（如菜单），可以缓存一段时间避免重复请求。同时可以使用连接池复用 HTTP 连接，减少建立连接的开销。

Agent 的响应时间很大程度上取决于模型的推理速度和工具调用次数。优化系统指令可以减少不必要的工具调用，例如将常见的固定信息（如营业时间、联系方式）直接写在指令中，Agent 就不需要调用工具获取这些信息。

流式输出可以显著改善用户体验。虽然总的处理时间没有减少，但用户可以更早看到响应，感觉系统更快更流畅。建议所有面向最终用户的接口都支持流式输出。

### 监控和运维要点

每个服务都应该实现健康检查端点。健康检查不仅要返回 HTTP 200，还应该验证服务的关键依赖（如数据库连接）是否正常。监控系统应该定期探测健康检查端点，发现问题及时告警。

日志记录要做到适度和有用。记录太少会导致问题难以排查，记录太多会产生大量噪音且影响性能。建议使用不同的日志级别：DEBUG 用于开发调试，INFO 记录关键操作，WARNING 记录异常但可恢复的情况，ERROR 记录需要人工介入的问题。

使用结构化日志格式（如 JSON）便于日志分析。每条日志应该包含时间戳、日志级别、服务名称、请求 ID、具体消息等字段。请求 ID 可以用于追踪一个请求在多个服务间的完整流程。

性能监控应该关注几个关键指标：响应时间、错误率、请求量、资源使用率。建立这些指标的基准值，当指标异常时及时告警。例如如果平均响应时间突然增加 50%，可能表示系统出现了性能问题。


------

为了便于大家进行快速体验，可以通过 AgentRun 控制台探索页面进行快速体验

- 访问[AgentRun 探索页面](https://functionai.console.aliyun.com/cn-hangzhou/agent/explore): 

<img src="https://github.com/user-attachments/assets/dacd8749-2144-41d2-b494-580114c8b4b0" />

- 按照要求，填写模型信息：

<img src="https://github.com/user-attachments/assets/00889a10-067f-470b-b145-116be075f8d6" />


- 进行 Agent 创建：

<img src="https://github.com/user-attachments/assets/5e9af704-9b54-41e3-b3bc-96690e9c3842" />

- 访问创建后的 Agent 进行体验

<img src="https://github.com/user-attachments/assets/1594462a-628f-4df6-8e31-922b86cfa7cb" />

<img src="https://github.com/user-attachments/assets/4b03d8a7-9906-42c8-8758-07cab19af98f" />

<img src="https://github.com/user-attachments/assets/837043db-e09f-464d-ba5b-b8de6bc7be0f" />

<img src="https://github.com/user-attachments/assets/69aa1e71-b979-4b3f-80cb-440f226a71e1" />





