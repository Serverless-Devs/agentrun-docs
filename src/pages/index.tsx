import { useEffect, type ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  useEffect(() => {
    if (window) window.location.href = '/docs/tutorial/overview';
  });
  return (
    <Layout
      title={`${siteConfig.title}`}
      description='阿里云 AI Agent 运行时服务'
    ></Layout>
  );
}
