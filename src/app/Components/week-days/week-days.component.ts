import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { dayData } from 'src/app/Models/day.interface';

@Component({
  selector: 'weekDays',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './week-days.component.html',
  styleUrls: ['./week-days.component.scss'],
  providers: [DatePipe]
})
export class WeekDaysComponent {
  @Input() threeDaysWeather!: dayData[];
  @Output() selectedDay: EventEmitter<string> = new EventEmitter<string>();

  getDayWeather(selectedDay: HTMLSpanElement, day: HTMLAnchorElement) {
    this.getActiveDay(day);
    this.selectedDay.emit(selectedDay.innerText);
  }

  getActiveDay(day: HTMLAnchorElement) {
    let allDays = document.querySelectorAll('.day');
    allDays.forEach(day => day.classList.remove('active'));
    day.classList.add('active')
  }

}
