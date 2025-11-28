# AgentRun SDK 文档

本目录包含 AgentRun SDK 的文档源码，使用 [Docusaurus](https://docusaurus.io/) 构建。

## 快速开始

### 安装依赖

```bash
cd docs
npm install
```

### 本地开发

```bash
npm run start
```

访问 http://localhost:3000 查看文档。

### 构建

```bash
npm run build
```

构建产物在 `build/` 目录。

### 预览构建结果

```bash
npm run serve
```

## 目录结构

```
docs/
├── docusaurus.config.js    # Docusaurus 配置
├── sidebars.js             # 侧边栏配置
├── package.json            # 依赖配置
├── docs/                   # Markdown 文档
│   ├── intro.md            # 首页
│   ├── quick-start.md      # 快速开始
│   ├── concepts/           # 核心概念
│   ├── guides/             # 使用指南
│   ├── integrations/       # 集成文档
│   ├── api/                # API 参考
│   ├── faq.md              # 常见问题
│   └── changelog.md        # 更新日志
├── static/                 # 静态资源
│   └── img/                # 图片
└── scripts/                # 脚本
    └── generate-api-docs.sh
```

## 编写文档

### 添加新页面

1. 在 `docs/` 目录下创建 `.md` 文件
2. 在文件头部添加 frontmatter：
   ```yaml
   ---
   sidebar_position: 1
   ---
   ```
3. 在 `sidebars.js` 中添加导航

### 文档规范

- 使用中文编写
- 代码示例使用真实可运行的代码
- 添加适当的提示框（:::tip、:::warning 等）

## 部署

文档会通过 GitHub Actions 自动部署到阿里云 OSS。

### 触发条件

- main 分支 push
- docs/ 目录有变更
- 手动触发（workflow_dispatch）

### 配置 GitHub Secrets

在 GitHub 仓库的 **Settings > Secrets and variables > Actions** 中配置：

| Secret 名称 | 必填 | 说明 |
|------------|------|------|
| `ALIYUN_ACCESS_KEY_ID` | ✅ | 阿里云 Access Key ID |
| `ALIYUN_ACCESS_KEY_SECRET` | ✅ | 阿里云 Access Key Secret |
| `OSS_BUCKET` | ✅ | OSS Bucket 名称（如 `agentrun-docs`） |
| `ALIYUN_REGION` | ❌ | 阿里云区域，默认 `cn-hangzhou` |
| `OSS_PATH` | ❌ | OSS 部署路径，默认 `/` |

### 手动触发部署

在 GitHub Actions 页面找到 **Deploy Docs** 工作流，点击 **Run workflow** 即可手动触发。

## 相关链接

- [Docusaurus 文档](https://docusaurus.io/docs)
- [Markdown 语法](https://docusaurus.io/docs/markdown-features)
