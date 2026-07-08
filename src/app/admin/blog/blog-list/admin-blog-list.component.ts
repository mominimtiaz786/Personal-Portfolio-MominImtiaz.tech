import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminBlogService } from '../../services/admin-blog.service';
import { AdminBlogPost } from '../../services/admin-blog-post.model';

@Component({
  selector: 'app-admin-blog-list',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './admin-blog-list.component.html',
  styleUrl: './admin-blog-list.component.scss',
})
export class AdminBlogListComponent {
  private readonly blogService = inject(AdminBlogService);

  readonly posts = signal<AdminBlogPost[]>([]);
  readonly loading = signal(true);

  constructor() {
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.blogService.getAll().subscribe((posts) => {
      this.posts.set(posts);
      this.loading.set(false);
    });
  }

  togglePublish(post: AdminBlogPost): void {
    const request = post.published
      ? this.blogService.update(post.id, { published: false })
      : this.blogService.publish(post.id);
    request.subscribe(() => this.load());
  }

  remove(post: AdminBlogPost): void {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    this.blogService.remove(post.id).subscribe(() => this.load());
  }
}
