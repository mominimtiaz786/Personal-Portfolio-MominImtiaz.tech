import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../core/contact.service';
import { EngagementType } from '../../models/contact-request.model';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  readonly status = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');
  readonly statusMessage = signal('');

  readonly engagementOptions: { value: EngagementType; label: string }[] = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'other', label: 'Other' },
  ];

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    engagementType: this.fb.nonNullable.control<EngagementType>('full-time', Validators.required),
    message: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid || this.status() === 'submitting') {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('submitting');
    this.contactService.submit(this.form.getRawValue()).subscribe((result) => {
      this.status.set(result.success ? 'success' : 'error');
      this.statusMessage.set(result.message);
      if (result.success) {
        this.form.reset({ engagementType: 'full-time' });
      }
    });
  }
}
