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

  constructor(private _WeatherService: WeatherService, private _DatePipe: DatePipe) { }

  ngOnInit() {
    this.getCurrentCountryData();
  }

  getCurrentCountryData() {
    this.subscription = this._WeatherService.fetchWeatherData().subscribe((data) => {
      let [country, cityName, localtime, weatherState] = [data.location.country, data.location.name, data.location.localtime, data.current.condition.text];
      this.countryMainData.name = country;
      this.countryMainData.city = cityName;
      this.countryMainData.time = localtime;
      this.countryMainData.state = weatherState;

      this.prepareWeatherData(data.forecast.forecastday);
    })
  }

  prepareWeatherData(data: any) {
    let allWeatherDays: any = [];
    let index = 0;

    data.forEach((el: any) => {
      let day: any = {};
      day.index = index;
      day.sunrise = el.astro.sunrise;
      day.sunset = el.astro.sunset;
      day.date = el.date;
      day.dayName = this.dateTransform(el.date);
      day.temp = el.day.avgtemp_c;
      day.icon = 'https:' + el.day.condition.icon;
      day.uv = el.day.uv;
      // day.uvIndex = this.getUvIndex(day.uv);
      // day.uvRadiationDegree = this.getUvIndex(day.uv) == 'Very High' ? 'Very_High' : this.getUvIndex(day.uv);
      day.humidity = el.day.avghumidity;
      day.oldHours = el.hour.map((hr: any) => { return hr['temp_c'] });
      // day.hours = this.getAvgHours(day.oldHours);

      allWeatherDays.push(day);
      index++;
      // if (day.dayName == this.currentDay) {
      //   curr = day.index
      // }
    });
    this.allWeatherData = allWeatherDays;
    this.daysComponentData()
  }

  dateTransform(day: string) {
    const date = new Date(day);
    const dayName = this._DatePipe.transform(date, 'EEEE');
    return dayName;
  }

  daysComponentData() {
    let arr: dayData[] = [];
    this.allWeatherData.forEach((el) => {
      const [name, temp, icon] = [el.dayName, el.temp, el.icon];
      let obj = { name, temp, icon }
      arr.push(obj);
    })
    this.daysUI = arr;
  }

  getWeatherOfSelectedDay(day: string) {
    this.currentDayWeather = this.allWeatherData.filter((el) => el.dayName === day)[0];
    console.log(this.currentDayWeather);
  }
}
