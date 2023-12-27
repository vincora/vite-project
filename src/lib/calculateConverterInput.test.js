import { test, expect } from 'vitest';

import { calculateConverterInput } from './calculateConverterInput';

test('returns valid result', () => {
    expect(calculateConverterInput(1, 5, 10)).toBe(50);
});
