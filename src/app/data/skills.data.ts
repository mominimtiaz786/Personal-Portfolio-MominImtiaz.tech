import { SkillGroup } from '../models/skill-group.model';

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['C++', 'Python', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    category: 'Frameworks',
    items: [
      'Angular', 'CKAN', 'Flask', 'Django', 'ExpressJS', 'NestJS',
      'NumPy', 'Pandas', 'MoviePy', 'Selenium', 'Scikit-learn', 'PyTorch',
      'IoT MQTT', 'MEAN',
    ],
  },
  {
    category: 'APIs',
    items: [
      'Facebook Graph API', 'YouTube Data API', 'Google Drive API',
      'SugarCRM API', 'Gemini', 'OpenAI',
    ],
  },
  {
    category: 'Developer Tools',
    items: [
      'Git', 'VS Code', 'Claude Code', 'Codex', 'GitHub Copilot', 'Cursor',
      'Linux', 'Postman', 'pgAdmin', 'VMware', 'Heroku CLI', 'MongoDB',
    ],
  },
  {
    category: 'Platforms',
    items: ['AWS (EC2, S3, RDS, IoT Core)', 'Heroku'],
  },
  {
    category: 'Libraries',
    items: [
      'Ezsheets', 'Lodash', 'moment-timezone', 'form-render', 'Alyle',
      'Pillow', 'jQuery', 'Bootstrap', 'Angular Material',
    ],
  },
];
