import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { test, expect } from 'vitest';

import { useCustomQuery } from '@/hooks/useCustomQuery';

import { calculateConverter } from './calculateConverter';

test('calculates user input formatted in array', async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    const wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useCustomQuery(), { wrapper });

    await waitFor(() => expect(calculateConverter([10, 'usd', 'in', 'rub'], result.current.ratesQuery)).toBe('905.30 RUB'))
});
