
export const getConfig = () => {
    const openWeatherMapApiKey = process.env.OPENWEATHERMAP_API_KEY;
    const openWeatherMapBaseUrl = process.env.OPENWEATHERMAP_BASE_URL;

    if (!openWeatherMapApiKey || !openWeatherMapBaseUrl) {
        throw new Error("Required environment variables are not defined!");
    }

    return {
        openWeatherMapApiKey,
        openWeatherMapBaseUrl,
    };
};
