import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../core/blog.service';

@Component({
  selector: 'app-blog',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  private readonly blogService = inject(BlogService);
  readonly posts$ = this.blogService.getAll();
}
