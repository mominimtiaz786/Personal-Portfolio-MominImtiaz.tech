import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BlogPost } from '../models/blog-post.model';
import { BlogService } from './blog.service';

type ApiBlogPost = Omit<BlogPost, 'date'>;

function fromApi(post: ApiBlogPost): BlogPost {
  return { ...post, date: post.publishedAt ?? post.createdAt ?? '' };
}

@Injectable()
export class HttpBlogService implements BlogService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<BlogPost[]> {
    return this.http
      .get<{ data: ApiBlogPost[]; total: number }>(`${environment.apiUrl}/blog`)
      .pipe(map((res) => res.data.map(fromApi)));
  }

  getBySlug(slug: string): Observable<BlogPost | undefined> {
    return this.http.get<ApiBlogPost>(`${environment.apiUrl}/blog/${slug}`).pipe(
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
