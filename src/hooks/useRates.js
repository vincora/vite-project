import { useQuery } from '@tanstack/react-query';

import { fetchRates } from './fetchRates';

export const useRates = () => {
    return useQuery({
        queryKey: ['ratesList'],
        queryFn: fetchRates,
    });
};
