import WeatherList from "@/components/weather/WeatherList";
import fs from 'fs';
import path from 'path';

export default async function Home() {

    let cityIds:number[] = [];

    try {
        const filePath = path.join(process.cwd(), 'public', 'cities.json');
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const cities = JSON.parse(jsonData);
        cityIds = cities.List.map((city: any) => city.CityCode);
    } catch (err) {
        console.error("Failed to load weather data:", err);
    }

    return (
        <main>
            <div className="flex justify-center">
                <div className="flex flex-col w-4/5 gap-5">
                    <WeatherList cityIds={cityIds}/>
                </div>
            </div>
        </main>
    );
}
