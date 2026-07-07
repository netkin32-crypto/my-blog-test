import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { prisma } from '../prisma.js';
import { env } from '../env.js';
import { loginSchema } from '../types.js';
import type { AuthPayload } from '../types.js';

export const authRouter = Router();

authRouter.post('/login', async (request, response, next) => {
  try {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) {
      response.status(400).json({ error: '请求参数无效', details: parsed.error.flatten() });
      return;
    }

    const { username, password } = parsed.data;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      response.status(401).json({ error: '用户名或密码错误' });
      return;
    }

    const token = jwt.sign({ sub: String(user.id), username: user.username }, env.jwtSecret, {
      expiresIn: '7d',
    });

    const payload: AuthPayload = { token };
    response.json(payload);
  } catch (error) {
    next(error);
  }
});
