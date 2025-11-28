import { useEffect, type ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import { useColorMode } from '@docusaurus/theme-common';

// 模块数据
const modules = [
  {
    icon: 'fas fa-running',
    title: 'Runtime - Agent 运行时',
    desc: '提供 Agent 的运行环境，支持多种框架（AgentScope、LangChain、LlamaIndex），零运维、自动扩缩容，让 Agent 稳定高效运行。',
    link: 'https://functionai.console.aliyun.com/cn-hangzhou/agent/runtime/agent-list',
  },
  {
    icon: 'fas fa-shield-virus',
    title: 'Sandbox - 安全沙箱',
    desc: '内置代码解释器、浏览器沙箱和 All-in-One 沙箱，支持 Python、Node.js、Java 等多语言，提供企业级隔离，让 Agent 安全执行复杂任务。',
    link: 'https://functionai.console.aliyun.com/cn-hangzhou/agent/runtime/sandbox',
  },
  {
    icon: 'fas fa-brain',
    title: 'LLM Models - 大语言模型',
    desc: '统一模型代理，支持 Qwen、百炼、通义千问等国内主流供应商，提供智能路由、熔断降级、多模型 Fallback，确保模型调用高可用。',
    link: 'https://functionai.console.aliyun.com/cn-hangzhou/agent/models/llm',
  },
  {
    icon: 'fas fa-vector-square',
    title: 'Vector Models - 向量模型',
    desc: '提供向量模型服务，支持文本向量化、语义检索，为 RAG（检索增强生成）和知识库问答提供基础能力。',
    link: 'https://functionai.console.aliyun.com/cn-hangzhou/agent/models/vector',
  },
  {
    icon: 'fas fa-tools',
    title: 'Tool Management - 工具管理',
    desc: '工具市场提供开箱即用的工具，支持标准化 MCP 封装、前置/后置 Hook、异步调用，让工具集成更简单、更可靠。',
    link: 'https://functionai.console.aliyun.com/cn-hangzhou/agent/infra/tool-management',
  },
  {
    icon: 'fas fa-book-open',
    title: 'Knowledge Base - 知识库',
    desc: '支持文档上传、解析、向量化，提供语义检索能力，为 Agent 提供领域知识支持，让 Agent 回答更准确、更专业。',
    link: 'https://functionai.console.aliyun.com/cn-hangzhou/agent/infra/knowledge',
    comingSoon: true,
  },
  {
    icon: 'fas fa-database',
    title: 'Memory Storage - 记忆存储',
    desc: '提供会话记忆、长期记忆存储能力，让 Agent 能够记住历史对话、用户偏好，实现更智能的多轮对话。',
    link: 'https://functionai.console.aliyun.com/cn-hangzhou/agent/infra/memory-storage',
    comingSoon: true,
  },
  {
    icon: 'fas fa-network-wired',
    title: 'Network - 网关',
    desc: '提供统一的 API 网关，支持流量管理、限流、鉴权、日志审计，为 Agent 提供稳定可靠的网络接入能力。',
    link: 'https://functionai.console.aliyun.com/cn-hangzhou/agent/infra/network',
    comingSoon: true,
  },
  {
    icon: 'fas fa-key',
    title: 'Certificate - 凭证管理',
    desc: '统一管理 API Key、Token、密钥等敏感信息，支持加密存储、权限控制、审计日志，确保凭证安全。',
    link: 'https://functionai.console.aliyun.com/cn-hangzhou/agent/infra/cert',
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Observable - 可观测',
    desc: '提供全链路追踪（Trace）、性能监控、成本归因、异常诊断，让 Agent 的每次调用都清晰可见，问题快速定位。',
    link: 'https://functionai.console.aliyun.com/cn-hangzhou/agent/infra/observable',
  },
  {
    icon: 'fas fa-store',
    title: 'Explore - Agent 市场',
    desc: 'Agent 市场提供丰富的模板和案例，开箱即用，快速部署，让你 3 分钟就能拥有自己的 Agent 应用。',
    link: 'https://functionai.console.aliyun.com/agent/explore',
    linkText: '立即探索',
  },
];

// 特性数据
const features = [
  {
    icon: 'fas fa-shield-virus',
    title: '高性能 Sandbox',
    items: [
      '内置多语言执行引擎（Python、Node.js、Java）',
      '支持代码解释器、浏览器沙箱、All-in-One 沙箱',
      'GPU 算力解耦与灵活调度',
      '企业级运行时与存储隔离',
    ],
  },
  {
    icon: 'fas fa-brain',
    title: '模型高可用',
    items: [
      '统一模型代理，支持 Qwen、百炼等国内主流供应商',
      '智能路由，自动选择最优模型',
      '熔断降级与多模型 Fallback',
      '安全围栏与内容审核',
    ],
  },
  {
    icon: 'fas fa-chart-line',
    title: '全链路可观测',
    items: [
      '端到端调用链追踪（Trace）',
      '细粒度成本归因与分析',
      '性能瓶颈智能诊断',
      '实时监控与告警',
    ],
  },
  {
    icon: 'fas fa-tools',
    title: '工具统一治理',
    items: [
      'Agent 市场和工具市场，提供开箱即用的能力',
      '标准化 MCP 封装，前置/后置 Hook 机制',
      '异步调用支持长时任务',
      '统一凭证管理与版本控制',
    ],
  },
  {
    icon: 'fas fa-plug',
    title: '开源生态集成',
    items: [
      '一键部署 Dify、RAGFlow、LiteLLM',
      '深度集成 ComfyUI、Stable Diffusion',
      '支持 AgentScope、LangChain、LlamaIndex',
      '模块化按需使用，灵活对接',
    ],
  },
  {
    icon: 'fas fa-shield-alt',
    title: '企业级安全',
    items: [
      '多维度隔离（会话、运行时、存储）',
      '统一凭证与权限管理',
      '完整审计日志与合规支持',
      '支持私有化部署',
    ],
  },
];

// 场景数据
const scenarios = [
  {
    icon: 'fas fa-headset',
    title: '企业智能客服',
    desc: '应对流量波动，7×24 小时稳定运行，按实际使用付费',
  },
  {
    icon: 'fas fa-bullhorn',
    title: '营销活动 Agent',
    desc: '活动期间自动扩容，活动结束自动缩容，成本可控',
  },
  {
    icon: 'fas fa-cloud',
    title: 'SaaS 平台 Agent 能力',
    desc: '多租户天然隔离，大客户自动扩容，小客户不浪费',
  },
  {
    icon: 'fas fa-book-reader',
    title: '内部知识库助手',
    desc: '零运维低成本，用时快速响应，不用时不产生费用',
  },
  {
    icon: 'fas fa-rocket',
    title: 'AI 创业公司',
    desc: '快速验证 MVP，支撑从 0 到百万用户的增长',
  },
  {
    icon: 'fas fa-project-diagram',
    title: '复杂 Workflow 编排',
    desc: '多 Agent 协作，全链路追踪，成本清晰可见',
  },
];

// 工具数据
const tools = [
  {
    icon: 'fas fa-code-branch',
    title: 'ServerlessDevs组件',
    desc: '一键部署、版本管理、灰度发布',
    link: 'https://github.com/devsapp/agentrun',
    linkIcon: 'fab fa-github',
    linkText: 'GitHub',
  },
  {
    icon: 'fab fa-python',
    title: 'Python SDK',
    desc: '完整的 Python SDK，快速集成',
    link: 'https://github.com/Serverless-Devs/agentrun-sdk-python',
    linkIcon: 'fab fa-github',
    linkText: 'GitHub',
  },
  {
    icon: 'fas fa-book',
    title: 'SDK 文档',
    desc: '快速开始指南、API 参考、最佳实践',
    link: 'https://docs.agent.run',
    linkIcon: 'fas fa-external-link-alt',
    linkText: '查看文档',
  },
  {
    icon: 'fas fa-desktop',
    title: '控制台',
    desc: '可视化管理、实时监控、日志查询',
    link: 'https://functionai.console.aliyun.com/cn-hangzhou/agent/runtime/agent-list',
    linkIcon: 'fas fa-external-link-alt',
    linkText: '打开控制台',
  },
];

// 生态数据
const ecosystems = [
  {
    icon: 'fas fa-robot',
    title: 'Agent 框架',
    items: ['AgentScope', 'LangChain', 'LlamaIndex'],
  },
  {
    icon: 'fas fa-cloud',
    title: '开源平台托管',
    items: ['Dify', 'RAGFlow', 'FastGPT', 'LiteLLM'],
  },
  {
    icon: 'fas fa-palette',
    title: '多模态创作',
    items: ['ComfyUI', 'Stable Diffusion', 'Cosy Voice'],
  },
  {
    icon: 'fas fa-microchip',
    title: '模型服务',
    items: ['Modelscope', 'HuggingFace', 'vLLM', 'Transformers'],
  },
];

function AgentRunIndex() {
  const { setColorMode } = useColorMode();
  useEffect(() => {
    setColorMode('dark');
  }, [setColorMode]);

  return (
    <main className='index-page bg-linear-to-b from-slate-900 via-slate-900 to-slate-800 text-white'>
      {/* Hero Section */}
      <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent'></div>
        <div className='container mx-auto px-4 text-center relative z-10'>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-8'>
            <i className='fas fa-award'></i>
            <span>
              阿里云函数计算 FC 孵化 | CNCF Sandbox 项目 Serverless Devs 支持
            </span>
          </div>

          <Heading
            as='h1'
            className='text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent'
          >
            函数计算 AgentRun
          </Heading>

          <p className='text-xl md:text-2xl text-blue-200 mb-4'>
            为更好用的 AI 基础设施而进化
          </p>
          <p className='text-lg text-slate-400 mb-4'>
            零运维、极致弹性、按量付费、安全可靠的 AI Agent 基础设施平台
          </p>

          <div className='flex flex-wrap justify-center gap-4 mb-16'>
            <a
              href='https://functionai.console.aliyun.com/cn-hangzhou/agent/runtime/agent-list'
              target='_blank'
              className='inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white! font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40'
            >
              <i className='fas fa-rocket'></i> 立即使用
            </a>
            <a
              href='https://docs.agent.run'
              target='_blank'
              className='inline-flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white! font-semibold rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300'
            >
              <i className='fas fa-book'></i> SDK 文档
            </a>
            <a
              href='https://github.com/devsapp/agentrun'
              target='_blank'
              className='inline-flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white! font-semibold rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300'
            >
              <i className='fab fa-github'></i> GitHub
            </a>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto'>
            {[
              { icon: 'fas fa-bolt', text: '零运维' },
              { icon: 'fas fa-coins', text: '按量付费' },
              { icon: 'fas fa-expand-arrows-alt', text: '毫秒级弹性' },
              { icon: 'fas fa-shield-alt', text: '企业级安全' },
            ].map((item, i) => (
              <div
                key={i}
                className='flex flex-col items-center gap-2 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-colors'
              >
                <i className={`${item.icon} text-2xl text-blue-400`}></i>
                <span className='text-slate-300 font-medium'>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className='py-24 bg-slate-900/50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>
            什么是 AgentRun？
          </h2>
          <div className='max-w-4xl mx-auto space-y-6 text-lg text-slate-300 leading-relaxed'>
            <p>
              函数计算 AgentRun 是一站式的 AI Agent 基础设施平台，为企业级 Agent
              提供从开发、部署到运维的全生命周期支持。它以函数计算（FC）为底座，继承了极致弹性、按量付费、零运维的核心优势。
            </p>
            <p>
              AgentRun 针对 Agent 场景提供高性能 Sandbox
              与企业级隔离、模型统一代理与治理、全链路可观测与成本管控、工具与
              MCP
              统一管理、以及完善的安全治理能力。平台深度集成主流开源生态，支持一键部署托管，并可模块化按需使用，与已有系统灵活对接。
            </p>
            <p>
              通过深度集成云原生服务，让开发者专注于业务逻辑，扫清 AI Agent
              规模化落地中的基础设施障碍。
            </p>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className='py-24'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-4'>
            AgentRun 核心模块
          </h2>
          <p className='text-slate-400 text-center mb-16'>
            模块化设计，按需使用，灵活集成
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {modules.map((m, i) => (
              <div
                key={i}
                className='group relative p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10'
              >
                {m.comingSoon && (
                  <span className='absolute top-4 right-4 inline-flex items-center gap-1 px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full'>
                    <i className='fas fa-clock'></i> 即将上线
                  </span>
                )}
                <i
                  className={`${m.icon} text-4xl text-blue-400 mb-4 block`}
                ></i>
                <h3 className='text-xl font-semibold mb-3'>{m.title}</h3>
                <p className='text-slate-400 text-sm mb-4 leading-relaxed'>
                  {m.desc}
                </p>
                <a
                  href={m.link}
                  target='_blank'
                  className='inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors'
                >
                  {m.linkText || '查看详情'}{' '}
                  <i className='fas fa-arrow-right'></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className='py-24 bg-slate-900/50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-4'>
            3 分钟部署你的第一个 Agent
          </h2>
          <p className='text-slate-400 text-center mb-12'>
            从 Agent 市场选择模板，点击「立即创建」快速部署
          </p>

          <div className='text-center mb-16'>
            <a
              href='https://functionai.console.aliyun.com/agent/explore'
              target='_blank'
              className='inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105'
            >
              <i className='fas fa-store'></i> 前往 Agent 市场
            </a>
          </div>

          <p className='text-slate-400 text-center mb-8'>
            或使用 Serverless Devs 组件部署
          </p>

          <div className='max-w-3xl mx-auto space-y-6'>
            <div className='bg-slate-800 rounded-xl p-6 font-mono text-sm overflow-x-auto'>
              <div className='text-slate-500 mb-2'># s.yaml</div>
              <CodeBlock language='yaml'>
                {`edition: 3.0.0
name: my-first-agent
access: default
resources:
  my-agent:
    component: agentrun
    props:
      region: cn-hangzhou
      agent:
        name: my-first-agent
        code:
          src: ./code
        language: python3.12
        command: [python3, main.py]
        cpu: 1.0
        memory: 2048
        port: 8000`}
              </CodeBlock>
            </div>

            <div className='bg-slate-800 rounded-xl p-6 font-mono text-sm'>
              <div className='text-slate-500 mb-2'>
                # 1. 安装 Serverless Devs
              </div>
              <div className='text-green-400 mb-4'>
                npm install -g @serverless-devs/s
              </div>
              <div className='text-slate-500 mb-2'># 2. 配置访问凭证</div>
              <div className='text-green-400 mb-4'>s config add</div>
              <div className='text-slate-500 mb-2'># 3. 一键部署</div>
              <div className='text-green-400'>s deploy</div>
            </div>
          </div>

          <div className='flex flex-wrap justify-center gap-4 mt-12'>
            <a
              href='https://docs.agent.run'
              target='_blank'
              className='inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors'
            >
              <i className='fas fa-book'></i> 查看 SDK 完整文档
            </a>
            <a
              href='https://github.com/devsapp/agentrun'
              target='_blank'
              className='inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors'
            >
              <i className='fab fa-github'></i> ServerlessDevs组件
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-24'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>
            为 Agent 场景深度优化的核心能力
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {features.map((f, i) => (
              <div
                key={i}
                className='p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50'
              >
                <i
                  className={`${f.icon} text-3xl text-blue-400 mb-4 block`}
                ></i>
                <h3 className='text-xl font-semibold mb-4'>{f.title}</h3>
                <ul className='space-y-3'>
                  {f.items.map((item, j) => (
                    <li
                      key={j}
                      className='flex items-start gap-2 text-slate-400 text-sm'
                    >
                      <i className='fas fa-check-circle text-green-400 mt-0.5 shrink-0'></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios Section */}
      <section className='py-24 bg-slate-900/50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>
            适用于各种 Agent 应用场景
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {scenarios.map((s, i) => (
              <div
                key={i}
                className='p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-colors text-center'
              >
                <i
                  className={`${s.icon} text-4xl text-blue-400 mb-4 block`}
                ></i>
                <h3 className='text-lg font-semibold mb-2'>{s.title}</h3>
                <p className='text-slate-400 text-sm'>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Tools Section */}
      <section className='py-24'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>
            强大的开发者工具链
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {tools.map((t, i) => (
              <div
                key={i}
                className='p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 text-center'
              >
                <i
                  className={`${t.icon} text-4xl text-blue-400 mb-4 block`}
                ></i>
                <h3 className='text-lg font-semibold mb-2'>{t.title}</h3>
                <p className='text-slate-400 text-sm mb-4'>{t.desc}</p>
                <a
                  href={t.link}
                  target='_blank'
                  className='inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors'
                >
                  <i className={t.linkIcon}></i> {t.linkText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className='py-24 bg-slate-900/50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>
            深度集成主流开源生态
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {ecosystems.map((e, i) => (
              <div
                key={i}
                className='p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50'
              >
                <h3 className='flex items-center gap-2 text-lg font-semibold mb-4'>
                  <i className={`${e.icon} text-blue-400`}></i> {e.title}
                </h3>
                <ul className='space-y-2'>
                  {e.items.map((item, j) => (
                    <li key={j} className='text-slate-400 text-sm'>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Endorsement Section */}
      <section className='py-24'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-4'>
            强大的技术背书
          </h2>
          <p className='text-slate-400 text-center mb-16 mx-auto'>
            AgentRun 由阿里云函数计算 FC 孵化，开源部分（SDK、组件等）由 CNCF
            Sandbox 项目 Serverless Devs 孵化
          </p>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
            {[
              {
                icon: 'fas fa-cloud',
                title: '阿里云函数计算 FC',
                subtitle: '企业级 Serverless 平台',
              },
              {
                icon: 'fas fa-globe',
                title: 'CNCF Sandbox 项目',
                subtitle: 'Serverless Devs',
              },
              {
                icon: 'fas fa-code-branch',
                title: '完全开源',
                subtitle: 'SDK & 组件',
              },
            ].map((b, i) => (
              <div
                key={i}
                className='p-8 bg-linear-to-br from-slate-800 to-slate-800/50 rounded-2xl border border-slate-700/50 text-center'
              >
                <i
                  className={`${b.icon} text-5xl text-blue-400 mb-4 block`}
                ></i>
                <div className='text-lg font-semibold'>{b.title}</div>
                <div className='text-slate-400 text-sm'>{b.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 bg-linear-to-r from-blue-900/50 to-purple-900/50'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            准备好开始了吗？
          </h2>
          <p className='text-slate-300 mb-8'>
            立即使用 AgentRun，3 分钟部署你的第一个生产级 Agent
          </p>

          <div className='flex flex-wrap justify-center gap-4'>
            <a
              href='https://functionai.console.aliyun.com/agent/explore'
              target='_blank'
              className='inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105'
            >
              <i className='fas fa-store'></i> 前往 Agent 市场
            </a>
            <a
              href='https://docs.agent.run'
              target='_blank'
              className='inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all duration-300'
            >
              <i className='fas fa-book'></i> 查看 SDK 文档
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description='阿里云 AI Agent 运行时服务'
    >
      <AgentRunIndex />
    </Layout>
  );
}
