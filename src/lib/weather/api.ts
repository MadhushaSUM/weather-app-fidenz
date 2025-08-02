import {getConfig} from '@/lib/config';
import {OpenWeatherMapResponse, WeatherData,} from '@/lib/weather/types';

const { openWeatherMapApiKey, openWeatherMapBaseUrl } = getConfig();

/**
 * Fetches weather data for a city ID from OpenWeatherMap API.
 * @param cityId OpenWeatherMap city ID.
 * @returns Promise resolving to the raw API response data.
 */
export const fetchWeatherDataFromAPI = async (
    cityId: number
): Promise<OpenWeatherMapResponse> => {

    const url = `${openWeatherMapBaseUrl}/weather?id=${cityId}&units=metric&appid=${openWeatherMapApiKey}`;

    try {
        console.log(`Fetching weather data from API for ID: ${cityId}`);
        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(
                `OpenWeatherMap API request failed with status ${response.status}
                : ${response.statusText}. 
                Details: ${errorText}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching weather data from API:", error);
        throw new Error(`Failed to fetch weather data: ${error instanceof Error ? error.message : String(error)}`);
    }
};

/**
 * Transforms raw OpenWeatherMap API data into our simplified format.
 * @param apiData The raw data from the OpenWeatherMap API.
 * @returns Array of simplified weather data objects.
 */
export const transformWeatherData = (
    apiData: OpenWeatherMapResponse
): WeatherData => {
    return {
        city: {
            cityId: apiData.id,
            cityName: apiData.name,
            timezone: apiData.timezone,
            country: apiData.sys.country,
            sunrise: apiData.sys.sunrise,
            sunset: apiData.sys.sunset,
        },
        weatherText: apiData.weather[0].main,
        weatherDesc: apiData.weather[0].description,
        weatherIcon: apiData.weather[0].icon,
        temp: apiData.main.temp,
        tempMin: apiData.main.temp_min,
        tempMax: apiData.main.temp_max,
        pressure: apiData.main.pressure,
        humidity: apiData.main.humidity,
        visibility: apiData.visibility,
        wind: {
            windSpeed: apiData.wind.speed,
            windDirection: apiData.wind.deg,
        },
    }
};
