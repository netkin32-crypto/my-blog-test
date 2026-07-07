import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Prisma 默认从 schema.prisma 所在目录读取 .env，
// 这里在运行时也加载 server/.env，确保 dev 与编译后行为一致。
process.env.DATABASE_URL ??= 'file:./data/blog.db';

function required(name: string, fallback: string): string {
  const value = process.env[name];
  if (value === undefined || value.length === 0) {
    return fallback;
  }
  return value;
}

export const env = {
  port: Number.parseInt(process.env.PORT ?? '3000', 10),
  jwtSecret: required('JWT_SECRET', 'dev-secret-change-me'),
  adminUsername: required('ADMIN_USERNAME', 'admin'),
  adminPassword: required('ADMIN_PASSWORD', 'admin123'),
  isProd: process.env.NODE_ENV === 'production',
  serveClient: process.env.SERVE_CLIENT === 'true',
  clientDistPath: path.resolve(dirname, '../../client/dist'),
} as const;
