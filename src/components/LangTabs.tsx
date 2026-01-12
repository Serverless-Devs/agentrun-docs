import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

/**
 * PythonTab - Python 代码标签页占位符
 * 实际会被 LangTabs 转换为 TabItem
 */
export function PythonTab({
  children,
  ...props
}: {
  children?: React.ReactNode;
  [key: string]: any;
}) {
  // 这个组件不应该被直接渲染，它会被 LangTabs 转换
  return <>{children}</>;
}
PythonTab.displayName = 'PythonTab';

/**
 * NodeJSTab - Node.js 代码标签页占位符
 * 实际会被 LangTabs 转换为 TabItem
 */
export function NodeJSTab({
  children,
  ...props
}: {
  children?: React.ReactNode;
  [key: string]: any;
}) {
  // 这个组件不应该被直接渲染，它会被 LangTabs 转换
  return <>{children}</>;
}
NodeJSTab.displayName = 'NodeJSTab';

/**
 * LangTabs - 语言切换标签页组件
 * 自动配置 groupId 和 queryString，用于在不同编程语言之间切换
 *
 * @example
 * <LangTabs>
 *   <PythonTab>
 *     ```python
 *     print("Hello World")
 *     ```
 *   </PythonTab>
 *   <NodeJSTab>
 *     ```javascript
 *     console.log("Hello World");
 *     ```
 *   </NodeJSTab>
 * </LangTabs>
 */
export function LangTabs({
  children,
  ...props
}: React.ComponentProps<typeof Tabs>) {
  // 将自定义的 PythonTab/NodeJSTab 转换为 TabItem
  const processedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    // 使用 displayName 或 type 来识别组件
    const childType = child.type as any;
    const displayName = childType.displayName || childType.name;

    if (displayName === 'PythonTab') {
      const {
        children: tabContent,
        default: isDefault,
        ...restProps
      } = child.props;
      return (
        <TabItem
          value='python'
          label='Python'
          default
          attributes={{ className: 'python-icon' }}
          {...restProps}
        >
          {tabContent}
        </TabItem>
      );
    }

    if (displayName === 'NodeJSTab') {
      const {
        children: tabContent,
        default: isDefault,
        ...restProps
      } = child.props;
      return (
        <TabItem
          value='nodejs'
          label='NodeJS'
          attributes={{ className: 'nodejs-icon' }}
          {...restProps}
        >
          {tabContent}
        </TabItem>
      );
    }

    return child;
  });

  return (
    <Tabs groupId='language' queryString {...props}>
      {processedChildren}
    </Tabs>
  );
}
