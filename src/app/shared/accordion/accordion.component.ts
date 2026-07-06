import { Component, input, signal } from '@angular/core';
import { FaqItem } from '../../models/faq-item.model';

@Component({
  selector: 'app-accordion',
  imports: [],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  readonly items = input.required<FaqItem[]>();
  readonly openIndex = signal<number | null>(0);

  toggle(index: number): void {
    this.openIndex.set(this.openIndex() === index ? null : index);
  }
}
