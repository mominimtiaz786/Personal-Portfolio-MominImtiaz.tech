import { Observable } from 'rxjs';
import { ContactRequest } from '../models/contact-request.model';
import { SubmissionResult } from '../models/submission-result.model';

export abstract class ContactService {
  abstract submit(request: ContactRequest): Observable<SubmissionResult>;
}
