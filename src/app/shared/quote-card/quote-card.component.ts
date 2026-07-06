import { Component, input } from '@angular/core';
import { Recommendation } from '../../models/recommendation.model';

@Component({
  selector: 'app-quote-card',
  imports: [],
  templateUrl: './quote-card.component.html',
  styleUrl: './quote-card.component.scss',
})
export class QuoteCardComponent {
  readonly recommendation = input.required<Recommendation>();
  readonly condensed = input(false);
}
