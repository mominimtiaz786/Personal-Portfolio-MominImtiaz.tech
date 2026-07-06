import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { ProjectsService } from '../../core/projects.service';

@Component({
  selector: 'app-work-detail',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './work-detail.component.html',
  styleUrl: './work-detail.component.scss',
})
export class WorkDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly projectsService = inject(ProjectsService);

  readonly project$ = this.route.paramMap.pipe(
    switchMap((params) => this.projectsService.getBySlug(params.get('slug') ?? ''))
  );
}
