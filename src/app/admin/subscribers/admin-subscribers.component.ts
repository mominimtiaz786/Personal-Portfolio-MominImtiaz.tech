import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AdminMailingListService, AdminSubscriber } from '../services/admin-mailing-list.service';

@Component({
  selector: 'app-admin-subscribers',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './admin-subscribers.component.html',
  styleUrl: './admin-subscribers.component.scss',
})
export class AdminSubscribersComponent {
  private readonly mailingListService = inject(AdminMailingListService);

  readonly subscribers = signal<AdminSubscriber[]>([]);
  readonly loading = signal(true);

  constructor() {
    this.mailingListService.getAll().subscribe((subscribers) => {
      this.subscribers.set(subscribers);
      this.loading.set(false);
    });
  }
}
