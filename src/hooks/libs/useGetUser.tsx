'use client';

import { useQuery } from '@tanstack/react-query';
import useAuthAxios from '../useAuthAxios';

const useGetUser = (id: string) => {
    const authAxios = useAuthAxios();
    const query = useQuery({
        queryKey: ['user', id],
        queryFn: () => authAxios.get(`/user/${id}`),
        staleTime: 30 * 60 * 1000,
        gcTime: Infinity,
        enabled: !!id,
    });

    return query;
};

export default useGetUser;
