"""
Python 源码文档提取器

从 Python AST 中提取类、函数及其文档字符串。
"""

import ast
from pathlib import Path
from typing import Optional
from dataclasses import dataclass, field


@dataclass
class DocItem:
    """文档项"""
    name: str
    type: str  # class, function, method, property
    signature: str = ""
    docstring: str = ""
    decorators: list[str] = field(default_factory=list)
    children: list["DocItem"] = field(default_factory=list)


class PythonDocExtractor(ast.NodeVisitor):
    """Python AST 文档提取器"""

    def __init__(self, source_code: str):
        self.source_code = source_code
        self.items: list[DocItem] = []
        self.current_class: Optional[DocItem] = None

    def get_signature(self, node: ast.FunctionDef | ast.AsyncFunctionDef) -> str:
        """获取函数/方法签名"""
        args = []
        defaults_offset = len(node.args.args) - len(node.args.defaults)

        for i, arg in enumerate(node.args.args):
            arg_str = arg.arg
            if arg.annotation:
                arg_str += f": {ast.unparse(arg.annotation)}"

            default_idx = i - defaults_offset
            if 0 <= default_idx < len(node.args.defaults):
                arg_str += f" = {ast.unparse(node.args.defaults[default_idx])}"
            args.append(arg_str)

        if node.args.vararg:
            arg_str = f"*{node.args.vararg.arg}"
            if node.args.vararg.annotation:
                arg_str += f": {ast.unparse(node.args.vararg.annotation)}"
            args.append(arg_str)

        if node.args.kwarg:
            arg_str = f"**{node.args.kwarg.arg}"
            if node.args.kwarg.annotation:
                arg_str += f": {ast.unparse(node.args.kwarg.annotation)}"
            args.append(arg_str)

        returns = f" -> {ast.unparse(node.returns)}" if node.returns else ""
        prefix = "async " if isinstance(node, ast.AsyncFunctionDef) else ""
        return f"{prefix}def {node.name}({', '.join(args)}){returns}"

    def get_decorators(self, node: ast.ClassDef | ast.FunctionDef | ast.AsyncFunctionDef) -> list[str]:
        """获取装饰器列表"""
        return [f"@{ast.unparse(dec)}" for dec in node.decorator_list]

    def visit_ClassDef(self, node: ast.ClassDef):
        """访问类定义"""
        if node.name.startswith("_") and not node.name.startswith("__"):
            return

        bases = [ast.unparse(base) for base in node.bases]
        signature = f"class {node.name}" + (f"({', '.join(bases)})" if bases else "")

        class_item = DocItem(
            name=node.name,
            type="class",
            signature=signature,
            docstring=ast.get_docstring(node) or "",
            decorators=self.get_decorators(node),
        )

        old_class = self.current_class
        self.current_class = class_item

        for child in node.body:
            if isinstance(child, (ast.FunctionDef, ast.AsyncFunctionDef)):
                self._visit_method(child)

        self.current_class = old_class
        self.items.append(class_item)

    def _visit_method(self, node: ast.FunctionDef | ast.AsyncFunctionDef):
        """访问方法定义"""
        if node.name.startswith("_") and node.name != "__init__":
            return

        decorators = self.get_decorators(node)
        is_property = any("property" in d for d in decorators)

        method_item = DocItem(
            name=node.name,
            type="property" if is_property else "method",
            signature=self.get_signature(node),
            docstring=ast.get_docstring(node) or "",
            decorators=decorators,
        )

        if self.current_class:
            self.current_class.children.append(method_item)

    def visit_FunctionDef(self, node: ast.FunctionDef):
        """访问函数定义（模块级）"""
        if self.current_class or node.name.startswith("_"):
            return

        self.items.append(DocItem(
            name=node.name,
            type="function",
            signature=self.get_signature(node),
            docstring=ast.get_docstring(node) or "",
            decorators=self.get_decorators(node),
        ))

    def visit_AsyncFunctionDef(self, node: ast.AsyncFunctionDef):
        """访问异步函数定义"""
        self.visit_FunctionDef(node)  # type: ignore


def extract_module_doc(file_path: Path) -> tuple[str, list[DocItem]]:
    """从 Python 文件提取文档"""
    with open(file_path, "r", encoding="utf-8") as f:
        source = f.read()

    tree = ast.parse(source)
    extractor = PythonDocExtractor(source)
    extractor.visit(tree)

    return ast.get_docstring(tree) or "", extractor.items
