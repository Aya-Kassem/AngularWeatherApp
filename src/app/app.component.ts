import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { DisplayWeatherComponent } from './Components/display-weather/display-weather.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, DisplayWeatherComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'weatherApp';
  country!: string;
  city!: string;
  weatherState!: string;
  localTime!: string;

  constructor() { }
  ngOnInit() {
    this.createCitiesArray();

  }

  createCitiesArray() {
    let allCities = localStorage.getItem('cities');
    if (!allCities) localStorage.setItem('cities', JSON.stringify(['Cairo']));
  }
}
