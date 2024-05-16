import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
    key: string = 'c22e51960dac495ca4565757211809';
    userSearch!: string;
    userClicked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    resultSubject = new Subject<any>();
    result$ = this.resultSubject.asObservable();
    state: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor(private _HttpClient: HttpClient) { }
    fetchWeatherData(city: string = 'Cairo') {
        return this._HttpClient.get<any>(`https://api.weatherapi.com/v1/forecast.json?key=${this.key}&q=${city}&days=3`)
    }

    getUserSearchResult() {
        this.fetchWeatherData(this.userSearch).subscribe((val) => {
            this.resultSubject.next(val)
        })
    }

} 