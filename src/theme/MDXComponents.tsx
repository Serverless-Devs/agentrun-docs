import React from 'react';
// 导入原始的 MDXComponents 映射
import MDXComponents from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
// 导入自定义的语言标签组件
import { LangTabs, PythonTab, NodeJSTab } from '@site/src/components/LangTabs';

export default {
  // 重用默认的组件映射
  ...MDXComponents,
  // 注册自定义组件到全局作用域
  // 这样所有 MDX 文件都可以直接使用这些组件，无需 import
  Tabs,
  TabItem,
  LangTabs,
  PythonTab,
  NodeJSTab,
};
