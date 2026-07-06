import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FaqItem } from '../models/faq-item.model';
import { FAQ_ITEMS } from '../data/faq.data';
import { FaqService } from './faq.service';

@Injectable()
export class StaticFaqService implements FaqService {
  getAll(): Observable<FaqItem[]> {
    return of(FAQ_ITEMS);
  }
}
