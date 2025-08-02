'use client';

import {Typography} from 'antd';
import {useWeatherData, useWeatherDataForCity} from "@/hooks/weather/queries";

export default function Home() {
    const {
        data: weatherData,
    } = useWeatherData([1850147, 2644210, 2988507]);

    const {
        data: individualCityWeatherData,
    } = useWeatherDataForCity(3143244);


    return (
        <main>
            <div className="flex justify-center">
                <div className="flex flex-col w-3/4 gap-5">
                    <div>
                        <Typography>
                            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
                        </Typography>
                    </div>
                    <div>
                        <Typography>
                            <pre>{JSON.stringify(individualCityWeatherData, null, 2)}</pre>
                        </Typography>
                    </div>
                </div>
            </div>
        </main>
    );
}
