'use client';

import { useQuery } from '@tanstack/react-query';
import { WeatherData } from '@/lib/weather/types';

const fetcher = async (url: string): Promise<WeatherData[]> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

/**
 * Weather data for more than one city code
 */
export const useWeatherData = (cityIds: number[]) => {
    const cityIdsString = cityIds.join(',');

    return useQuery({
        queryKey: ['weather', cityIds],
        queryFn: () => fetcher(`/api/weather?cityIds=${cityIdsString}`),
        enabled: cityIds.length > 0,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchInterval: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: (failureCount, error) => {
            return failureCount < 3;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });
};

/**
 * Weather data for individual city code
 */
export const useWeatherDataForCity = (cityId: number) => {
    return useQuery({
        queryKey: ['weather', 'city', cityId],
        queryFn: () => fetcher(`/api/weather?cityIds=${cityId}`),
        enabled: !!cityId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        select: (data: WeatherData[]) => data[0],
    });
};