import { test, expect } from "vitest";
import { parseConverterInput } from "./parseConverterInput";

test('parses and formats input correctly', () => {
    expect(parseConverterInput('20 rub in usd')).toEqual([20, 'rub', 'in', 'usd']);
    expect(parseConverterInput('      10   usd     in gel   ')).toEqual([10, 'usd', 'in', 'gel'])
})