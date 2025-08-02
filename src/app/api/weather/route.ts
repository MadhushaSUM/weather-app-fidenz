import { NextRequest, NextResponse } from 'next/server';
import { fetchWeatherData } from '@/lib/weather/service';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const cityIdsParam = searchParams.get('cityIds');

        if (!cityIdsParam) {
            return NextResponse.json(
                { error: 'cityIds parameter is required' },
                { status: 400 }
            );
        }

        const cityIds = cityIdsParam.split(',').map(id => parseInt(id.trim()));

        if (cityIds.some(id => isNaN(id))) {
            return NextResponse.json(
                { error: 'Invalid city IDs provided' },
                { status: 400 }
            );
        }

        const weatherData = await fetchWeatherData(cityIds);

        return NextResponse.json(weatherData, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
            }
        });
    } catch (error) {
        console.error('Weather API route error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
