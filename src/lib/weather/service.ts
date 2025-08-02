import {WeatherData} from "@/lib/weather/types";
import {fetchWeatherDataFromAPI, transformWeatherData} from "@/lib/weather/api";

/**
 * service function to fetch weather data. Data is cached.
 * This is used in /api/weather route
 * @param cityIds city code number array to get weather data
 */
export const fetchWeatherData = async (
    cityIds: number[]
) : Promise<WeatherData[]> => {

    try {
        const weatherPromises = cityIds.map(async (cityId) => {
            try {
                const openWeatherRes = await fetchWeatherDataFromAPI(cityId);
                return transformWeatherData(openWeatherRes);
            } catch (error) {
                console.error(`Error fetching weather for city ${cityId}:`, error);
                return null;
            }
        });

        const results = await Promise.all(weatherPromises);

        return results.filter((data): data is WeatherData => data !== null);
    } catch (error) {
        console.error("Error in fetchWeatherData service:", error);
        throw error;
    }
};
