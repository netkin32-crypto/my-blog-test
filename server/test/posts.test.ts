import { describe, it, expect } from 'vitest';

import { filterPosts, getAllTags } from '../src/lib/posts.js';
import type { PostDTO } from '../src/types.js';

const basePosts: PostDTO[] = [
  {
    id: 1,
    slug: 'launching-the-blog',
    title: 'Launching the blog foundation',
    excerpt:
      'A short introduction to the project structure, publishing goals, and the first milestones for this blog.',
    content: '',
    author: 'Editorial Team',
    date: '2026-07-03T00:00:00.000Z',
    tags: ['Project', 'Planning'],
    readingTime: '3 min read',
  },
  {
    id: 2,
    slug: 'designing-for-readable-posts',
    title: 'Designing for readable posts',
    excerpt:
      'Typography, spacing, and metadata patterns that help readers scan articles and find context quickly.',
    content: '',
    author: 'Design Desk',
    date: '2026-07-03T00:00:00.000Z',
    tags: ['Design', 'UX'],
    readingTime: '4 min read',
  },
  {
    id: 3,
    slug: 'content-workflow-next-steps',
    title: 'Content workflow next steps',
    excerpt:
      'A practical roadmap for adding markdown content, categories, search, and editorial review tools.',
    content: '',
    author: 'Product Team',
    date: '2026-07-03T00:00:00.000Z',
    tags: ['Workflow', 'Roadmap'],
    readingTime: '5 min read',
  },
];

describe('getAllTags', () => {
  it('返回去重并按字母序排序的标签', () => {
    expect(getAllTags(basePosts)).toEqual(['Design', 'Planning', 'Project', 'Roadmap', 'UX', 'Workflow']);
  });
});

describe('filterPosts', () => {
  it('按 query 过滤', () => {
    expect(filterPosts(basePosts, { query: 'typography' }).map((p) => p.slug)).toEqual([
      'designing-for-readable-posts',
    ]);
  });

  it('按 tag 过滤', () => {
    expect(filterPosts(basePosts, { tag: 'Workflow' }).map((p) => p.slug)).toEqual([
      'content-workflow-next-steps',
    ]);
  });

  it('query + tag 同时生效（AND）', () => {
    expect(filterPosts(basePosts, { query: 'roadmap', tag: 'Workflow' }).map((p) => p.slug)).toEqual([
      'content-workflow-next-steps',
    ]);
  });

  it('不匹配时返回空数组', () => {
    expect(filterPosts(basePosts, { query: 'roadmap', tag: 'Design' })).toEqual([]);
  });

  it('默认参数返回全部', () => {
    expect(filterPosts(basePosts)).toHaveLength(3);
  });
});
