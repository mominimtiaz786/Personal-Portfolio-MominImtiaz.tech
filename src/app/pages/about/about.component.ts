import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { SkillsService } from '../../core/skills.service';

@Component({
  selector: 'app-about',
  imports: [AsyncPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  private readonly skillsService = inject(SkillsService);

  readonly skillGroups$ = this.skillsService.getSkillGroups();
  readonly certifications$ = this.skillsService.getCertifications();
}
