'use client';

import { QueryClient } from '@tanstack/react-query';
import { createQueryClient } from '@/hooks/query-client';

let clientQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
    if (typeof window === 'undefined') {
        return createQueryClient();
    } else {
        if (!clientQueryClient) clientQueryClient = createQueryClient();
        return clientQueryClient;
    }
}