export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  location: string;
  year: string;
  summary: string;
  role: string;
  impact: string;
  learning: string;
  tech: string[];
  links?: ProjectLink[];
  thumbnail: string;
  images?: string[];
}
