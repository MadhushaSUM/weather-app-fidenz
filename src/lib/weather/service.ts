import {WeatherData} from "@/lib/weather/types";
import {fetchWeatherDataFromAPI, transformWeatherData} from "@/lib/weather/api";
import {getCachedData, setCachedData} from "@/lib/weather/cache";

/**
 * service function to fetch weather data. Data is cached.
 * This is used in front-end
 * @param cityIds city code number array to get weather data
 */
export const fetchWeatherData = async (
    cityIds: number[]
) : Promise<WeatherData[]> => {

    let data = [];

    try {
        for (const cityId of cityIds) {

            const cacheKey = `weather_data_${cityId}`;

            // 1. Check cache first
            const cachedData = getCachedData(cacheKey);
            if (cachedData) {
                data.push(cachedData);
                continue;
            }

            // 2. If not in cache or expired, fetch from API
            const openWeatherRes = await fetchWeatherDataFromAPI(cityId);

            // 3. Transform API data to our simplified format
            const weatherData = transformWeatherData(openWeatherRes);

            // 4. Store the transformed data in the cache
            setCachedData(cacheKey, weatherData);

            data.push(weatherData);
        }

        return data;
    } catch (error) {
        console.error("Error in fetchWeatherData service:", error);
        throw error;
    }
};
