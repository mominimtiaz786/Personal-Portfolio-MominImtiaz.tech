import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';
import { BlogService } from '../../core/blog.service';
import { resolveImageUrl } from '../../shared/utils/resolve-image-url';

@Component({
  selector: 'app-blog-detail',
  imports: [AsyncPipe, DatePipe, RouterLink],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
})
export class BlogDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly blogService = inject(BlogService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly post$ = this.route.paramMap.pipe(
    switchMap((params) => this.blogService.getBySlug(params.get('slug') ?? ''))
  );

  sanitize(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  imageUrl(path: string): string {
    return resolveImageUrl(path);
  }
}
