import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recommendation } from '../models/recommendation.model';
import { RECOMMENDATIONS } from '../data/recommendations.data';
import { RecommendationsService } from './recommendations.service';

@Injectable()
export class StaticRecommendationsService implements RecommendationsService {
  getAll(): Observable<Recommendation[]> {
    return of(RECOMMENDATIONS);
  }
}
