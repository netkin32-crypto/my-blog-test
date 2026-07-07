import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedPosts = [
  {
    slug: 'launching-the-blog',
    title: 'Launching the blog foundation',
    excerpt:
      'A short introduction to the project structure, publishing goals, and the first milestones for this blog.',
    content:
      'This sample post marks the starting point for the blog content workflow. ' +
      'We cover the project structure, publishing goals, and the first milestones. ' +
      'Welcome aboard as we build a thoughtful editorial experience together.',
    author: 'Editorial Team',
    date: '2026-07-03',
    tags: ['Project', 'Planning'],
    readingTime: '3 min read',
  },
  {
    slug: 'designing-for-readable-posts',
    title: 'Designing for readable posts',
    excerpt:
      'Typography, spacing, and metadata patterns that help readers scan articles and find context quickly.',
    content:
      'Typography, spacing, and metadata patterns that help readers scan articles and find context quickly. ' +
      'In this post we explore type scale, line height, and the role of metadata in guiding the eye.',
    author: 'Design Desk',
    date: '2026-07-03',
    tags: ['Design', 'UX'],
    readingTime: '4 min read',
  },
  {
    slug: 'content-workflow-next-steps',
    title: 'Content workflow next steps',
    excerpt:
      'A practical roadmap for adding markdown content, categories, search, and editorial review tools.',
    content:
      'A practical roadmap for adding markdown content, categories, search, and editorial review tools. ' +
      'We outline how the content pipeline will evolve over the coming months.',
    author: 'Product Team',
    date: '2026-07-03',
    tags: ['Workflow', 'Roadmap'],
    readingTime: '5 min read',
  },
];

async function main(): Promise<void> {
  console.log('[seed] 开始写入种子数据...');

  // 文章：用 upsert，重复执行幂等
  for (const post of seedPosts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        date: new Date(post.date),
        tags: JSON.stringify(post.tags),
        readingTime: post.readingTime,
      },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        date: new Date(post.date),
        tags: JSON.stringify(post.tags),
        readingTime: post.readingTime,
      },
    });
    console.log(`[seed] 文章已就绪: ${post.slug}`);
  }

  // 管理员账号
  const username = process.env.ADMIN_USERNAME ?? 'admin';
  const password = process.env.ADMIN_PASSWORD ?? 'admin123';
  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { username },
    update: {},
    create: { username, password: hashed },
  });
  console.log(`[seed] 管理员账号已就绪: ${username}`);

  console.log('[seed] 完成。');
}

main()
  .catch((error) => {
    console.error('[seed] 失败:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
