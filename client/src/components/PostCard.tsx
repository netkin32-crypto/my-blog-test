import { Link } from 'react-router-dom';
import type { JSX } from 'react';

import type { Post } from '../types';

const formatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export function PostCard({ post }: { post: Post }): JSX.Element {
  return (
    <Link to={`/posts/${post.slug}`} className="post-card">
      <div className="post-meta">
        <time dateTime={post.date}>{formatter.format(new Date(post.date))}</time>
        <span>{post.readingTime}</span>
      </div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div className="post-footer">
        <span>{post.author}</span>
        <div className="tags" aria-label={`Tags for ${post.title}`}>
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
