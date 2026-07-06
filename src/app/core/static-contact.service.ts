import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ContactRequest } from '../models/contact-request.model';
import { SubmissionResult } from '../models/submission-result.model';
import { ContactService } from './contact.service';

/**
 * Phase 1 stub — swap for an HTTP-backed implementation (NestJS contact endpoint)
 * once the backend exists. Components only depend on the ContactService abstraction.
 */
@Injectable()
export class StaticContactService implements ContactService {
  submit(request: ContactRequest): Observable<SubmissionResult> {
    console.log('[ContactService] submission:', request);
    return of<SubmissionResult>({
      success: true,
      message: 'Thanks for reaching out — I\'ll get back to you shortly.',
    }).pipe(delay(400));
  }
}
