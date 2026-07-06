import { Observable } from 'rxjs';
import { SkillGroup } from '../models/skill-group.model';
import { Certification } from '../models/certification.model';

export abstract class SkillsService {
  abstract getSkillGroups(): Observable<SkillGroup[]>;
  abstract getCertifications(): Observable<Certification[]>;
}
