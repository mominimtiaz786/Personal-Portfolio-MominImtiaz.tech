import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    slug: 'national-open-government-data-portal-jordan',
    title: 'National Open Government Data Portal — Jordan',
    location: 'Amman, Jordan',
    year: '2024 - 2026',
    summary:
      'Developed a nationwide CKAN-based portal enabling 150+ ministries and entities to publish 3,700+ datasets across 15 sectors.',
    role:
      'Lead engineer and analyst — led requirement sessions, built custom CKAN extensions, integrated SANAD and LDAP authentication, and bridged technical and stakeholder needs across a multicultural team.',
    impact:
      'Empowered citizens, researchers, and public-sector users with open access to data; streamlined government publishing workflows; strengthened Jordan\'s digital governance.',
    learning:
      'Multicultural collaboration, adapting technical solutions to new institutional/cultural contexts, and balancing technical excellence with human-centered design.',
    tech: ['CKAN', 'Python', 'Flask', 'PostgreSQL', 'Solr', 'Redis/RQ', 'SANAD SSO', 'LDAP', 'nginx', 'uwsgi'],
    thumbnail: '/assets/projects/jordan-portal.png',
    links: [
      {
        label: 'View Project',
        url: 'https://opendata.gov.jo/',
      }
    ]
  },
  {
    slug: 'open-data-pakistan',
    title: 'Open Data Pakistan',
    location: 'Lahore, Pakistan',
    year: '2021 - 2022',
    summary:
      'Final-year university project upgrading Pakistan\'s first CKAN-based open data portal (NCBC, LUMS, HEC initiative).',
    role:
      'Migrated legacy CKAN extensions, implemented new features, and learned Flask, Jinja, Solr, Redis, and AWS from scratch.',
    impact:
      'Enabled 22+ organizations to publish 350+ datasets; organized 3 national open-data hackathons.',
    learning:
      'Foundational CKAN and backend development experience on a nationally recognized, high-impact project.',
    tech: ['CKAN', 'Python', 'Flask', 'Jinja', 'Solr', 'Redis', 'AWS', 'PostgreSQL'],
    thumbnail: '/assets/projects/open-data-pakistan.png',
    links: [
      {
        label: 'View Project',
        url: 'https://opendata.com.pk/',
      }
    ]
  },
  {
    slug: 'panavid-logistics-warehouse-automation',
    title: 'Panavid — Logistics & Warehouse Automation',
    location: 'Lahore, Pakistan (for a US-based company)',
    year: '2022 - 2024',
    summary:
      'Logistics and event-management platform coordinating equipment and trucking across multiple warehouses for large conferences and events.',
    role:
      'Grew from contributor to leading a 16-20 member frontend team — task breakdown, technical architecture, and integration planning.',
    impact:
      'Streamlined logistics across 8+ warehouses and 100+ warehouse workers; reduced scan validation time by ~70% via client-side caching and real-time MQTT sync.',
    learning:
      'Enterprise-level Angular architecture, complex task estimation, and mentorship under senior engineers.',
    tech: ['Angular', 'RxJS', 'TypeScript', 'MQTT', 'REST APIs', 'GraphQL', 'Material UI', 'Dynamic Forms'],
    thumbnail: '/assets/projects/panavid.png',
  },
  {
    slug: 'automation-mania-video-content-automation',
    title: 'Automation Mania — Video Content Automation',
    location: 'Self-initiated',
    year: '2022',
    summary:
      'Automated pipeline generating and scheduling short videos (Quranic verses, philosophical/relationship facts) across YouTube and Facebook, sourcing content from Google Sheets.',
    role: 'Sole developer — concept, design, automation, and deployment.',
    impact:
      'Automated end-to-end content generation and multi-platform scheduling, saving hours of manual work.',
    learning:
      'Python, OOP, automation pipelines, and API integration (Facebook Graph API, YouTube Data API, Google Drive API), plus AWS EC2 cron jobs.',
    tech: ['Python', 'MoviePy', 'Pillow', 'Selenium', 'Facebook Graph API', 'YouTube Data API', 'EZSheets', 'AWS EC2'],
    thumbnail: '/assets/projects/automation-mania.png',
    links: [
      {
        label: 'Channel Hidayat Mania',
        url: 'https://www.youtube.com/@hidayatmania7403',
      },
      {
        label: 'Channel Facts Mania',
        url: 'https://www.youtube.com/@factsmania8243',
      },
    ]
  },
];
