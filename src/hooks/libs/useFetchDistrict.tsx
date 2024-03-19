'use client';
import { ShippingAxios } from '@/services/axios';
import { useQuery } from '@tanstack/react-query';

const useFetchDistrict = ({ provinceId }: { provinceId: string | null | number }) => {
    const fetch = useQuery({
        queryKey: ['district', provinceId],
        queryFn: () =>
            ShippingAxios.get(
                `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`
            ),
        enabled: !!provinceId,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return fetch;
};

export default useFetchDistrict;
