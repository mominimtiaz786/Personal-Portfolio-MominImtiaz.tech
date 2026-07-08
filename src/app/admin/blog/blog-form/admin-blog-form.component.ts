import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminBlogService } from '../../services/admin-blog.service';
import { AdminUploadsService } from '../../services/admin-uploads.service';
import { BlogPostPayload } from '../../services/admin-blog-post.model';
import { RichTextEditorComponent } from '../../../shared/components/rich-text-editor/rich-text-editor.component';
import { resolveImageUrl } from '../../../shared/utils/resolve-image-url';
import { slugify } from '../../utils/slugify';

@Component({
  selector: 'app-admin-blog-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RichTextEditorComponent],
  templateUrl: './admin-blog-form.component.html',
  styleUrl: './admin-blog-form.component.scss',
})
export class AdminBlogFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly blogService = inject(AdminBlogService);
  private readonly uploadsService = inject(AdminUploadsService);

  readonly postId = this.route.snapshot.paramMap.get('id');
  readonly isEdit = !!this.postId;

  readonly loading = signal(this.isEdit);
  readonly saving = signal(false);
  readonly coverUploading = signal(false);

  private slugManuallyEdited = this.isEdit;

  readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    excerpt: [''],
    coverImage: [''],
    body: ['', Validators.required],
    published: [false],
  });

  constructor() {
    this.form.controls.title.valueChanges.subscribe((title) => {
      if (!this.slugManuallyEdited) {
        this.form.controls.slug.setValue(slugify(title), { emitEvent: false });
      }
    });

    if (this.postId) {
      this.blogService.getAll().subscribe((posts) => {
        const post = posts.find((p) => p.id === this.postId);
        this.loading.set(false);
        if (!post) return;

        this.form.patchValue({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? '',
          coverImage: post.coverImage ?? '',
          body: post.body,
          published: post.published,
        });
      });
    }
  }

  onSlugInput(): void {
    this.slugManuallyEdited = true;
  }

  imageUrl(path: string): string {
    return resolveImageUrl(path);
  }

  uploadCoverImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;

    this.coverUploading.set(true);
    this.uploadsService.upload(file).subscribe({
      next: (res) => {
        this.form.controls.coverImage.setValue(res.url);
        this.coverUploading.set(false);
      },
      error: () => this.coverUploading.set(false),
    });
  }

  save(): void {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const raw = this.form.getRawValue();
    const payload: Partial<BlogPostPayload> = {
      title: raw.title,
      slug: raw.slug,
      excerpt: raw.excerpt || null,
      coverImage: raw.coverImage || null,
      body: raw.body,
      published: raw.published,
    };

    const request = this.postId
      ? this.blogService.update(this.postId, payload)
      : this.blogService.create(payload);

    request.subscribe({
      next: () => this.router.navigate(['/admin/blog']),
      error: () => this.saving.set(false),
    });
  }
}
