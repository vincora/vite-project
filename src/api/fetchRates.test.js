import { test, expect } from 'vitest';

import { mockRates } from '@/mocks/mockRates';

import { fetchRates } from './fetchRates';

test('fetches mocked rates correctly', async () => {
    const data = await fetchRates();
    expect(data).toEqual(mockRates);
});
