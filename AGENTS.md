# Repository Guidelines

## Project Overview

本仓库是一个使用 TypeScript 实现的前后端分离个人博客。前端位于 `client/`（React + Vite + TS），后端位于 `server/`（Express + Prisma + SQLite + JWT），根目录使用 npm workspaces 统一管理。

## Development Instructions

- 在根目录使用 `npm install` 安装两个 workspace 的依赖；尽量把公共依赖放在根，各包专用依赖放在对应子包。
- 后端使用 TypeScript + ES modules；前端使用 Vite + React + TS。
- 后端样式不做要求；前端样式集中在 `client/src/styles.css`，保持响应式与无障碍。
- 新增类型时优先复用 `server/src/types.ts` 或 `client/src/types.ts` 中已有的定义。
- 不要用 `try`/`catch` 包裹 import 语句。
- 避免制表符缩进与行尾空格。
- Prisma schema 修改后，先 `npm run db:migrate` 再 `npm run db:seed`。

## Checks

提交前请运行：

```bash
npm run lint
npm run test
npm run build
```

## Pull Request Notes

PR 描述中请简要说明面向用户的改动，并列出运行过的检查。
