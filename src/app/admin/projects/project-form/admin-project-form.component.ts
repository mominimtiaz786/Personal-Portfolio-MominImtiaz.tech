import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminProjectsService } from '../../services/admin-projects.service';
import { AdminUploadsService } from '../../services/admin-uploads.service';
import { ProjectPayload } from '../../services/admin-project.model';
import { RichTextEditorComponent } from '../../../shared/components/rich-text-editor/rich-text-editor.component';
import { resolveImageUrl } from '../../../shared/utils/resolve-image-url';
import { slugify } from '../../utils/slugify';

@Component({
  selector: 'app-admin-project-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, RichTextEditorComponent],
  templateUrl: './admin-project-form.component.html',
  styleUrl: './admin-project-form.component.scss',
})
export class AdminProjectFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly projectsService = inject(AdminProjectsService);
  private readonly uploadsService = inject(AdminUploadsService);

  readonly projectId = this.route.snapshot.paramMap.get('id');
  readonly isEdit = !!this.projectId;

  readonly loading = signal(this.isEdit);
  readonly saving = signal(false);
  readonly thumbnailUploading = signal(false);
  readonly featuredImageUploading = signal(false);

  private slugManuallyEdited = this.isEdit;
  private order = 0;

  readonly techStack = signal<string[]>([]);
  tagInput = '';

  readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    location: ['', Validators.required],
    year: ['', Validators.required],
    summary: ['', Validators.required],
    role: [''],
    impact: [''],
    learning: [''],
    fullStory: [''],
    thumbnail: [''],
    featuredImage: [''],
    published: [true],
    links: this.fb.nonNullable.array<ReturnType<typeof this.createLinkGroup>>([]),
  });

  get links() {
    return this.form.controls.links;
  }

  constructor() {
    this.form.controls.title.valueChanges.subscribe((title) => {
      if (!this.slugManuallyEdited) {
        this.form.controls.slug.setValue(slugify(title), { emitEvent: false });
      }
    });

    if (this.projectId) {
      this.projectsService.getAll().subscribe((projects) => {
        const project = projects.find((p) => p.id === this.projectId);
        this.loading.set(false);
        if (!project) return;

        this.order = project.order;
        this.form.patchValue({
          title: project.title,
          slug: project.slug,
          location: project.location,
          year: project.year,
          summary: project.summary,
          role: project.role ?? '',
          impact: project.impact ?? '',
          learning: project.learning ?? '',
          fullStory: project.fullStory ?? '',
          thumbnail: project.thumbnail ?? '',
          featuredImage: project.featuredImage ?? '',
          published: project.published,
        });
        this.techStack.set(project.techStack ?? []);
        (project.links ?? []).forEach((link) => this.addLink(link));
      });
    }
  }

  private createLinkGroup(link?: { label: string; url: string }) {
    return this.fb.nonNullable.group({
      label: [link?.label ?? '', Validators.required],
      url: [link?.url ?? '', Validators.required],
    });
  }

  onSlugInput(): void {
    this.slugManuallyEdited = true;
  }

  addTag(): void {
    const tag = this.tagInput.trim();
    if (tag && !this.techStack().includes(tag)) {
      this.techStack.update((tags) => [...tags, tag]);
    }
    this.tagInput = '';
  }

  removeTag(tag: string): void {
    this.techStack.update((tags) => tags.filter((t) => t !== tag));
  }

  addLink(link?: { label: string; url: string }): void {
    this.links.push(this.createLinkGroup(link));
  }

  removeLink(index: number): void {
    this.links.removeAt(index);
  }

  imageUrl(path: string): string {
    return resolveImageUrl(path);
  }

  uploadThumbnail(event: Event): void {
    this.uploadFile(event, this.thumbnailUploading, 'thumbnail');
  }

  uploadFeaturedImage(event: Event): void {
    this.uploadFile(event, this.featuredImageUploading, 'featuredImage');
  }

  private uploadFile(
    event: Event,
    uploading: ReturnType<typeof signal<boolean>>,
    control: 'thumbnail' | 'featuredImage'
  ): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;

    uploading.set(true);
    this.uploadsService.upload(file).subscribe({
      next: (res) => {
        this.form.controls[control].setValue(res.url);
        uploading.set(false);
      },
      error: () => uploading.set(false),
    });
  }

  save(): void {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const raw = this.form.getRawValue();
    const payload: Partial<ProjectPayload> = {
      title: raw.title,
      slug: raw.slug,
      location: raw.location,
      year: raw.year,
      summary: raw.summary,
      role: raw.role || null,
      impact: raw.impact || null,
      learning: raw.learning || null,
      fullStory: raw.fullStory || null,
      thumbnail: raw.thumbnail || null,
      featuredImage: raw.featuredImage || null,
      published: raw.published,
      techStack: this.techStack(),
      links: raw.links,
      order: this.order,
    };

    const request = this.projectId
      ? this.projectsService.update(this.projectId, payload)
      : this.projectsService.create(payload);

    request.subscribe({
      next: () => this.router.navigate(['/admin/projects']),
      error: () => this.saving.set(false),
    });
  }
}
