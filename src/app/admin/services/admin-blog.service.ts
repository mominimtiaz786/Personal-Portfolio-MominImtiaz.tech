import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AdminBlogPost, BlogPostPayload } from './admin-blog-post.model';

@Injectable({ providedIn: 'root' })
export class AdminBlogService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/admin/blog`;

  getAll(): Observable<AdminBlogPost[]> {
    return this.http
      .get<{ data: AdminBlogPost[]; total: number }>(this.base)
      .pipe(map((res) => res.data));
  }

  create(payload: Partial<BlogPostPayload>): Observable<AdminBlogPost> {
    return this.http.post<AdminBlogPost>(this.base, payload);
  }

  update(id: string, payload: Partial<BlogPostPayload>): Observable<AdminBlogPost> {
    return this.http.patch<AdminBlogPost>(`${this.base}/${id}`, payload);
  }

  publish(id: string): Observable<AdminBlogPost> {
    return this.http.patch<AdminBlogPost>(`${this.base}/${id}/publish`, {});
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
