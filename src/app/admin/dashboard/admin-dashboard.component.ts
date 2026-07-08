import { Component, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AdminProjectsService } from '../services/admin-projects.service';
import { AdminBlogService } from '../services/admin-blog.service';
import { AdminContactService } from '../services/admin-contact.service';
import { AdminMailingListService } from '../services/admin-mailing-list.service';

interface DashboardStats {
  totalProjects: number;
  totalPublishedPosts: number;
  totalDraftPosts: number;
  totalContacts: number;
  unreadContacts: number;
  totalSubscribers: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  private readonly projectsService = inject(AdminProjectsService);
  private readonly blogService = inject(AdminBlogService);
  private readonly contactService = inject(AdminContactService);
  private readonly mailingListService = inject(AdminMailingListService);

  readonly stats = signal<DashboardStats | null>(null);
  readonly loading = signal(true);

  constructor() {
    forkJoin({
      projects: this.projectsService.getAll(),
      posts: this.blogService.getAll(),
      contacts: this.contactService.getAll(),
      subscribers: this.mailingListService.getAll(),
    }).subscribe(({ projects, posts, contacts, subscribers }) => {
      this.stats.set({
        totalProjects: projects.length,
        totalPublishedPosts: posts.filter((p) => p.published).length,
        totalDraftPosts: posts.filter((p) => !p.published).length,
        totalContacts: contacts.length,
        unreadContacts: contacts.filter((c) => !c.read).length,
        totalSubscribers: subscribers.length,
      });
      this.loading.set(false);
    });
  }
}
