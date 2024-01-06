import { test, expect } from 'vitest';

import { normalizeConverterInput } from './normalizeConverterInput';

test('returns normalized input string', () => {
    expect(normalizeConverterInput('      10    uSD in    rub   ')).toBe('10 usd in rub')
});
