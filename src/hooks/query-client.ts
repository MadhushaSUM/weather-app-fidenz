import { QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query';

export const createQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // Default options for all queries
                staleTime: 60 * 1000,
                gcTime: 5 * 60 * 1000,
                refetchOnWindowFocus: false,
                retry: (failureCount, error) => {
                    return failureCount < 3;
                },
            },
            mutations: {
                retry: 1,
            },
            dehydrate: {
                shouldDehydrateQuery: (query) =>
                    defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
            },
        },
    });
};