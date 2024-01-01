import { test, expect } from 'vitest';

import { calculateConverterInput } from './calculateConverterInput';

test('returns valid result', () => {
    expect(calculateConverterInput(10, 1, 5)).toBe(50);
});
