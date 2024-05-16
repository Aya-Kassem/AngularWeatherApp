import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { DisplayWeatherComponent } from './Components/display-weather/display-weather.component';
import { WeatherService } from './Services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, DisplayWeatherComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'weatherApp';
  weatherState!: string;

  constructor(private _WeatherService: WeatherService) { }
  ngOnInit() {
    this.createCitiesArray();
    this._WeatherService.state.subscribe((val) => {
      this.weatherState = val;
    })
  }

  createCitiesArray() {
    let allCities = localStorage.getItem('cities');
    if (!allCities) localStorage.setItem('cities', JSON.stringify(['Cairo']));
  }

  ngAfterViewChecked(){
    //console.log('aaaaaaaaaaaaaaaaaa');
  }
}
