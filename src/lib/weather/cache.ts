import {CachedWeatherData, WeatherData} from '@/lib/weather/types';

const cache: Record<string, CachedWeatherData> = {};

// Cache duration 5 mins
const CACHE_DURATION_MS = 5 * 60 * 1000;

/**
 * Check if the cached data for a given key is still valid.
 * @param key The cache key.
 * @returns True if valid and not expired, false otherwise.
 */
const isCacheValid = (key: string): boolean => {
    const cachedItem = cache[key];
    if (!cachedItem) {
        return false;
    }
    const now = Date.now();
    return (now - cachedItem.timestamp) < CACHE_DURATION_MS;
};

/**
 * Retrieves cached data if it exists and is not expired.
 * @param key The cache key.
 * @returns The cached data array or null if not found/expired.
 */
export const getCachedData = (key: string): WeatherData | null => {
    if (isCacheValid(key)) {
        console.log(`[Cache] HIT for key: ${key}`);
        return cache[key].data;
    } else {
        delete cache[key];
        return null;
    }
};

/**
 * Stores data in the cache with the current timestamp.
 * @param key The cache key.
 * @param data The array of simplified weather data to cache.
 */
export const setCachedData = (key: string, data: WeatherData): void => {
    cache[key] = {
        data,
        timestamp: Date.now(),
    };
    console.log(`[Cache] SET for key: ${key}`);
};
