import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../auth/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AdminAuthService);
  private readonly router = inject(Router);

  readonly status = signal<'idle' | 'submitting' | 'error'>('idle');

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid || this.status() === 'submitting') {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('submitting');
    const { email, password } = this.form.getRawValue();

    this.authService.login(email, password).subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
      error: () => this.status.set('error'),
    });
  }
}
