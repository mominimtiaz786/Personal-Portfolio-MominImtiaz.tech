export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id?: string;
  slug: string;
  title: string;
  location: string;
  year: string;
  summary: string;
  role?: string;
  impact?: string;
  learning?: string;
  fullStory?: string;
  tech: string[];
  links?: ProjectLink[];
  thumbnail?: string;
  featuredImage?: string;
  images?: string[];
  order?: number;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
