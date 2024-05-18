import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from 'src/app/Services/weather.service';

@Component({
  selector: 'defaultCountry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './default-country.component.html',
  styleUrls: ['./default-country.component.scss']
})
export class DefaultCountryComponent {
  @Output() isModalVisible: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  showErrorMsg: boolean = false;
  showInvalidMsg: boolean = false;

  constructor(private _WeatherService: WeatherService) { }
  getUserCountry(country: string) {
    country ? this.isValidCountry(country) : this.showErrorMsg = true;
  }

  isValidCountry(country: string) {
    this._WeatherService.isValidCountry(country);
    this._WeatherService.validSearch.subscribe((valid) => {
      if (valid) {
        this._WeatherService.defaultCountry = country;
        this.isModalVisible.emit(false);
      } else {
        this.showInvalidMsg = true;
      }
    })
  }

  hideErrorMessages(userInput: HTMLInputElement) {
    if (userInput) {
      this.showInvalidMsg = false;
      this.showErrorMsg = false;
    }
  }
}
