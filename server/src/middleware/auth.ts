import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../env.js';

export interface AuthenticatedRequest extends Request {
  userId?: number;
  username?: string;
}

export function authRequired(request: AuthenticatedRequest, response: Response, next: NextFunction): void {
  const header = request.header('authorization');
  const token = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : undefined;

  if (!token) {
    response.status(401).json({ error: '未提供认证令牌' });
    return;
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret) as { sub: string; username: string };
    request.userId = Number(payload.sub);
    request.username = payload.username;
    next();
  } catch {
    response.status(401).json({ error: '认证令牌无效或已过期' });
  }
}
