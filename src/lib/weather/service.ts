import {getConfig} from "@/lib/weather/config";

const { openWeatherMapApiKey, openWeatherMapBaseUrl } = getConfig();

export const fetchWeatherData = async (
    cityIds: number[]
) => {
    let data = [];
    try {
        for (const cityId of cityIds) {
            const url = `${openWeatherMapBaseUrl}/weather?id=${Number(cityId)}&units=metric&appid=${openWeatherMapApiKey}`;

            const response = await fetch(url);

            if (!response.ok) {
                const errorText = await response.text();
                console.error(errorText);
            }

             data.push(await response.json());
        }

        return data;

    } catch (error) {
        console.error("Error in fetchWeatherData service:", error);
        throw error;
    }
};
