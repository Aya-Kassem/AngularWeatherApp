import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { WeatherService } from 'src/app/Services/weather.service';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'navbar',
    standalone: true,
    imports: [DropdownModule, CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    cities!: string[];
    currentCity!: string;
    @ViewChild('country') inputField!: ElementRef;
    showErr: boolean = false;
    validSearchSubscription!: Subscription;
    
    constructor(private _weatherService: WeatherService, private _Renderer2: Renderer2) { }
    
    ngOnInit() {
        this.currentCity = this.getFirstLetterCapitalize(this._weatherService.defaultCountry);
        let savedCities = JSON.parse(localStorage.getItem('cities')!) || [];
        if (savedCities) {
            this.cities = savedCities;
        }
    }

    getUserSearchCity(country: string, event: Event) {
        if (((event as KeyboardEvent).key === 'Enter' || (event as MouseEvent).type === 'click') && country) {
            this._Renderer2.setProperty(this.inputField.nativeElement, 'value', '');
            this.isValidCountry(country);
        }
    }

    getWeatherfromfavourites(event: DropdownChangeEvent) {
        this.currentCity = event.value;
        this._weatherService.userSearch = event.value;
        this._weatherService.userClicked.next(true);
    }

    saveUserInput(country: string) {
        if (!this.cities.includes(country)) {
            this.cities.push(country);
        }
        localStorage.setItem('cities', JSON.stringify(this.cities));
    }

    getFirstLetterCapitalize(word: string) {
        const capitalizeFirstLetter = word.slice(0, 1).toLocaleUpperCase();
        const city = capitalizeFirstLetter + word.slice(1);
        return city;
    }

    isValidCountry(country: string) {
        if (this.validSearchSubscription) {
            this.validSearchSubscription.unsubscribe();
        }
        this._weatherService.isValidCountry(country);
        this.validSearchSubscription = this._weatherService.validSearch.subscribe((valid) => {
            if (valid) {
                this.currentCity = this.getFirstLetterCapitalize(country);
                this._weatherService.userClicked.next(true);
                this.saveUserInput(this.currentCity);
                this.showErr = false;
            } else {
                this.showErr = true;
            }
        });
    }

    hideErrorMessages(userInput: HTMLInputElement) {
        if (userInput) {
            this.showErr = false;
        }
    }

    ngOnDestroy() {
        if (this.validSearchSubscription) {
            this.validSearchSubscription.unsubscribe();
        }
    }
}
