export interface weather {
    dayName: string;
    sunrise: string;
    sunset: string;
    uv: number;
    humidity: number;
    oldHours: string[];
    date: string;
    temp: string;
    icon: string
}

export interface dayData{
    temp: string,
    icon: string,
    day: string
}

export interface countryData {
    name: string,
    city: string,
    time: string,
    state: string
} 