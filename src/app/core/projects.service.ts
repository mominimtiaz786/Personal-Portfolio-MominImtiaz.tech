import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

export abstract class ProjectsService {
  abstract getAll(limit?: number): Observable<Project[]>;
  abstract getBySlug(slug: string): Observable<Project | undefined>;
}
