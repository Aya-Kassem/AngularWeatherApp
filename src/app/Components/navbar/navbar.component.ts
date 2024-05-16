import { Component } from '@angular/core';
import { WeatherService } from 'src/app/Services/weather.service';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'navbar',
  standalone: true,
  imports: [DropdownModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  cities!: string[];
  searchCity!: string;
  currentCity!: string;

  constructor(private _weatherService: WeatherService) { }
  ngOnInit() {
    this.currentCity = 'Cairo';
    let savedCities = JSON.parse(localStorage.getItem('cities')!) || [];
    if (savedCities) {
      this.cities = savedCities;
    }
  }

  getUserSearchCity(event: Event) {
    let searchInput = document.querySelector('#searchKeyWord') as HTMLInputElement;
    if ((event as KeyboardEvent).key === 'Enter' || (event as MouseEvent).type === 'click') {
      this.searchCity = searchInput.value;
      this.currentCity = this.getFirstLetterCapitalize(searchInput.value);
      searchInput.value = '';
      this._weatherService.userSearch = this.searchCity;
      this._weatherService.userClicked.next(true);
      this.saveUserInput();
    }

  }

  getWeatherfromfavourites(event: DropdownChangeEvent) {
    this.currentCity = event.value;
    this._weatherService.userSearch = event.value;
    this._weatherService.userClicked.next(true);
  }

  saveUserInput() {
    const city = this.getFirstLetterCapitalize(this.searchCity);
    if (!this.cities.includes(city)) this.cities.push(city)
    localStorage.setItem('cities', JSON.stringify(this.cities))
  }

  getFirstLetterCapitalize(word: string){
    const capitalizeFirstLetter = word.slice(0, 1).toLocaleUpperCase();
    const city = capitalizeFirstLetter + word.slice(1);
    return city;
  }
}
