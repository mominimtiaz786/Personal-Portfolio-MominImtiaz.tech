import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { BlogService } from './blog.service';

/**
 * Phase 1 scaffold — no posts yet. Swap for an HTTP-backed implementation
 * (NestJS + CMS) once blog content exists, without touching page components.
 */
@Injectable()
export class StaticBlogService implements BlogService {
  getAll(): Observable<BlogPost[]> {
    return of([]);
  }

  getBySlug(_slug: string): Observable<BlogPost | undefined> {
    return of(undefined);
  }
}
