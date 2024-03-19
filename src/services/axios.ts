'use client';
import axios from 'axios';

export const ShippingAxios = axios.create({
    headers: {
        'Content-Type': 'application/json',
        token: process.env.NEXT_PUBLIC_GHN_TOKEN,
    },
});

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
