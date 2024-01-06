import { useQuery } from '@tanstack/react-query';

import { fetchCurrencies } from './fetchCurrencies';
import { fetchRates } from './fetchRates';

export const useApiCurrencies = ({ mapper } = {}) =>
    useQuery({
        queryKey: ['currencies'],
        queryFn: fetchCurrencies,
        select: mapper,
    });

export const useApiRates = () =>
    useQuery({
        queryKey: ['ratesList'],
        queryFn: fetchRates,
        select: (data) => data.rates,
    });
