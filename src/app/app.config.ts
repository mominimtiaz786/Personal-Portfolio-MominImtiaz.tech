import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { ProjectsService } from './core/projects.service';
import { StaticProjectsService } from './core/static-projects.service';
import { RecommendationsService } from './core/recommendations.service';
import { StaticRecommendationsService } from './core/static-recommendations.service';
import { SkillsService } from './core/skills.service';
import { StaticSkillsService } from './core/static-skills.service';
import { FaqService } from './core/faq.service';
import { StaticFaqService } from './core/static-faq.service';
import { MailingListService } from './core/mailing-list.service';
import { StaticMailingListService } from './core/static-mailing-list.service';
import { ContactService } from './core/contact.service';
import { StaticContactService } from './core/static-contact.service';
import { BlogService } from './core/blog.service';
import { StaticBlogService } from './core/static-blog.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    // Phase 1: static, in-memory implementations. Swap `useClass` for an
    // HTTP-backed service once the NestJS backend exists — no component
    // code needs to change since everything depends on the abstractions above.
    { provide: ProjectsService, useClass: StaticProjectsService },
    { provide: RecommendationsService, useClass: StaticRecommendationsService },
    { provide: SkillsService, useClass: StaticSkillsService },
    { provide: FaqService, useClass: StaticFaqService },
    { provide: MailingListService, useClass: StaticMailingListService },
    { provide: ContactService, useClass: StaticContactService },
    { provide: BlogService, useClass: StaticBlogService },
  ],
};
