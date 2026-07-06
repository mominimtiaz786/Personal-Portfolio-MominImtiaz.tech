import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SkillGroup } from '../models/skill-group.model';
import { Certification } from '../models/certification.model';
import { SKILL_GROUPS } from '../data/skills.data';
import { CERTIFICATIONS } from '../data/certifications.data';
import { SkillsService } from './skills.service';

@Injectable()
export class StaticSkillsService implements SkillsService {
  getSkillGroups(): Observable<SkillGroup[]> {
    return of(SKILL_GROUPS);
  }

  getCertifications(): Observable<Certification[]> {
    return of(CERTIFICATIONS);
  }
}
