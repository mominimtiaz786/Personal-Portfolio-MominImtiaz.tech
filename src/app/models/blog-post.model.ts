export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  excerpt?: string;
  date: string;
  body?: string;
  coverImage?: string;
  published?: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}
