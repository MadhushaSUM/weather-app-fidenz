export interface OpenWeatherMapResponse {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level?: number;
        grnd_level?: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust?: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface WeatherData {
    city: CityDetails;
    weatherText: string;
    weatherDesc: string;
    weatherIcon: string;
    temp: number;
    tempMin: number;
    tempMax: number;
    pressure: number;
    humidity: number;
    visibility: number;
    wind: WindDetails;
}

interface CityDetails {
    cityId: number;
    cityName: string;
    timezone: number;
    country: string;
    sunrise: number;
    sunset: number;
}

interface WindDetails {
    windSpeed: number;
    windDirection: number;
}