import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AdminContactService, AdminContactSubmission } from '../services/admin-contact.service';

@Component({
  selector: 'app-admin-contacts',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './admin-contacts.component.html',
  styleUrl: './admin-contacts.component.scss',
})
export class AdminContactsComponent {
  private readonly contactService = inject(AdminContactService);

  readonly submissions = signal<AdminContactSubmission[]>([]);
  readonly loading = signal(true);

  constructor() {
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.contactService.getAll().subscribe((submissions) => {
      this.submissions.set(submissions);
      this.loading.set(false);
    });
  }

  markAsRead(submission: AdminContactSubmission): void {
    this.contactService.markAsRead(submission.id).subscribe(() => this.load());
  }
}
