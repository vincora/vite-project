import { useQuery } from '@tanstack/react-query';

import { fetchCurrencies } from '../fetchCurrencies';
import { fetchRates } from '../fetchRates';

export const useCustomQuery = () => {
    return {
        currenciesQuery: useQuery({
            queryKey: ['currencies'],
            queryFn: fetchCurrencies,
        }),
        ratesQuery: useQuery({
            queryKey: ['ratesList'],
            queryFn: fetchRates,
        }),
    };
};
