import { Router } from 'express';

import { prisma } from '../prisma.js';
import { createPostSchema, updatePostSchema } from '../types.js';
import { filterPosts, toPostCreateData, toPostDTO } from '../lib/posts.js';
import { authRequired, type AuthenticatedRequest } from '../middleware/auth.js';

export const postsRouter = Router();

// 列表（公开，支持 q/tag 过滤）
postsRouter.get('/', async (request, response, next) => {
  try {
    const q = typeof request.query.q === 'string' ? request.query.q : '';
    const tag = typeof request.query.tag === 'string' ? request.query.tag : 'All';

    const rows = await prisma.post.findMany({ orderBy: { date: 'desc' } });
    const posts = rows.map(toPostDTO);
    const filtered = filterPosts(posts, { query: q, tag });

    response.json({ posts: filtered, total: filtered.length });
  } catch (error) {
    next(error);
  }
});

// 详情（公开）
postsRouter.get('/:slug', async (request, response, next) => {
  try {
    const post = await prisma.post.findUnique({ where: { slug: request.params.slug } });

    if (!post) {
      response.status(404).json({ error: '文章不存在' });
      return;
    }

    response.json({ post: toPostDTO(post) });
  } catch (error) {
    next(error);
  }
});

// 创建（鉴权）
postsRouter.post('/', authRequired, async (request: AuthenticatedRequest, response, next) => {
  try {
    const parsed = createPostSchema.safeParse(request.body);
    if (!parsed.success) {
      response.status(400).json({ error: '请求参数无效', details: parsed.error.flatten() });
      return;
    }

    const existing = await prisma.post.findUnique({ where: { slug: parsed.data.slug } });
    if (existing) {
      response.status(409).json({ error: '该 slug 已存在' });
      return;
    }

    const created = await prisma.post.create({ data: toPostCreateData(parsed.data) });
    response.status(201).json({ post: toPostDTO(created) });
  } catch (error) {
    next(error);
  }
});

// 更新（鉴权）
postsRouter.put('/:slug', authRequired, async (request: AuthenticatedRequest, response, next) => {
  try {
    const parsed = updatePostSchema.safeParse(request.body);
    if (!parsed.success) {
      response.status(400).json({ error: '请求参数无效', details: parsed.error.flatten() });
      return;
    }

    const { slug: newSlug, tags, date, ...rest } = parsed.data;
    const data: Record<string, unknown> = { ...rest };

    if (newSlug !== undefined) data.slug = newSlug;
    if (tags !== undefined) data.tags = JSON.stringify(tags);
    if (date !== undefined) data.date = new Date(date);
    if (parsed.data.content !== undefined) {
      data.readingTime = (await import('../lib/posts.js')).computeReadingTime(parsed.data.content);
    }

    const updated = await prisma.post.update({
      where: { slug: request.params.slug },
      data,
    });

    response.json({ post: toPostDTO(updated) });
  } catch (error) {
    next(error);
  }
});

// 删除（鉴权）
postsRouter.delete('/:slug', authRequired, async (request: AuthenticatedRequest, response, next) => {
  try {
    await prisma.post.delete({ where: { slug: request.params.slug } });
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});
