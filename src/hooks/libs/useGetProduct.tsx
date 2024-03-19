'use client';

import { axiosInstance } from '@/services/axios';
import { useQuery } from '@tanstack/react-query';

const useGetProduct = (id: string) => {
    const query = useQuery({
        queryKey: ['product', id],
        queryFn: () => axiosInstance.get(`/product/${id}`),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
    return query;
};

export default useGetProduct;
