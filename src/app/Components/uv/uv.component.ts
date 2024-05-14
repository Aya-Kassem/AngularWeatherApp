import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'UV',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uv.component.html',
  styleUrls: ['./uv.component.scss']
})
export class UVComponent {
  @Input() degree!: number;
  uvIndex!: string;

  getUvIndex(uv: number) {
    let index;
    switch (uv) {
      case 1:
      case 2:
        index = 'Low';
        break;
      case 3:
      case 4:
      case 5:
        index = 'Moderate';
        break;
      case 6:
      case 7:
        index = 'High';
        break;
      case 8:
      case 9:
      case 10:
        index = 'Very High';
        break;
      default:
        if (uv >= 11) {
          index = 'Extreme';
        }
        break;
    }
    return index;
  }

  ngDoCheck() {
    this.uvIndex = this.getUvIndex(this.degree)!;
  }
}
