import { Typography } from 'antd';
import { fetchWeatherData } from '@/lib/weather/service';
import fs from 'fs';
import path from 'path';

export default async function Home() {
    let weatherData = [];

    try {
        const filePath = path.join(process.cwd(), 'public', 'cities.json');
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const cities = JSON.parse(jsonData);
        const cityIds = cities.List.map((city: any) => city.CityCode);

        weatherData = await fetchWeatherData(cityIds);
    } catch (err) {
        console.error("Failed to load weather data:", err);
    }

    return (
        <main>
            <div>
                <Typography>
                    <pre>{JSON.stringify(weatherData, null, 2)}</pre>
                </Typography>
            </div>
        </main>
    );
}
