import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { env } from './env.js';
import { postsRouter } from './routes/posts.js';
import { authRouter } from './routes/auth.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export function createApp(): express.Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // API 路由
  app.use('/api/posts', postsRouter);
  app.use('/api/auth', authRouter);

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
  });

  // 生产环境可选：托管前端构建产物
  if (env.serveClient) {
    app.use(express.static(env.clientDistPath));
    app.get('*', (_request, response) => {
      response.sendFile(path.resolve(env.clientDistPath, 'index.html'));
    });
  }

  // 统一错误处理
  app.use(
    (
      error: unknown,
      _request: express.Request,
      response: express.Response,
      _next: express.NextFunction,
    ) => {
      console.error(error);
      const message = error instanceof Error ? error.message : '服务器内部错误';
      response.status(500).json({ error: message });
    },
  );

  return app;
}

export { dirname };
