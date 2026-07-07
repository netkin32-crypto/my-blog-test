import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { JSX } from 'react';

import { api } from '../api';
import { EmptyState } from '../components/EmptyState';
import type { Post } from '../types';
import { isLoggedIn } from '../auth';

const formatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export function PostDetail(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    api
      .getPost(slug)
      .then((data) => {
        if (!cancelled) setPost(data.post);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  async function handleDelete(): Promise<void> {
    if (!post) return;
    if (!window.confirm(`确认删除《${post.title}》吗？`)) return;
    await api.deletePost(post.slug);
    window.location.href = '/';
  }

  if (loading) return <p className="result-count">加载中...</p>;
  if (notFound || !post) {
    return <EmptyState message="文章不存在或已被删除。" />;
  }

  return (
    <article className="post-detail">
      <Link to="/" className="back-link">← 返回列表</Link>
      <p className="eyebrow" style={{ color: '#7c3aed' }}>Post</p>
      <h1>{post.title}</h1>
      <div className="post-meta">
        <time dateTime={post.date}>{formatter.format(new Date(post.date))}</time>
        <span>{post.readingTime}</span>
        <span>{post.author}</span>
      </div>
      <div className="tags" style={{ justifyContent: 'flex-start' }}>
        {post.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <p className="post-content">{post.content}</p>
      {isLoggedIn() && (
        <div className="form-actions">
          <a className="button" href={`/admin/edit/${post.slug}`}>编辑</a>
          <button type="button" className="button button-danger" onClick={handleDelete}>删除</button>
        </div>
      )}
    </article>
  );
}
