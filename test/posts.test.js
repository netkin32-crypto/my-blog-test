import assert from 'node:assert/strict';
import test from 'node:test';
import { featuredPosts, filterPosts, getAllTags } from '../src/posts.js';

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

test('post tags can be listed for filters', () => {
  assert.deepEqual(getAllTags(featuredPosts), ['Design', 'Planning', 'Project', 'Roadmap', 'UX', 'Workflow']);
});

test('featured posts can be filtered by query and tag', () => {
  assert.deepEqual(filterPosts(featuredPosts, { query: 'typography' }).map((post) => post.slug), [
    'designing-for-readable-posts',
  ]);
  assert.deepEqual(filterPosts(featuredPosts, { tag: 'Workflow' }).map((post) => post.slug), [
    'content-workflow-next-steps',
  ]);
  assert.deepEqual(filterPosts(featuredPosts, { query: 'roadmap', tag: 'Workflow' }).map((post) => post.slug), [
    'content-workflow-next-steps',
  ]);
  assert.deepEqual(filterPosts(featuredPosts, { query: 'roadmap', tag: 'Design' }), []);
});
