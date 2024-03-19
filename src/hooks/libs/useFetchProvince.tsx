'use client';
import { ShippingAxios } from '@/services/axios';
import { useQuery } from '@tanstack/react-query';

const useFetchProvince = () => {
    const fetch = useQuery({
        queryKey: ['province'],
        queryFn: () => ShippingAxios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province'),
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return fetch;
};

export default useFetchProvince;
