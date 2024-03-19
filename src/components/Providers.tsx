'use client';
import queryClient from '@/libs/queryClient';
import { NextUIProvider } from '@nextui-org/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IProvidersProps {
    children: ReactNode;
}

const Providers = ({ children }: IProvidersProps) => {
    return (
        <NextUIProvider>
            <QueryClientProvider client={queryClient}>
                <SessionProvider>{children}</SessionProvider>
            </QueryClientProvider>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </NextUIProvider>
    );
};

export default Providers;
