import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface AdminSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

@Injectable({ providedIn: 'root' })
export class AdminMailingListService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/admin/mailing-list`;

  getAll(): Observable<AdminSubscriber[]> {
    return this.http
      .get<{ data: AdminSubscriber[]; total: number }>(this.base)
      .pipe(map((res) => res.data));
  }
}
