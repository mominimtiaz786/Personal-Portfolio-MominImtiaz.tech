import { Observable } from 'rxjs';
import { FaqItem } from '../models/faq-item.model';

export abstract class FaqService {
  abstract getAll(): Observable<FaqItem[]>;
}
