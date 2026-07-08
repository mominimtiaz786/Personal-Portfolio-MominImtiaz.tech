import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminProjectsService } from '../../services/admin-projects.service';
import { AdminProject } from '../../services/admin-project.model';

@Component({
  selector: 'app-admin-project-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-project-list.component.html',
  styleUrl: './admin-project-list.component.scss',
})
export class AdminProjectListComponent {
  private readonly projectsService = inject(AdminProjectsService);

  readonly projects = signal<AdminProject[]>([]);
  readonly loading = signal(true);

  constructor() {
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.projectsService.getAll().subscribe((projects) => {
      this.projects.set(projects);
      this.loading.set(false);
    });
  }

  togglePublish(project: AdminProject): void {
    this.projectsService.togglePublish(project.id).subscribe(() => this.load());
  }

  move(project: AdminProject, direction: -1 | 1): void {
    const list = this.projects();
    const index = list.findIndex((p) => p.id === project.id);
    const swapIndex = index + direction;
    if (index === -1 || swapIndex < 0 || swapIndex >= list.length) return;

    const a = list[index];
    const b = list[swapIndex];
    this.projectsService
      .reorder([
        { id: a.id, order: b.order },
        { id: b.id, order: a.order },
      ])
      .subscribe(() => this.load());
  }

  remove(project: AdminProject): void {
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    this.projectsService.remove(project.id).subscribe(() => this.load());
  }
}
