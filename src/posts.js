export const featuredPosts = [
  {
    slug: 'launching-the-blog',
    title: 'Launching the blog foundation',
    excerpt:
      'A short introduction to the project structure, publishing goals, and the first milestones for this blog.',
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
    author: 'Product Team',
    date: '2026-07-03',
    tags: ['Workflow', 'Roadmap'],
    readingTime: '5 min read',
  },
];

export function getAllTags(posts) {
  return [...new Set(posts.flatMap((post) => post.tags))].sort((firstTag, secondTag) =>
    firstTag.localeCompare(secondTag),
  );
}

export function filterPosts(posts, { query = '', tag = 'All' } = {}) {
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
