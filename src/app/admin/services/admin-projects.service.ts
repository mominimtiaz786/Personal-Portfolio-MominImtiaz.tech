import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AdminProject, ProjectPayload } from './admin-project.model';

@Injectable({ providedIn: 'root' })
export class AdminProjectsService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/admin/projects`;

  getAll(): Observable<AdminProject[]> {
    return this.http
      .get<{ data: AdminProject[]; total: number }>(this.base)
      .pipe(map((res) => res.data));
  }

  create(payload: Partial<ProjectPayload>): Observable<AdminProject> {
    return this.http.post<AdminProject>(this.base, payload);
  }

  update(id: string, payload: Partial<ProjectPayload>): Observable<AdminProject> {
    return this.http.patch<AdminProject>(`${this.base}/${id}`, payload);
  }

  togglePublish(id: string): Observable<AdminProject> {
    return this.http.patch<AdminProject>(`${this.base}/${id}/publish`, {});
  }

  reorder(items: { id: string; order: number }[]): Observable<void> {
    return this.http.patch<void>(`${this.base}/reorder`, items);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
