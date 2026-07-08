import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { ProjectsService } from './core/projects.service';
import { HttpProjectsService } from './core/http-projects.service';
import { RecommendationsService } from './core/recommendations.service';
import { StaticRecommendationsService } from './core/static-recommendations.service';
import { SkillsService } from './core/skills.service';
import { StaticSkillsService } from './core/static-skills.service';
import { FaqService } from './core/faq.service';
import { StaticFaqService } from './core/static-faq.service';
import { MailingListService } from './core/mailing-list.service';
import { HttpMailingListService } from './core/http-mailing-list.service';
import { ContactService } from './core/contact.service';
import { HttpContactService } from './core/http-contact.service';
import { BlogService } from './core/blog.service';
import { HttpBlogService } from './core/http-blog.service';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideHttpClient(withInterceptors([authInterceptor])),
    // Phase 3: HTTP-backed implementations talking to the NestJS backend.
    // Recommendations/Skills/FAQ have no backend entity yet and stay static.
    { provide: ProjectsService, useClass: HttpProjectsService },
    { provide: RecommendationsService, useClass: StaticRecommendationsService },
    { provide: SkillsService, useClass: StaticSkillsService },
    { provide: FaqService, useClass: StaticFaqService },
    { provide: MailingListService, useClass: HttpMailingListService },
    { provide: ContactService, useClass: HttpContactService },
    { provide: BlogService, useClass: HttpBlogService },
  ],
};
