import {WeatherData} from "@/lib/weather/types";
import {fetchWeatherDataFromAPI, transformWeatherData} from "@/lib/weather/api";

/**
 * service function to fetch weather data.
 * This is used in front-end
 * @param cityIds city code number array to get weather data
 */
export const fetchWeatherData = async (
    cityIds: number[]
) : Promise<WeatherData[]> => {
    let data = [];
    try {
        for (const cityId of cityIds) {
            const openWeatherRes = await fetchWeatherDataFromAPI(cityId);
            data.push(transformWeatherData(openWeatherRes));
        }

        return data;
    } catch (error) {
        console.error("Error in fetchWeatherData service:", error);
        throw error;
    }
};
