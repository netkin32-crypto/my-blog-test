export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string; // ISO 字符串
  tags: string[];
  readingTime: string;
}

export interface PostListResponse {
  posts: Post[];
  total: number;
}

export interface PostInput {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
}

export interface ApiError {
  error: string;
  details?: unknown;
}
