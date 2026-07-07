import { useEffect, useMemo, useState } from 'react';
import type { JSX } from 'react';

import { api } from '../api';
import { Hero } from '../components/Hero';
import { PostCard } from '../components/PostCard';
import { EmptyState } from '../components/EmptyState';
import type { Post } from '../types';

export function Home(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .listPosts({ q: query, tag })
      .then((data) => {
        if (!cancelled) setPosts(data.posts);
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query, tag]);

  const tags = useMemo(
    () => [...new Set(posts.flatMap((post) => post.tags))].sort(),
    [posts],
  );

  return (
    <>
      <Hero />

      <section className="posts" id="posts" aria-labelledby="posts-title">
        <div className="section-heading">
          <p className="eyebrow">Featured</p>
          <h2 id="posts-title">Latest posts</h2>
          <p>Search by title, topic, author, or choose a tag to narrow the featured archive.</p>
        </div>
        <div className="post-tools" aria-label="Post discovery tools">
          <label className="search-field" htmlFor="post-search">
            <span>Search posts</span>
            <input
              id="post-search"
              type="search"
              name="search"
              placeholder="Try design, workflow, or planning"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <div className="tag-filters" aria-label="Filter posts by tag">
            {['All', ...tags].map((option) => (
              <button
                key={option}
                type="button"
                className="tag-filter"
                aria-pressed={tag === option}
                onClick={() => setTag(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <p className="result-count" aria-live="polite">
          {loading ? '加载中...' : `${posts.length} ${posts.length === 1 ? 'post' : 'posts'} found`}
        </p>
        {!loading && posts.length === 0 && (
          <EmptyState message="No posts match those filters. Try a different keyword or tag." />
        )}
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
