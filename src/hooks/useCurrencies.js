import { useQuery } from '@tanstack/react-query';
import { fetchCurrencies } from './fetchCurrencies';

export const useCurrencies = () => {
    return useQuery({
        queryKey: ['currencies'],
        queryFn: fetchCurrencies,
    });
};
