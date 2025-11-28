#!/usr/bin/env python3
"""
AgentRun SDK API 文档生成器

从 Python 源码的 docstring 自动生成 Markdown 格式的 API 文档。

使用方法：
    python generate_api_docs.py
"""

import json
import shutil
import sys
import argparse
from pathlib import Path

from doc_generator.extractor import extract_module_doc
from doc_generator.markdown import generate_module_markdown
from doc_generator.config import get_label


def discover_modules(src_dir: Path) -> list[tuple[str, str]]:
    """
    自动发现所有可导出的模块文件。

    Returns:
        [(相对路径, 显示名称), ...]
    """
    modules = []
    for py_file in sorted(src_dir.rglob("*.py")):
        rel_path = py_file.relative_to(src_dir)
        rel_str = str(rel_path)

        # 跳过 __ 开头的文件
        if py_file.name.startswith("__"):
            continue

        # 使用配置的名称或转换为 PascalCase
        display_name = get_label(rel_str) or _file_to_pascal_case(py_file.stem)
        modules.append((rel_str, display_name))

    return modules


def _file_to_pascal_case(name: str) -> str:
    """将文件名转为 PascalCase（如 code_interpreter -> CodeInterpreter）"""
    return "".join(part.capitalize() for part in name.split("_"))


def group_modules(modules: list[tuple[str, str]]) -> dict[str, dict[str, list[tuple[str, str]]]]:
    """按目录分组模块"""
    grouped: dict[str, dict[str, list[tuple[str, str]]]] = {}
    
    for module_path, display_name in modules:
        parts = module_path.split("/")
        top_dir = parts[0] if len(parts) > 1 else "core"
        sub_dir = parts[1] if len(parts) >= 3 else "_root"

        grouped.setdefault(top_dir, {}).setdefault(sub_dir, []).append((module_path, display_name))

    return grouped


def create_category_json(output_dir: Path, label: str, position: int):
    """创建 _category_.json 文件"""
    with open(output_dir / "_category_.json", "w", encoding="utf-8") as f:
        json.dump({"label": label, "position": position, "collapsed": True}, f, ensure_ascii=False, indent=2)


def process_module(
    file_path: Path, output_dir: Path, display_name: str, module_path: str, position: int
) -> Path | None:
    """处理单个模块文件"""
    print(f"📄 处理: {module_path} -> {display_name}")

    try:
        module_doc, items = extract_module_doc(file_path)
        if not items:
            print("   ⏭️  无可导出项目")
            return None

        markdown = generate_module_markdown(display_name, module_doc, items, sidebar_position=position)
        output_name = module_path.split("/")[-1].replace(".py", ".md")
        output_file = output_dir / output_name

        with open(output_file, "w", encoding="utf-8") as f:
            f.write(markdown)

        print(f"   ✅ 生成: {output_file.name} ({len(items)} 个项目)")
        return output_file

    except Exception as e:
        print(f"   ❌ 错误: {e}")
        return None


def main():
    """主函数"""
    parser = argparse.ArgumentParser(description="AgentRun SDK API 文档生成器")
    parser.add_argument("--sdk-path", type=str, help="SDK 源码路径", default=None)
    args = parser.parse_args()

    # 路径配置
    project_root = Path(__file__).parent.parent
    sdk_path = Path(args.sdk_path) if args.sdk_path else project_root / "sdk" / "python"
    if not sdk_path.is_absolute():
        sdk_path = project_root / sdk_path
    python_src = sdk_path.resolve() / "agentrun"
    output_dir = project_root / "docs" / "api" / "python"

    print("📚 AgentRun API 文档生成器")
    print("=" * 40)
    print(f"源码目录: {python_src}")
    print(f"输出目录: {output_dir}")

    if not python_src.exists():
        print(f"❌ 源码目录不存在: {python_src}")
        sys.exit(1)

    # 清理并创建输出目录
    if output_dir.exists():
        shutil.rmtree(output_dir)
        print("🗑️  清理旧文件...")
    output_dir.mkdir(parents=True, exist_ok=True)

    # 发现和分组模块
    modules = discover_modules(python_src)
    print(f"\n🔍 发现 {len(modules)} 个模块文件\n")
    grouped = group_modules(modules)

    generated_files = []
    sidebar_structure = {}

    for top_idx, top_dir in enumerate(sorted(grouped.keys()), 1):
        sub_dirs = grouped[top_dir]
        top_output_dir = output_dir / top_dir
        top_output_dir.mkdir(parents=True, exist_ok=True)

        # 创建顶级目录分类
        top_label = get_label(top_dir) or _file_to_pascal_case(top_dir)
        create_category_json(top_output_dir, top_label, top_idx)
        sidebar_structure[top_dir] = []

        has_sub_dirs = len(sub_dirs) > 1 or "_root" not in sub_dirs

        for sub_idx, sub_dir_name in enumerate(sorted(sub_dirs.keys()), 1):
            module_list = sub_dirs[sub_dir_name]

            # 确定输出目录
            if sub_dir_name == "_root" or not has_sub_dirs:
                current_output_dir = top_output_dir
            else:
                current_output_dir = top_output_dir / sub_dir_name
                current_output_dir.mkdir(parents=True, exist_ok=True)
                sub_label = get_label(f"{top_dir}/{sub_dir_name}") or _file_to_pascal_case(sub_dir_name)
                create_category_json(current_output_dir, sub_label, sub_idx)

            for idx, (module_path, display_name) in enumerate(module_list, 1):
                file_path = python_src / module_path
                output_file = process_module(file_path, current_output_dir, display_name, module_path, idx)
                
                if output_file:
                    generated_files.append(output_file)
                    rel_path = output_file.relative_to(output_dir)
                    doc_id = f"api/python/{rel_path}".replace(".md", "").replace("\\", "/")
                    sidebar_structure[top_dir].append(doc_id)

    print(f"\n✅ 完成! 生成了 {len(generated_files)} 个文件")
    if generated_files:
        print("\n生成的文件按目录组织:")
        for top_dir, items in sidebar_structure.items():
            print(f"  📁 {top_dir}/: {len(items)} 个文件")


if __name__ == "__main__":
    main()
