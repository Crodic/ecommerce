'use client';
import { axiosInstance } from '@/services/axios';
import { useQuery } from '@tanstack/react-query';

const useFetchProduct = () => {
    const query = useQuery({
        queryKey: ['product'],
        queryFn: () => axiosInstance.get('/product'),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
    return query;
};

export default useFetchProduct;
