import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recommendation } from '../models/recommendation.model';
import { RECOMMENDATIONS } from '../data/recommendations.data';
import { RecommendationsService } from './recommendations.service';

@Injectable()
export class StaticRecommendationsService implements RecommendationsService {
  getAll(limit?: number): Observable<Recommendation[]> {
    const recommendations = limit !== undefined ? RECOMMENDATIONS.slice(0, limit) : RECOMMENDATIONS;
    return of(recommendations);
  }
}
