# My Blog Test

一个使用 TypeScript 实现的前后端分离个人博客项目。前端基于 React + Vite，后端基于 Express + Prisma + SQLite，支持文章 CRUD 与 JWT 简单鉴权。

## 技术栈

- **前端 `client/`**：React 18 + React Router + Vite + TypeScript
- **后端 `server/`**：Express + Prisma + SQLite + JWT + bcryptjs + zod
- **根目录**：npm workspaces + `concurrently`（一条命令同时启动前后端）

## 目录结构

```
my-blog-test/
├── package.json              # workspaces 根 + 便捷脚本
├── tsconfig.base.json        # 共享 TS 配置
├── client/                   # React + Vite + TS 前端
│   └── src/                  # 页面 / 组件 / API 封装 / 样式
└── server/                   # Express + Prisma + TS 后端
    ├── prisma/               # schema + seed
    └── src/                  # 路由 / 中间件 / 类型 / 业务逻辑
```

## 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp server/.env.example server/.env

# 3. 初始化数据库（生成 SQLite 文件 + 种子数据）
npm run db:migrate
npm run db:seed

# 4. 启动开发服务（前端 5173 + 后端 3000 同时运行）
npm run dev
```

- 前端：http://localhost:5173
- 后端 API：http://localhost:3000/api

## 默认管理员账号

种子数据会创建：

- 用户名：`admin`
- 密码：`admin123`

> 仅用于本地开发。生产环境请修改密码与 `JWT_SECRET`。

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 同时启动前后端开发服务 |
| `npm run build` | 构建前端（client/dist）与编译后端（server/dist） |
| `npm run test` | 运行后端单元测试（vitest） |
| `npm run lint` | 对前后端分别执行 lint |
| `npm run db:migrate` | 运行 Prisma 迁移 |
| `npm run db:seed` | 写入种子数据 |

## API 一览

- 公开：`GET /api/posts?q=&tag=`、`GET /api/posts/:slug`
- 鉴权（需 `Authorization: Bearer <jwt>`）：`POST /api/posts`、`PUT /api/posts/:slug`、`DELETE /api/posts/:slug`
- 登录：`POST /api/auth/login` → `{ token }`
