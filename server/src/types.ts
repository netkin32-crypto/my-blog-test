import { z } from 'zod';

// ===== API 类型 =====

export interface PostDTO {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string; // ISO 字符串
  tags: string[];
  readingTime: string;
}

export interface AuthPayload {
  token: string;
}

// ===== Zod 校验 =====

export const createPostSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'slug 只能包含小写字母、数字和连字符'),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  author: z.string().min(1),
  date: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
});

export const updatePostSchema = createPostSchema.partial();

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
