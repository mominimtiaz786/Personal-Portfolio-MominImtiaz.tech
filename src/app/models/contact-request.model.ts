export type EngagementType = 'full-time' | 'freelance' | 'other';

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
  engagementType: EngagementType;
}
