import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MailingListService } from '../../core/mailing-list.service';

@Component({
  selector: 'app-mailing-list-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './mailing-list-signup.component.html',
  styleUrl: './mailing-list-signup.component.scss',
})
export class MailingListSignupComponent {
  private readonly fb = inject(FormBuilder);
  private readonly mailingListService = inject(MailingListService);

  readonly status = signal<'idle' | 'submitting' | 'success' | 'error'>('idle');
  readonly statusMessage = signal('');

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submit(): void {
    if (this.form.invalid || this.status() === 'submitting') {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('submitting');
    const email = this.form.getRawValue().email;

    this.mailingListService.subscribe(email).subscribe((result) => {
      this.status.set(result.success ? 'success' : 'error');
      this.statusMessage.set(result.message);
      if (result.success) {
        this.form.reset();
      }
    });
  }
}
