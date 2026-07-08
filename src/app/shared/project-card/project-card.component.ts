import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project.model';
import { resolveImageUrl } from '../utils/resolve-image-url';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();

  get thumbnailUrl(): string {
    return resolveImageUrl(this.project().thumbnail);
  }
}
