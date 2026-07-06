import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SubmissionResult } from '../models/submission-result.model';
import { MailingListService } from './mailing-list.service';

/**
 * Phase 1 stub — swap for an HTTP-backed implementation (NestJS + ConvertKit/Buttondown)
 * once the backend exists. Components only depend on the MailingListService abstraction.
 */
@Injectable()
export class StaticMailingListService implements MailingListService {
  subscribe(email: string): Observable<SubmissionResult> {
    console.log('[MailingListService] subscribe request:', email);
    return of<SubmissionResult>({
      success: true,
      message: 'Thanks — you\'re on the list.',
    }).pipe(delay(400));
  }
}
