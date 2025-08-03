"use client";

import {useSearchParams} from "next/navigation";
import {useWeatherDataForCity} from "@/hooks/weather/queries";
import WeatherCard from "@/components/weather/WeatherCard";
import {Suspense} from "react";

export default function CityWeatherPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CityWeather />
        </Suspense>
    );
}

function CityWeather() {
    const params = useSearchParams();

    const cardCoverColorRaw = params.get("cardcovercolor");
    const cityCodeRaw = params.get("citycode");

    const cardCoverColor = cardCoverColorRaw ? `#${cardCoverColorRaw}` : '#1f2937';
    const cityCode = Number(cityCodeRaw);

    const {
        data: cityWeather,
        isLoading,
        isError,
    } = useWeatherDataForCity(cityCode);

    if (!cityCodeRaw || isNaN(cityCode)) {
        return <p>City code is missing or invalid in URL.</p>;
    }

    if (isLoading) return <div>Loading weather data...</div>;
    if (isError || !cityWeather) return <p>Could not load weather data.</p>;

    return (
        <div className="flex justify-center">
            <div className="w-4/5">
                <WeatherCard
                    cityWeather={cityWeather}
                    cardCoverColor={cardCoverColor}
                    individual={true}
                    handleClose={() => {}}
                />
            </div>
        </div>
    );
}