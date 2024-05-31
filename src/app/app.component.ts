import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { DisplayWeatherComponent } from './Components/display-weather/display-weather.component';
import { WeatherService } from './Services/weather.service';
import { countryData } from './Models/currentCountry.interface';
import { DefaultCountryComponent } from './Components/default-country/default-country.component';
import { LoaderComponent } from './Shared/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    NavbarComponent, 
    DisplayWeatherComponent, 
    DefaultCountryComponent,
    LoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements AfterViewInit {
  title = 'weatherApp';
  country!: string;
  city!: string;
  time!: string;
  state!: string;
  isContentVisible: boolean = false;
  showLoader: boolean = true;
  constructor(private _WeatherService: WeatherService, private _ChangeDetectorRef: ChangeDetectorRef) { }
  
  ngOnInit() {
    let defaultCountryExist = localStorage.getItem('cities')!;
    defaultCountryExist = JSON.parse(defaultCountryExist);

    if (defaultCountryExist) {
      this._WeatherService.defaultCountry = defaultCountryExist[0];
      this.isContentVisible = true;
    }
  }

  getCurrentCountryInfo(countryInfo: countryData) {
    if(countryInfo) this.isContentVisible = true;
    
    this.country = countryInfo.name;
    this.city = countryInfo.city;
    this.time = countryInfo.time;
    this.state = countryInfo.state;
  }

  createCitiesArray() {
    let allCities = localStorage.getItem('cities');
    let defaultCity = this.getFirstLetterCapitalize(this._WeatherService.defaultCountry);
    if (!allCities && defaultCity) localStorage.setItem('cities', JSON.stringify([`${defaultCity}`]));
  }

  showContent(val: boolean) {
    this.createCitiesArray();
    if (!val) this.isContentVisible = true;
  }

  getFirstLetterCapitalize(word: string) {
    const capitalizeFirstLetter = word.slice(0, 1).toLocaleUpperCase();
    const city = capitalizeFirstLetter + word.slice(1);
    return city;
  }
  ngAfterViewInit(){
    console.log('aaa');
    this.showLoader = false;
    this._ChangeDetectorRef.detectChanges();
  }


}
