import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { BlogService } from '../../core/blog.service';

@Component({
  selector: 'app-blog-detail',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
})
export class BlogDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly blogService = inject(BlogService);

  readonly post$ = this.route.paramMap.pipe(
    switchMap((params) => this.blogService.getBySlug(params.get('slug') ?? ''))
  );
}
