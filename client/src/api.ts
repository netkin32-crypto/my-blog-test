import type {
  ApiError,
  Post,
  PostInput,
  PostListResponse,
} from './types';
import { getToken } from './auth';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (init?.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const token = getToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(path, { ...init, headers });

  if (response.status === 204) {
    return undefined as T;
  }

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => ({}))) as ApiError;
    throw new Error(errorBody.error ?? `请求失败 (${response.status})`);
  }

  return (await response.json()) as T;
}

export const api = {
  listPosts(query?: { q?: string; tag?: string }): Promise<PostListResponse> {
    const params = new URLSearchParams();
    if (query?.q) params.set('q', query.q);
    if (query?.tag) params.set('tag', query.tag);
    const search = params.toString() ? `?${params.toString()}` : '';
    return request<PostListResponse>(`/api/posts${search}`);
  },

  getPost(slug: string): Promise<{ post: Post }> {
    return request(`/api/posts/${slug}`);
  },

  createPost(input: PostInput): Promise<{ post: Post }> {
    return request('/api/posts', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  updatePost(slug: string, input: Partial<PostInput>): Promise<{ post: Post }> {
    return request(`/api/posts/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    });
  },

  deletePost(slug: string): Promise<void> {
    return request(`/api/posts/${slug}`, { method: 'DELETE' });
  },

  login(username: string, password: string): Promise<{ token: string }> {
    return request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },
};
