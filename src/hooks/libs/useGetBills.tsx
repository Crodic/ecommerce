'use client';

import { useQuery } from '@tanstack/react-query';
import useAuthAxios from '../useAuthAxios';

const useGetBills = (userId: string | undefined) => {
    const authAxios = useAuthAxios();
    const query = useQuery({
        queryKey: ['bill', userId],
        queryFn: () => authAxios.get(`/bill`),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        enabled: !!userId,
    });

    return query;
};

export default useGetBills;
