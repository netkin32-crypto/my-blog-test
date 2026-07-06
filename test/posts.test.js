import assert from 'node:assert/strict';
import test from 'node:test';
import { featuredPosts } from '../src/posts.js';

test('featured posts include publishable metadata', () => {
  assert.equal(featuredPosts.length, 3);

  for (const post of featuredPosts) {
    assert.match(post.slug, /^[a-z0-9-]+$/);
    assert.ok(post.title.length > 0);
    assert.ok(post.excerpt.length > 0);
    assert.ok(post.author.length > 0);
    assert.ok(Date.parse(post.date));
    assert.ok(post.tags.length > 0);
  }
});
