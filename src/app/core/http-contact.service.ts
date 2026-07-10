import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ContactRequest } from '../models/contact-request.model';
import { SubmissionResult } from '../models/submission-result.model';
import { ContactService } from './contact.service';

@Injectable()
export class HttpContactService implements ContactService {
  private readonly http = inject(HttpClient);

  submit(request: ContactRequest): Observable<SubmissionResult> {
    return this.http.post(`${environment.apiUrl}/contact`, request).pipe(
      map(
        (): SubmissionResult => ({
          success: true,
          message: "Thanks — I'll be in touch within a couple of business days.",
        })
      ),
      catchError(() =>
        of<SubmissionResult>({
          success: false,
          message: 'Something went wrong. Please email me directly at mominimtiaz0786@gmail.com',
        })
      )
    );
  }
}
