import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Project } from '../models/project.model';
import { ProjectsService } from './projects.service';

interface ApiProject extends Omit<Project, 'tech'> {
  techStack: string[];
}

function fromApi(project: ApiProject): Project {
  const { techStack, ...rest } = project;
  return { ...rest, tech: techStack };
}

@Injectable()
export class HttpProjectsService implements ProjectsService {
  private readonly http = inject(HttpClient);

  getAll(limit?: number): Observable<Project[]> {
    return this.http
      .get<{ data: ApiProject[]; total: number }>(`${environment.apiUrl}/projects`)
      .pipe(
        map((res) => res.data.map(fromApi)),
        map((projects) => (limit !== undefined ? projects.slice(0, limit) : projects))
      );
  }

  getBySlug(slug: string): Observable<Project | undefined> {
    return this.http.get<ApiProject>(`${environment.apiUrl}/projects/${slug}`).pipe(
      map(fromApi),
      catchError((err) => {
        if (err.status === 404) {
          return of(undefined);
        }
        return throwError(() => err);
      })
    );
  }
}
