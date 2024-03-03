'use client';
import queryClient from '@/libs/queryClient';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface IProvidersProps {
    children: ReactNode;
}

const Providers = ({ children }: IProvidersProps) => {
    return (
        <NextUIProvider>
            <QueryClientProvider client={queryClient}>
                <SessionProvider>{children}</SessionProvider>
            </QueryClientProvider>
        </NextUIProvider>
    );
};

export default Providers;
