"""
Markdown 文档生成器

将提取的文档项转换为 Markdown 格式。
此模块提供向后兼容的接口，内部使用 Jinja2 渲染器。
"""

from .extractor import DocItem
from .renderer import generate_module_markdown, escape_mdx

__all__ = ["generate_module_markdown", "escape_mdx", "DocItem"]
