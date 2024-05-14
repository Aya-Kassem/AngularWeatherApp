import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'equinoxes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equinoxes.component.html',
  styleUrls: ['./equinoxes.component.scss']
})
export class EquinoxesComponent {
  @Input() sunriseTime!: string;
  @Input() sunsetTime!: string;
}
