import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EquinoxesComponent } from '../equinoxes/equinoxes.component';
import { HumidityComponent } from '../humidity/humidity.component';
import { TemperatureChartComponent } from '../temperature-chart/temperature-chart.component';
import { UVComponent } from '../uv/uv.component';
import { WeekDaysComponent } from '../week-days/week-days.component';
import { Subscription } from 'rxjs';
import { WeatherService } from 'src/app/Services/weather.service';
import { countryData, dayData, weather } from 'src/app/Models/weather.interface';

@Component({
  selector: 'displayWeather',
  standalone: true,
  imports: [
    CommonModule,
    EquinoxesComponent,
    HumidityComponent,
    TemperatureChartComponent,
    UVComponent, WeekDaysComponent],
  templateUrl: './display-weather.component.html',
  styleUrls: ['./display-weather.component.scss'],
  providers: [DatePipe]
})


export class DisplayWeatherComponent {
  subscription!: Subscription;
  countryMainData: countryData = { name: '', city: '', time: '', state: '' };
  allWeatherData!: weather[];
  currentDayWeather!: weather;
  daysUI!: dayData[];
  currentDayName!: string;
  todayDate!: string;
  UV!: number;
  humidity!: number;
  equinoxes: { sunrise: string, sunset: string } = { sunrise: '', sunset: '' };


  constructor(private _WeatherService: WeatherService, private _DatePipe: DatePipe) { }

  ngOnInit() {
    this.currentDayName = this._DatePipe.transform(new Date(), 'EEEE')!;
    this.todayDate = this._DatePipe.transform(new Date(), 'yyyy-MM-dd')!;
    this.getDefaultCountryWeather();
    this.getUserSearchWeather();
  }

  getDefaultCountryWeather() {
    this.subscription = this._WeatherService.fetchWeatherData().subscribe((data) => {
      this.getCurrentCountryData(data)
    })
  }

  getCurrentCountryData(allResponse: any) {
    let [country, cityName, localtime, weatherState] = [allResponse.location.country, allResponse.location.name, allResponse.location.localtime, allResponse.current.condition.text];
    this.countryMainData.name = country;
    this.countryMainData.city = cityName;
    this.countryMainData.time = localtime;
    this.countryMainData.state = weatherState;

    this.getallThreeDaysWeather(allResponse.forecast.forecastday);
  }

  getallThreeDaysWeather(data: any) {
    const threeDaysWeather = data.map((el: any) => ({
      dayName: this._DatePipe.transform(new Date(el.date), 'EEEE'),
      sunrise: el.astro.sunrise,
      sunset: el.astro.sunset,
      humidity: el.day.avghumidity,
      oldHours: el.hour.map((hr: any) => { return hr['temp_c'] }),
      uv: el.day.uv,
      date: el.date,
      temp: el.day.avgtemp_c,
      icon: `https:${el.day.condition.icon}`
    }));

    this.allWeatherData = threeDaysWeather;
    this.getDaysNameAndStatus();
    this.currentDayWeather = this.allWeatherData[0];
    this.buildUI()
  }

  getDaysNameAndStatus() {
    this.daysUI = this.allWeatherData.map((el: any) => ({ day: el.dayName, temp: el.temp, icon: el.icon }));
  }

  getWeatherOfSelectedDay(day: string) {
    this.currentDayWeather = this.allWeatherData.filter((el) => el.dayName === day)[0];
    this.buildUI()
  }

  buildUI() {
    this.UV = this.currentDayWeather.uv;
    this.humidity = this.currentDayWeather.humidity;
    this.equinoxes.sunrise = this.currentDayWeather.sunrise
    this.equinoxes.sunset = this.currentDayWeather.sunset
  }

  getUserSearchWeather() {
    this.subscription = this._WeatherService.userClicked.subscribe((val) => {
      if (val) this._WeatherService.getUserSearchResult();
    })

    this.subscription = this._WeatherService.result$.subscribe((result) => {
      this.getCurrentCountryData(result)
    })
  }


}
