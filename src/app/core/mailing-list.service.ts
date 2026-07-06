import { Observable } from 'rxjs';
import { SubmissionResult } from '../models/submission-result.model';

export abstract class MailingListService {
  abstract subscribe(email: string): Observable<SubmissionResult>;
}
