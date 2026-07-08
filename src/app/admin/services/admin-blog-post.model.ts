export interface AdminBlogPost {
  id: string;
  slug: string;
  title: string;
  body: string;
  excerpt: string | null;
  coverImage: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type BlogPostPayload = Omit<AdminBlogPost, 'id' | 'publishedAt' | 'createdAt' | 'updatedAt'>;
