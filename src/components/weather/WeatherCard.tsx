import {WeatherData} from "@/lib/weather/types";
import {Card, Divider} from "antd";
import Image from "next/image";
import {ArrowLeftOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";

type WeatherCardProps = {
    cityWeather: WeatherData;
    cardCoverColor: string;
    individual: boolean;
    handleClose?: () => void;
};

export default function WeatherCard({cityWeather, cardCoverColor, individual, handleClose}: WeatherCardProps) {
    const router = useRouter()

    const getCardCover = (cardCoverColor: string) => {
        return (
            <div style={{position: 'relative', backgroundColor: cardCoverColor}}>
                <div style={{
                    backgroundImage: 'url("/cloud-background.png")',
                    opacity: 0.2,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0
                }}/>
                {
                    individual
                        ?
                    <div style={{
                        position: 'absolute',
                        top: '0.5rem',
                        left: '0.5rem',
                        zIndex: 2,
                        cursor: 'pointer'
                    }}>
                        <ArrowLeftOutlined
                            style={{fontSize: '18px'}}
                            onClick={() => router.back()}
                        />
                    </div>
                        :
                    <div style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        zIndex: 2,
                        cursor: 'pointer'
                    }}>
                        <CloseCircleOutlined
                            style={{fontSize: '18px'}}
                            onClick={handleClose}
                        />
                    </div>
                }

                <div
                    style={{position: 'relative', zIndex: 1}}
                    className={individual ? "flex justify-center items-center h-80" : "h-auto"}
                >
                    {
                        individual
                            ?
                        <div className="flex flex-col gap-2 items-center p-5 w-3/4">
                            <div className="flex flex-col gap-2 items-center">
                                <div className="text-2xl font-semibold">
                                    {cityWeather.city.cityName}, {cityWeather.city.country}
                                </div>
                                <div>
                                    {cityWeather.city.timezone}
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 w-3/4">
                                <div className="flex flex-1 flex-col gap-2 items-center">
                                    <div>Image</div>
                                    <div className="text-lg font-normal">{cityWeather.weatherDesc}</div>
                                </div>
                                <Divider
                                    type="vertical"
                                    style={{
                                        backgroundColor: "white",
                                        height: 'auto',
                                        alignSelf: 'stretch',
                                        margin: '0 16px'
                                    }}
                                />
                                <div className="flex flex-1 flex-col gap-2 items-center">
                                    <div className="text-4xl font-semibold">
                                        {cityWeather.temp} °C
                                    </div>
                                    <div className="text-sm font-normal">
                                        Temp Min :{cityWeather.tempMin} °C
                                    </div>
                                    <div className="text-sm font-normal">
                                        Temp Max :{cityWeather.tempMax} °C
                                    </div>
                                </div>
                            </div>
                        </div>
                            :
                        <div className="flex flex-row gap-2 p-5">
                            <div className="flex flex-1 flex-col gap-2 items-center">
                                <div className="text-2xl font-semibold">
                                    {cityWeather.city.cityName}, {cityWeather.city.country}
                                </div>
                                <div>
                                    {cityWeather.city.timezone}
                                </div>
                                <div className="text-lg font-normal">
                                    {cityWeather.weatherDesc}
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col gap-2 items-center">
                                <div className="text-4xl font-semibold">
                                    {cityWeather.temp} °C
                                </div>
                                <div className="text-sm font-normal">
                                    Temp Min :{cityWeather.tempMin} °C
                                </div>
                                <div className="text-sm font-normal">
                                    Temp Max :{cityWeather.tempMax} °C
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }

    const handleCardClick = () => {
        if (!individual) {
            router.push(`/city?citycode=${cityWeather.city.cityId}&cardcovercolor=${cardCoverColor.substring(1)}`);
        }
    }

    return (
        <Card
            hoverable={true}
            variant="borderless"
            style={{backgroundColor: '#3b3b3b', padding: 0, margin: 0, color: 'white'}}
            cover={getCardCover(cardCoverColor)}
            onClick={handleCardClick}
        >
            <div className={`flex flex-row gap-1 justify-center ${individual && "px-10 xs:px-0"}`}>
                <div className="flex flex-1 flex-col justify-center gap-1">
                    <div className="flex flex-col sm:flex-row gap-1">
                        <div className="font-semibold">
                            Pressure:
                        </div>
                        <div>
                            {cityWeather.pressure} hPa
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-1">
                        <div className="font-semibold">
                            Humidity:
                        </div>
                        <div>
                            {cityWeather.humidity} %
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-1">
                        <div className="font-semibold">
                            Visibility:
                        </div>
                        <div>
                            {cityWeather.visibility} km
                        </div>
                    </div>
                </div>
                <Divider
                    type="vertical"
                    style={{
                        backgroundColor: "gray",
                        height: 'auto',
                        alignSelf: 'stretch',
                        margin: '0 16px'
                    }}
                />
                <div className="flex flex-1 flex-col gap-2 justify-center items-center">
                    <div>
                        <Image src={"/wind.svg"} alt="wind icon" width={32} height={32}/>
                    </div>
                    <div>
                        {cityWeather.wind.windSpeed}m/s {cityWeather.wind.windDirection} Degree
                    </div>
                </div>
                <Divider
                    type="vertical"
                    style={{
                        backgroundColor: "gray",
                        height: 'auto',
                        alignSelf: 'stretch',
                        margin: '0 16px'
                    }}
                />
                <div className="flex flex-1 flex-col gap-1 justify-center items-end content-end">
                    <div className="flex flex-col sm:flex-row gap-1">
                        <div className="font-semibold">
                            Sunrise:
                        </div>
                        <div>
                            {cityWeather.city.sunrise}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-1">
                        <div className="font-semibold">
                            Sunset:
                        </div>
                        <div>
                            {cityWeather.city.sunset}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}