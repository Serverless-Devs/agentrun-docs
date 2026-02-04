import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import {
  CodeBlockContextProvider,
  type CodeBlockMetadata,
  createCodeBlockMetadata,
  // useCodeWordWrap,
} from '@docusaurus/theme-common/internal';
import type { Props } from '@theme/CodeBlock/Content/String';
import CodeBlockLayout from '@theme/CodeBlock/Layout';
import { useCodeWordWrap } from './useCodeWordWrap';

function useCodeBlockMetadata(props: Props): CodeBlockMetadata {
  const { prism } = useThemeConfig();
  return createCodeBlockMetadata({
    code: props.children,
    className: props.className,
    metastring: props.metastring,
    magicComments: prism.magicComments,
    defaultLanguage: prism.defaultLanguage,
    language: props.language,
    title: props.title,
    showLineNumbers: props.showLineNumbers,
  });
}

// TODO Docusaurus v4: move this component at the root?
export default function CodeBlockString(props: Props): ReactNode {
  const metadata = useCodeBlockMetadata(props);

  const wordWrap = useCodeWordWrap(!!props.metastring?.includes('wordwrap'));
  return (
    <CodeBlockContextProvider metadata={metadata} wordWrap={wordWrap}>
      <CodeBlockLayout />
    </CodeBlockContextProvider>
  );
}
