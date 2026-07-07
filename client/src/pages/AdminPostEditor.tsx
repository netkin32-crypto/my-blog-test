import { useEffect, useState, type JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { api } from '../api';
import type { PostInput } from '../types';

const EMPTY: PostInput = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  author: '',
  date: new Date().toISOString().slice(0, 10),
  tags: [],
};

export function AdminPostEditor(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(slug);

  const [form, setForm] = useState<PostInput>(EMPTY);
  const [tagsText, setTagsText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    api
      .getPost(slug)
      .then(({ post }) => {
        if (cancelled) return;
        setForm({
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          date: post.date.slice(0, 10),
          tags: post.tags,
        });
        setTagsText(post.tags.join(', '));
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : '加载失败');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  function update<K extends keyof PostInput>(key: K, value: PostInput[K]): void {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    setError('');
    const tags = tagsText
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    const payload: PostInput = { ...form, tags };

    try {
      if (isEdit && slug) {
        await api.updatePost(slug, payload);
      } else {
        await api.createPost(payload);
      }
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存失败');
    }
  }

  if (loading) return <p className="result-count">加载中...</p>;

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: 16 }}>{isEdit ? '编辑文章' : '写新文章'}</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="form-field">
        <label htmlFor="slug">Slug（URL 标识，小写字母数字连字符）</label>
        <input
          id="slug"
          type="text"
          value={form.slug}
          onChange={(event) => update('slug', event.target.value)}
          required
          pattern="[a-z0-9-]+"
        />
      </div>
      <div className="form-field">
        <label htmlFor="title">标题</label>
        <input
          id="title"
          type="text"
          value={form.title}
          onChange={(event) => update('title', event.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="excerpt">摘要</label>
        <textarea
          id="excerpt"
          value={form.excerpt}
          onChange={(event) => update('excerpt', event.target.value)}
          required
          style={{ minHeight: '80px' }}
        />
      </div>
      <div className="form-field">
        <label htmlFor="content">正文</label>
        <textarea
          id="content"
          value={form.content}
          onChange={(event) => update('content', event.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="author">作者</label>
        <input
          id="author"
          type="text"
          value={form.author}
          onChange={(event) => update('author', event.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="date">日期</label>
        <input
          id="date"
          type="date"
          value={form.date}
          onChange={(event) => update('date', event.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="tags">标签（逗号分隔）</label>
        <input
          id="tags"
          type="text"
          value={tagsText}
          placeholder="Design, UX"
          onChange={(event) => setTagsText(event.target.value)}
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="button">{isEdit ? '保存修改' : '发布文章'}</button>
      </div>
    </form>
  );
}
