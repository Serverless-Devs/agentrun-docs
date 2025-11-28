"""
文档生成器配置

统一管理路径到中文名称的映射配置。
"""

# 路径到标签的映射配置
# 支持目录和文件路径，按路径前缀匹配
PATH_LABELS: dict[str, str] = {
    # 顶级目录
    "agent_runtime": "Agent Runtime",
    "credential": "Credential（凭证）",
    "integration": "Integration（集成）",
    "model": "Model（模型）",
    "sandbox": "Sandbox（沙箱）",
    "server": "Server（服务器）",
    "toolset": "ToolSet（工具集）",
    "utils": "Utils（工具类）",
    "core": "Core（核心）",
    
    # integration 子目录
    "integration/agentscope": "AgentScope",
    "integration/builtin": "内置工具",
    "integration/crewai": "CrewAI",
    "integration/google_adk": "Google ADK",
    "integration/langchain": "LangChain",
    "integration/langgraph": "LangGraph",
    "integration/pydantic_ai": "Pydantic AI",
    "integration/utils": "工具类",
    
    # 如需添加文件级别的映射，可在此处添加
    # 示例: "sandbox/browser_sandbox.py": "浏览器沙箱",
}


def get_label(path: str) -> str | None:
    """
    根据路径获取标签名称。
    
    Args:
        path: 相对路径（可以是目录或文件路径）
        
    Returns:
        标签名称，如果未配置则返回 None
    """
    # 移除 .py 后缀便于匹配
    normalized = path.rstrip("/").replace(".py", "")
    
    # 精确匹配
    if normalized in PATH_LABELS:
        return PATH_LABELS[normalized]
    
    return None
