import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../core/blog.service';
import { resolveImageUrl } from '../../shared/utils/resolve-image-url';
import { DatePipe } from '@angular/common';
  
@Component({
  selector: 'app-blog',
  imports: [AsyncPipe, RouterLink, DatePipe],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  private readonly blogService = inject(BlogService);
  readonly posts$ = this.blogService.getAll();

  imageUrl(path: string): string {
    return resolveImageUrl(path);
  }
}
