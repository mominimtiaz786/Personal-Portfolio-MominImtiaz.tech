import { Observable } from 'rxjs';
import { Recommendation } from '../models/recommendation.model';

export abstract class RecommendationsService {
  abstract getAll(): Observable<Recommendation[]>;
}
