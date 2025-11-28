"""
文档生成器模块

从 Python 源码自动生成 Markdown API 文档。
使用 Jinja2 模板引擎进行渲染。
"""

from .extractor import DocItem, extract_module_doc
from .markdown import generate_module_markdown, escape_mdx
from .renderer import Jinja2Renderer, get_renderer
from .config import PATH_LABELS, get_label

__all__ = [
    "DocItem",
    "extract_module_doc",
    "generate_module_markdown",
    "escape_mdx",
    "Jinja2Renderer",
    "get_renderer",
    "PATH_LABELS",
    "get_label",
]
