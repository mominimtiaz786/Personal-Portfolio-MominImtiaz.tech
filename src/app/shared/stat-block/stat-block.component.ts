import { Component, input } from '@angular/core';
import { Stat } from '../../models/stat.model';

@Component({
  selector: 'app-stat-block',
  imports: [],
  templateUrl: './stat-block.component.html',
  styleUrl: './stat-block.component.scss',
})
export class StatBlockComponent {
  readonly stat = input.required<Stat>();
}
