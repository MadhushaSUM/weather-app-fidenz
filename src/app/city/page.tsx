"use client";

import {useSearchParams} from "next/navigation";
import {useWeatherDataForCity} from "@/hooks/weather/queries";
import WeatherCard from "@/components/weather/WeatherCard";

export default function CityWeather() {
    const params = useSearchParams();

    const cardCoverColor = "#" + params.get("cardcovercolor");
    const cityCode = Number(params.get("citycode"));

    const {
        data: cityWeather,
    } = useWeatherDataForCity(cityCode);

    return (
        <div className="flex justify-center">
            <div className="w-4/5">
                {
                    cityWeather
                        ?
                        <WeatherCard
                            cityWeather={cityWeather}
                            cardCoverColor={cardCoverColor}
                            individual={true}
                            handleClose={() => {}}
                        />
                        :
                        <p>No Data</p>
                }
            </div>
        </div>
    );
}