export interface weather {
    index: string;
    sunrise: string;
    sunset: string;
    date: string;
    dayName: string;
    temp: string;
    icon: string;
    uv: number;
    uvIndex: number;
    uvRadiationDegree: string; 
    humidity: number;
    oldHours: string[];
    hours: string[];
}

export interface dayData{
    temp: string,
    icon: string,
    name: string
}

export interface countryData {
    name: string,
    city: string,
    time: string,
    state: string
} 