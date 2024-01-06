import { test, expect } from 'vitest';

import { mockCurrencies } from '@/mocks/mockCurrencies';

import { fetchCurrencies } from './fetchCurrencies';

test('fetches mocked data correctly', async () => {
    const data = await fetchCurrencies();
    expect(data).toEqual(mockCurrencies);
});
