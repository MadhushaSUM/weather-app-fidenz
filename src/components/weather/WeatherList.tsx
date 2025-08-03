import {Col, Row} from "antd";
import WeatherCard from "@/components/weather/WeatherCard";

type WeatherListProps = {
    cityIds: number[];
};

export default function WeatherList({ cityIds }: WeatherListProps) {

    const getWeatherCardsByCityId = (cityIds: number[]) => {
        return cityIds.map(cityId => (
            <Col key={cityId} xs={24} md={12}>
                <WeatherCard/>
            </Col>
        ))
    }

    return (
        <div className="mb-10">
            <Row gutter={[32, 32]}>
                {getWeatherCardsByCityId(cityIds)}
            </Row>
        </div>
    )
}