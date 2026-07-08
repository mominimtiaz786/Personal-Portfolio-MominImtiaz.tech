export interface ProjectLink {
  label: string;
  url: string;
}

export interface AdminProject {
  id: string;
  slug: string;
  title: string;
  location: string;
  year: string;
  summary: string;
  role: string | null;
  impact: string | null;
  learning: string | null;
  fullStory: string | null;
  techStack: string[];
  links: ProjectLink[] | null;
  thumbnail: string | null;
  featuredImage: string | null;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProjectPayload = Omit<AdminProject, 'id' | 'createdAt' | 'updatedAt'>;
