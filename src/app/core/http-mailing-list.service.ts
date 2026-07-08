import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SubmissionResult } from '../models/submission-result.model';
import { MailingListService } from './mailing-list.service';

@Injectable()
export class HttpMailingListService implements MailingListService {
  private readonly http = inject(HttpClient);

  subscribe(email: string): Observable<SubmissionResult> {
    return this.http.post(`${environment.apiUrl}/mailing-list/subscribe`, { email }).pipe(
      map((): SubmissionResult => ({ success: true, message: "You're in. I'll be in touch." })),
      catchError(() =>
        of<SubmissionResult>({
          success: false,
          message: 'Something went wrong. Please try again later.',
        })
      )
    );
  }
}
