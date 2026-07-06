import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ProjectsService } from '../../core/projects.service';
import { ProjectCardComponent } from '../../shared/project-card/project-card.component';

@Component({
  selector: 'app-work',
  imports: [AsyncPipe, ProjectCardComponent],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
})
export class WorkComponent {
  private readonly projectsService = inject(ProjectsService);
  readonly projects$ = this.projectsService.getAll();
}
