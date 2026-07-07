import { createApp } from './app.js';
import { env } from './env.js';

const app = createApp();

const server = app.listen(env.port, () => {
  console.log(`[server] API 运行于 http://localhost:${env.port}/api`);
});

function shutdown(signal: string): void {
  console.log(`[server] 收到 ${signal}，正在关闭...`);
  server.close(() => process.exit(0));
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
