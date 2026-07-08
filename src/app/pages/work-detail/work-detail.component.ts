import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';
import { ProjectsService } from '../../core/projects.service';
import { Project } from '../../models/project.model';
import { resolveImageUrl } from '../../shared/utils/resolve-image-url';

@Component({
  selector: 'app-work-detail',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './work-detail.component.html',
  styleUrl: './work-detail.component.scss',
})
export class WorkDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly projectsService = inject(ProjectsService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly project$ = this.route.paramMap.pipe(
    switchMap((params) => this.projectsService.getBySlug(params.get('slug') ?? ''))
  );

  heroImage(project: Project): string | null {
    const path = project.featuredImage ?? project.thumbnail ?? null;
    return path ? resolveImageUrl(path) : null;
  }

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
