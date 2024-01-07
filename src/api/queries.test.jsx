import { renderHook, waitFor } from '@testing-library/react';
import { test, expect } from 'vitest';

import { mockCurrencies } from '@/mocks/mockCurrencies';
import { mockRates } from '@/mocks/mockRates';
import { customQueryWrapper } from '@/tests/testQueryWrapper';

import { useApiCurrencies, useApiRates } from './queries';

test('intercepts useApiCurrencies fetch for testing', async () => {
    const { result } = renderHook(() => useApiCurrencies(), { wrapper: customQueryWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
});

test('intercepts useApiRates fetch for testing', async () => {
    const { result } = renderHook(() => useApiRates(), { wrapper: customQueryWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
});

test('fetches rates mocked data correctly', async () => {
    const { result } = renderHook(() => useApiRates(), { wrapper: customQueryWrapper() });

    await waitFor(() => expect(result.current.data).toEqual(mockRates.rates));
});

test('fetches currencies mocked data correctly', async () => {
    const { result } = renderHook(() => useApiCurrencies(), { wrapper: customQueryWrapper() });

    await waitFor(() => expect(result.current.data).toEqual(mockCurrencies));
});
