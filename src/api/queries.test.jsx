import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { test, expect } from 'vitest';

import { mockCurrencies } from '@/mocks/mockCurrencies';
import { mockRates } from '@/mocks/mockRates';

import { useApiCurrencies, useApiRates } from './queries';

test('intercepts useApiCurrencies fetch for testing', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    const wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useApiCurrencies(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
});

test('intercepts useApiRates fetch for testing', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    const wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useApiRates(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
});

test('fetches rates mocked data correctly', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    const wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useApiRates(), { wrapper });
    await waitFor(() => expect(result.current.data).toEqual(mockRates.rates));
});

test('fetches currencies mocked data correctly', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    const wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useApiCurrencies(), { wrapper });
    await waitFor(() => expect(result.current.data).toEqual(mockCurrencies));
});