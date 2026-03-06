# 证书自动更新（Let's Encrypt + 阿里云 OSS）

基于 **Let's Encrypt**（ACME DNS-01）自动申请证书，并通过 **阿里云云解析** 完成域名验证，最后将证书与私钥上传到 **阿里云 OSS**。适用于部署在 **阿里云函数计算 3.0**，由定时触发器每月 1 号执行。

## 功能

- 使用 **DNS-01** 验证，域名需在 **阿里云云解析** 托管
- 通过 **acme-client** 与 Let's Encrypt 通信，自动申请/续期证书
- 证书与私钥上传到指定 OSS Bucket，路径：`{CERT_OSS_PREFIX}{域名}/fullchain.pem`、`privkey.pem`
- 单文件构建（Vite + TypeScript），依赖打包进 `dist/index.js`，便于 FC 部署

## 环境变量

| 变量名 | 必填 | 说明 |
|--------|------|------|
| `CERT_DOMAIN` | 是 | 申请证书的域名，多域名逗号分隔，首项为主域名 |
| `CERT_OSS_BUCKET` | 是 | 证书上传到的 OSS Bucket 名称 |
| `CERT_OSS_REGION` | 否 | OSS 地域，默认 `oss-cn-hangzhou` |
| `CERT_OSS_PREFIX` | 否 | OSS 对象前缀，如 `certs/` |
| `ACME_ACCOUNT_EMAIL` | 是 | Let's Encrypt 账号邮箱 |
| `ACME_DIRECTORY_URL` | 否 | ACME 目录 URL，不设则使用生产环境；测试可设为 `https://acme-staging-v02.api.letsencrypt.org/directory` |

函数计算通过 **RAM 角色** 注入临时凭证（`ACS_ACCESS_KEY_ID`、`ACS_ACCESS_KEY_SECRET`、`ACS_SECURITY_TOKEN`），无需在环境变量中配置 AK/SK。本地调试时可配置 `ALIBABA_CLOUD_ACCESS_KEY_ID`、`ALIBABA_CLOUD_ACCESS_KEY_SECRET`。

## RAM 角色权限

函数使用的 RAM 角色需具备：

1. **云解析 DNS**：`AddDomainRecord`、`DescribeDomainRecords`、`DeleteDomainRecord`（用于 DNS-01 的 TXT 记录添加与删除）
2. **OSS**：目标 Bucket 的 `PutObject`、`GetObject`、`ListObjects`（上传与可选读取）

最小权限示例见 [阿里云文档](https://help.aliyun.com/document_detail/31883.html)。

## 构建与部署

### 构建

```bash
cd scripts/cert
npm install
npm run build
```

产物为 `dist/index.js`（单文件，含依赖）。

### 部署（Serverless Devs）

1. 安装并配置 Serverless Devs：`npm install -g @serverless-devs/s`，`s config add` 配置阿里云密钥。
2. 在项目根或 `scripts/cert` 下配置 `.env`（或导出环境变量），包含：
   - `CERT_DOMAIN`
   - `CERT_OSS_BUCKET`
   - `ACME_ACCOUNT_EMAIL`
   - `FC_ROLE_ARN`（RAM 角色 ARN）
   - 可选：`CERT_OSS_REGION`、`CERT_OSS_PREFIX`
3. 部署：

```bash
cd scripts/cert
npm run build
s deploy
```

部署后，定时触发器将在 **每月 1 号 0 点（北京时间）** 执行一次。

## OSS 证书路径

- 全链证书：`{CERT_OSS_PREFIX}{主域名}/fullchain.pem`
- 私钥：`{CERT_OSS_PREFIX}{主域名}/privkey.pem`

例如 `CERT_OSS_PREFIX=certs/`、主域名为 `example.com` 时，路径为 `certs/example.com/fullchain.pem` 与 `certs/example.com/privkey.pem`。

## 注意事项与安全

- 私钥与证书仅上传到 OSS，不在日志或返回值中输出。
- Let's Encrypt 有速率限制，每月 1 号执行一次在限制内；失败时避免短时间多次重试。
- 确保 `CERT_DOMAIN` 已在阿里云云解析中托管，否则 DNS 写记录会失败。
- 首次建议使用 `ACME_DIRECTORY_URL` 指向 staging 验证流程，再切回生产。
