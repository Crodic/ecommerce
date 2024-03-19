import { ShippingAxios } from '@/services/axios';
import { useQuery } from '@tanstack/react-query';

const useFetchWard = ({ districtId }: { districtId: string | null | number }) => {
    const fetch = useQuery({
        queryKey: ['ward', districtId],
        queryFn: () =>
            ShippingAxios.get(
                `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`
            ),
        enabled: !!districtId,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return fetch;
};

export default useFetchWard;
