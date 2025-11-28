# SDK 仓库配置
SDK_REPO := https://github.com/Serverless-Devs/agentrun-sdk-python.git
SDK_DIR := sdk/python
SDK_BRANCH := main

# 阿里云 OSS 配置 (通过环境变量或 .env 文件配置)
OSS_BUCKET ?= $(AGENTRUN_DOCS_OSS_BUCKET)
OSS_ENDPOINT ?= $(AGENTRUN_DOCS_OSS_ENDPOINT)


.PHONY: help
help: ## 显示帮助文件
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {sub("\\\\n",sprintf("\n%22c"," "), $$2);printf "\033[36m%-40s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)



.PHONY: install-js
install-js:
	npm i

.PHONY: install-py
install-py:
	
.PHONY: install
install: install-py install-js ## 安装所有依赖



.PHONY: sync-sdk
sync-sdk: ## 拉取/更新 SDK 源码
	@echo "🔄 同步 Python SDK 源码..."
	@if [ -d "$(SDK_DIR)" ]; then \
		echo "   更新已有仓库..."; \
		cd $(SDK_DIR) && git fetch origin && git reset --hard origin/$(SDK_BRANCH); \
	else \
		echo "   克隆仓库..."; \
		mkdir -p sdk; \
		git clone --depth 1 --branch $(SDK_BRANCH) $(SDK_REPO) $(SDK_DIR); \
	fi
	@echo "✅ SDK 同步完成"


.PHONY: gen
gen: sync-sdk ## 从 SDK 源码生成 API 文档（自定义脚本）
	@echo "📚 生成 API 文档（自定义脚本）..."
	@if [ ! -d "$(SDK_DIR)" ]; then \
		echo "❌ SDK 目录不存在，请先运行 make sync-sdk"; \
		exit 1; \
	fi
	python3 scripts/generate_api_docs.py --sdk-path $(SDK_DIR)
	@echo "✅ API 文档生成完成"

.PHONY: dev
dev: ## 启动开发服务器
	@echo "🚀 启动开发服务器..."
	npm run start

.PHONY: build
build: ## 构建静态文档
	@echo "🔨 构建静态文档..."
	npm run build
	@echo "✅ 构建完成，输出目录: build/"

.PHONY: deploy
deploy: build ## 部署到阿里云 OSS
	@echo "🚀 部署到阿里云 OSS..."
	@if [ -z "$(OSS_BUCKET)" ]; then \
		echo "❌ 错误: 未配置 OSS_BUCKET"; \
		echo "   请设置环境变量 AGENTRUN_DOCS_OSS_BUCKET 或复制 .env.example 为 .env"; \
		exit 1; \
	fi
	@if [ -z "$(OSS_ENDPOINT)" ]; then \
		echo "❌ 错误: 未配置 OSS_ENDPOINT"; \
		echo "   请设置环境变量 AGENTRUN_DOCS_OSS_ENDPOINT 或复制 .env.example 为 .env"; \
		exit 1; \
	fi
	@command -v ossutil >/dev/null 2>&1 || { \
		echo "❌ 错误: ossutil 未安装"; \
		echo "   请参考: https://help.aliyun.com/document_detail/120075.html"; \
		exit 1; \
	}
	ossutil cp -r build/ oss://$(OSS_BUCKET)/ --endpoint $(OSS_ENDPOINT) -f
	@echo "✅ 部署完成"

.PHONY: clean
clean: ## 清理构建文件
	@echo "🧹 清理构建文件..."
	@rm -rf build
	@rm -rf .docusaurus
	@rm -rf node_modules
	@rm -rf sdk
	@echo "✅ 清理完成"