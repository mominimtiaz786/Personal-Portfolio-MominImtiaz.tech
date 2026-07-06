import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../models/project.model';
import { PROJECTS } from '../data/projects.data';
import { ProjectsService } from './projects.service';

@Injectable()
export class StaticProjectsService implements ProjectsService {
  getAll(limit?: number): Observable<Project[]> {
    if (limit !== undefined) {
      return of(PROJECTS.slice(0, limit));
    }
    return of(PROJECTS);
  }

  getBySlug(slug: string): Observable<Project | undefined> {
    return of(PROJECTS.find((project) => project.slug === slug));
  }
}
