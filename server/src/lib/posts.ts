import type { Prisma, Post } from '@prisma/client';

import type { PostDTO } from '../types.js';

export interface PostFilter {
  query?: string;
  tag?: string;
}

/**
 * 计算大致阅读时长（按 200 词/分钟估算，中文按 400 字/分钟）。
 */
export function computeReadingTime(content: string): string {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = Array.from(content).filter((ch) => ch.trim().length > 0).length;
  const minutes = Math.max(1, Math.round(wordCount / 200 + charCount / 800));
  return `${minutes} min read`;
}

/**
 * 从 Prisma 行转换为对外 DTO（tags 反序列化，date 转 ISO）。
 */
export function toPostDTO(post: Post): PostDTO {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    date: post.date.toISOString(),
    tags: parseTags(post.tags),
    readingTime: post.readingTime,
  };
}

/**
 * DTO 转为 Prisma 写入数据（tags 序列化）。
 */
export function toPostCreateData(input: {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
}): Prisma.PostCreateInput {
  return {
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    content: input.content,
    author: input.author,
    date: new Date(input.date),
    tags: JSON.stringify(input.tags),
    readingTime: computeReadingTime(input.content),
  };
}

export function parseTags(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((t) => typeof t === 'string') : [];
  } catch {
    return [];
  }
}

/**
 * 收集所有文章的去重标签，按字母序排序。从旧项目迁移而来。
 */
export function getAllTags(posts: Pick<PostDTO, 'tags'>[]): string[] {
  return [...new Set(posts.flatMap((post) => post.tags))].sort((firstTag, secondTag) =>
    firstTag.localeCompare(secondTag),
  );
}

/**
 * 在内存中对文章列表做 query + tag 过滤。从旧项目迁移而来。
 */
export function filterPosts(posts: PostDTO[], { query = '', tag = 'All' }: PostFilter = {}): PostDTO[] {
  const normalizedQuery = query.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesTag = tag === 'All' || post.tags.includes(tag);
    const searchableText = [post.title, post.excerpt, post.author, ...post.tags]
      .join(' ')
      .toLowerCase();
    const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

    return matchesTag && matchesQuery;
  });
}

export type { Post };
