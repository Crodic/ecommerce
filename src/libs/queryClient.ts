'use client';
import { QueryClient } from '@tanstack/react-query';

const queriesOptions = {
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
};

const queryClient = new QueryClient({
    defaultOptions: { queries: queriesOptions },
});

export default queryClient;
