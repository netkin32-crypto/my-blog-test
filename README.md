# My Blog Test

A lightweight starter blog application built with plain HTML, CSS, and JavaScript. The app ships with a polished landing page, featured post cards, sample content, a tiny static build script, a dependency-free development server, and Node-based checks.

## Languages / 言語 / 语言

- [English](#english)
- [日本語](#日本語)
- [中文](#中文)

## English

### Overview

This project provides a practical foundation for a blog experience:

- A responsive interface for browsing featured posts
- Sample post metadata in `src/posts.js`
- A starter markdown content area in `content/`
- Dependency-free scripts for local development, testing, linting, and static builds

### Project Structure

```text
.
├── content/             # File-based blog content drafts or samples
├── public/              # Static assets
├── scripts/             # Development, build, and lint scripts
├── src/                 # Application source code
│   ├── main.js          # Renders featured post cards
│   ├── posts.js         # Featured post metadata
│   └── styles.css       # Application styling
├── test/                # Node test runner tests
├── index.html           # Static app entrypoint
└── package.json         # Project scripts
```

### Getting Started

No dependency install is required.

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open <http://localhost:5173> in your browser.

### Configuration

Copy `.env.example` to `.env` when local environment variables are needed.

```env
PUBLIC_SITE_URL=http://localhost:5173
```

### Development

Useful scripts:

```bash
npm run dev       # Start the local static development server
npm run build     # Copy the static site into dist/
npm run test      # Run Node test runner checks
npm run lint      # Run lightweight repository lint checks
```

### Testing

Run all automated checks before opening a pull request:

```bash
npm run lint
npm run test
npm run build
```

### Deployment

Build the app with `npm run build` and deploy the generated `dist/` directory to any static hosting provider.

## 日本語

### 概要

このプロジェクトは、HTML、CSS、JavaScript だけで構成されたブログアプリのスターターです。レスポンシブな記事一覧、サンプル記事メタデータ、Markdown コンテンツ領域、依存関係なしの開発・テスト・Lint・ビルドスクリプトを含みます。

### はじめに

```bash
npm run dev
```

<http://localhost:5173> をブラウザで開いてください。依存関係のインストールは不要です。

### 開発メモ

- 記事データは `src/posts.js` に定義されています。
- サンプル記事は `content/` に配置されています。
- 変更前後に `npm run lint`、`npm run test`、`npm run build` を実行してください。

## 中文

### 概述

此项目是一个使用 HTML、CSS 和 JavaScript 构建的博客应用脚手架，包含响应式文章列表、示例文章元数据、Markdown 内容目录，以及无需依赖安装的开发、测试、Lint 和构建脚本。

### 快速开始

```bash
npm run dev
```

请打开 <http://localhost:5173>。无需安装依赖。

### 开发说明

- 文章数据位于 `src/posts.js`。
- 示例文章位于 `content/`。
- 提交前请运行 `npm run lint`、`npm run test` 和 `npm run build`。
