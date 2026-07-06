import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

export abstract class BlogService {
  abstract getAll(): Observable<BlogPost[]>;
  abstract getBySlug(slug: string): Observable<BlogPost | undefined>;
}
