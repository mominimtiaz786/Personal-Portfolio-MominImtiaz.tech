import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RecommendationsService } from '../../core/recommendations.service';
import { FaqService } from '../../core/faq.service';
import { QuoteCardComponent } from '../../shared/quote-card/quote-card.component';
import { AccordionComponent } from '../../shared/accordion/accordion.component';
import { ContactFormComponent } from '../../shared/contact-form/contact-form.component';

@Component({
  selector: 'app-hire-me',
  imports: [AsyncPipe, QuoteCardComponent, AccordionComponent, ContactFormComponent],
  templateUrl: './hire-me.component.html',
  styleUrl: './hire-me.component.scss',
})
export class HireMeComponent {
  private readonly recommendationsService = inject(RecommendationsService);
  private readonly faqService = inject(FaqService);

  readonly recommendations$ = this.recommendationsService.getAll();
  readonly faqItems$ = this.faqService.getAll();

  readonly whatIBring = [
    {
      title: 'Open-data & CKAN specialism',
      description: 'Deep, hands-on experience extending CKAN\'s core for government-scale publishing workflows, authentication, and governance.',
    },
    {
      title: 'Full-stack range',
      description: 'Comfortable across Angular/TypeScript front ends and Python/Django/Flask back ends, plus cloud deployment on AWS.',
    },
    {
      title: 'Team leadership',
      description: 'Led frontend teams of 15-20 engineers — task breakdown, architecture decisions, and mentoring less-experienced developers.',
    },
    {
      title: 'Remote & international collaboration',
      description: 'Delivered a national platform for Jordan\'s Ministry of Digital Economy while working daily with a distributed, multicultural team.',
    },
  ];
}
