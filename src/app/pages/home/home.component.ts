import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ProjectsService } from '../../core/projects.service';
import { RecommendationsService } from '../../core/recommendations.service';
import { ProjectCardComponent } from '../../shared/project-card/project-card.component';
import { StatBlockComponent } from '../../shared/stat-block/stat-block.component';
import { QuoteCardComponent } from '../../shared/quote-card/quote-card.component';
import { MailingListSignupComponent } from '../../shared/mailing-list-signup/mailing-list-signup.component';
import { STATS } from '../../data/stats.data';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    AsyncPipe,
    ProjectCardComponent,
    StatBlockComponent,
    QuoteCardComponent,
    MailingListSignupComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly projectsService = inject(ProjectsService);
  private readonly recommendationsService = inject(RecommendationsService);

  readonly stats = STATS;
  readonly projects$ = this.projectsService.getAll(4);
  readonly recommendations$ = this.recommendationsService.getAll(4);
}
