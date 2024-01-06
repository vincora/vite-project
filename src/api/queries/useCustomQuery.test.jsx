import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { test, expect } from 'vitest';

import { mockCurrencies } from '@/mocks/mockCurrencies';
import { mockRates } from '@/mocks/mockRates';

import { useCustomQuery } from './useCustomQuery';

test('intercept fetch for testing', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    const wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useCustomQuery(), { wrapper });

    await waitFor(() => expect(result.current.currenciesQuery.isSuccess).toBe(true));
    await waitFor(() => expect(result.current.ratesQuery.isSuccess).toBe(true));
});

test('fetches mocked data correctly', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    const wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useCustomQuery(), { wrapper });

    await waitFor(() => expect(result.current.currenciesQuery.data).toEqual(mockCurrencies));
    await waitFor(() => expect(result.current.ratesQuery.data).toEqual(mockRates.rates));
});
