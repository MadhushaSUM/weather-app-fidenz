'use client';

import {Col, Row} from "antd";
import WeatherCard from "@/components/weather/WeatherCard";
import {useWeatherData} from "@/hooks/weather/queries";
import {WeatherData} from "@/lib/weather/types";
import {generateDarkColors} from "@/components/weather/randomColors";
import {useEffect, useState} from "react";

type WeatherListProps = {
    cityIds: number[];
};

export default function WeatherList({ cityIds }: WeatherListProps) {
    const [weatherDataArray, setWeatherDataArray] = useState<{data: WeatherData, color: string, key: number}[]>([]);

    const {
        data: weatherData,
    } = useWeatherData(cityIds);

    useEffect(() => {
        if (weatherData) {
            setWeatherDataArray(weatherData.map(item => (
                {
                    data: item,
                    color: generateDarkColors(),
                    key: item.city.cityId
                }
            )));
        }
    }, [weatherData]);

    const closeWeatherCard = (cityId: number) => {
        setWeatherDataArray(weatherDataArray.filter(item => {
            return item.data.city.cityId !== cityId;
        }));
    }

    const getWeatherCardsByCityId = () => {
        return weatherDataArray.map(item => (
            <Col key={item.key} xs={24} md={12}>
                <WeatherCard
                    cityWeather={item.data}
                    cardCoverColor={item.color}
                    individual={false}
                    handleClose={() => closeWeatherCard(item.key)}
                />
            </Col>
        ))
    }

    return (
        <div className="mb-10">
            <Row gutter={[32, 32]}>
                {
                    weatherDataArray ? getWeatherCardsByCityId() : <div>No Data</div>
                }
            </Row>
        </div>
    )
}