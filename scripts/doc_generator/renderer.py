"""
Jinja2 模板渲染器

使用 Jinja2 模板引擎生成 Markdown 文档。
"""

import re
from pathlib import Path
from jinja2 import Environment, FileSystemLoader

from .extractor import DocItem


# 模板目录
TEMPLATE_DIR = Path(__file__).parent / "templates"


def escape_mdx(text: str) -> str:
    """转义 MDX 中的特殊字符"""
    if not text:
        return ""
    return text.replace("{", "\\{").replace("}", "\\}").replace("<", "\\<").replace(">", "\\>")


class DocstringParser:
    """Google Style Docstring 解析器"""

    SECTIONS = [
        "Args", "Arguments", "Parameters", "Returns", "Return", "Yields",
        "Raises", "Attributes", "Example", "Examples", "Note", "Notes",
        "Warning", "Warnings", "See Also",
    ]

    def parse(self, docstring: str) -> dict:
        """解析 docstring 为结构化数据"""
        if not docstring:
            return {"description": "", "sections": {}}

        lines = docstring.strip().split("\n")
        result = {"description": "", "sections": {}}
        current_section = None
        section_content = []
        description_lines = []

        for line in lines:
            stripped = line.strip()
            section_match = next((s for s in self.SECTIONS if stripped.startswith(f"{s}:")), None)

            if section_match:
                if current_section:
                    result["sections"][current_section] = "\n".join(section_content)
                elif description_lines:
                    result["description"] = "\n".join(description_lines)
                current_section = section_match
                section_content = []
            elif current_section:
                section_content.append(line)
            else:
                description_lines.append(line)

        if current_section:
            result["sections"][current_section] = "\n".join(section_content)
        elif description_lines:
            result["description"] = "\n".join(description_lines)

        return result


class SectionFormatter:
    """文档 section 格式化器"""

    @staticmethod
    def format_params(content: str) -> str:
        """格式化参数列表"""
        lines = []
        for line in content.strip().split("\n"):
            line = line.strip()
            if not line:
                continue
            match = re.match(r"^(\w+)\s*\(([^)]+)\):\s*(.*)$", line)
            if match:
                name, type_, desc = match.groups()
                lines.append(f"- `{name}` (*{escape_mdx(type_)}*): {escape_mdx(desc)}")
            elif ":" in line:
                name, desc = line.split(":", 1)
                lines.append(f"- `{name.strip()}`: {escape_mdx(desc.strip())}")
            else:
                lines.append(f"  {escape_mdx(line)}")
        return "\n".join(lines)

    @staticmethod
    def format_raises(content: str) -> str:
        """格式化异常"""
        lines = []
        for line in content.strip().split("\n"):
            line = line.strip()
            if not line:
                continue
            if ":" in line:
                exc, desc = line.split(":", 1)
                lines.append(f"- `{exc.strip()}`: {escape_mdx(desc.strip())}")
            else:
                lines.append(f"  {escape_mdx(line)}")
        return "\n".join(lines)

    @classmethod
    def format_section(cls, section: str, content: str) -> str:
        """格式化 section 内容"""
        if section in ["Args", "Arguments", "Parameters", "Attributes"]:
            return cls.format_params(content)
        if section in ["Example", "Examples"]:
            return f"```python\n{content.strip()}\n```"
        if section == "Raises":
            return cls.format_raises(content)
        return escape_mdx(content.strip())


class Jinja2Renderer:
    """基于 Jinja2 的文档渲染器"""

    def __init__(self, template_dir: Path = TEMPLATE_DIR):
        self.env = Environment(
            loader=FileSystemLoader(template_dir),
            trim_blocks=True,
            lstrip_blocks=True,
            keep_trailing_newline=True,
        )
        self.parser = DocstringParser()
        self.formatter = SectionFormatter()
        self._register_filters()
        self._register_globals()

    def _register_filters(self):
        """注册自定义过滤器"""
        self.env.filters["escape_mdx"] = escape_mdx

    def _register_globals(self):
        """注册全局函数，供模板调用"""
        self.env.globals["render_class"] = self._render_class
        self.env.globals["render_function"] = self._render_function
        self.env.globals["render_method"] = self._render_method
        self.env.globals["format_docstring"] = self._format_docstring

    def _format_docstring(self, docstring: str) -> str:
        """格式化文档字符串"""
        if not docstring:
            return ""

        parsed = self.parser.parse(docstring)
        lines = []

        if parsed["description"]:
            lines.append(escape_mdx(parsed["description"].strip()))
            lines.append("")

        for section, content in parsed["sections"].items():
            if content.strip():
                lines.append(f"**{section}:**")
                lines.append("")
                lines.append(self.formatter.format_section(section, content))
                lines.append("")

        return "\n".join(lines)

    def _render_class(self, item: DocItem) -> str:
        """渲染类文档"""
        template = self.env.get_template("class.md.j2")
        return template.render(item=item)

    def _render_function(self, item: DocItem) -> str:
        """渲染函数文档"""
        template = self.env.get_template("function.md.j2")
        return template.render(item=item)

    def _render_method(self, item: DocItem, is_property: bool = False) -> str:
        """渲染方法/属性文档"""
        template = self.env.get_template("method.md.j2")
        return template.render(item=item, is_property=is_property)

    def render_module(
        self,
        module_name: str,
        module_doc: str,
        items: list[DocItem],
        sidebar_position: int = 1,
    ) -> str:
        """渲染模块文档"""
        # 处理模块文档：移除 source: 之前的内容
        doc_content = module_doc
        if module_doc:
            lines = module_doc.split("\n")
            for i, line in enumerate(lines):
                if line.strip().startswith("source:"):
                    doc_content = "\n".join(lines[i + 1:]).strip()
                    break

        classes = [item for item in items if item.type == "class"]
        functions = [item for item in items if item.type == "function"]

        template = self.env.get_template("module.md.j2")
        return template.render(
            module_name=module_name,
            module_doc=doc_content.strip() if doc_content else "",
            sidebar_position=sidebar_position,
            classes=classes,
            functions=functions,
        )


# 单例渲染器
_renderer: Jinja2Renderer | None = None


def get_renderer() -> Jinja2Renderer:
    """获取渲染器单例"""
    global _renderer
    if _renderer is None:
        _renderer = Jinja2Renderer()
    return _renderer


def generate_module_markdown(
    module_name: str,
    module_doc: str,
    items: list[DocItem],
    sidebar_position: int = 1,
) -> str:
    """
    生成模块的 Markdown 文档（兼容旧接口）

    Args:
        module_name: 模块显示名称
        module_doc: 模块级文档字符串
        items: 文档项列表
        sidebar_position: 侧边栏位置

    Returns:
        生成的 Markdown 文档内容
    """
    renderer = get_renderer()
    return renderer.render_module(module_name, module_doc, items, sidebar_position)
