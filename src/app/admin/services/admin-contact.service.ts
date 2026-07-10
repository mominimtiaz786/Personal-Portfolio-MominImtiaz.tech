import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface AdminContactSubmission {
  id: string;
  name: string;
  email: string;
  engagementType: string;
  message: string;
  read: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AdminContactService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/admin/contact`;

  getAll(): Observable<AdminContactSubmission[]> {
    return this.http
      .get<{ data: AdminContactSubmission[]; total: number }>(this.base)
      .pipe(map((res) => res.data));
  }

  markAsRead(id: string): Observable<AdminContactSubmission> {
    return this.http.patch<AdminContactSubmission>(`${this.base}/${id}/read`, {});
  }
}
