import { describe, test, expect } from "vitest";
import { formatNumber } from "./formatNumber";

describe('Format number function', () => {
    test('returns a valid number > 1', () => {
        expect(formatNumber(3.270068768768)).toBe(3.27)
    });
    test('returns a valid number < 1', () => {
        expect(formatNumber(0.00012345)).toBe(0.00012)
    })
    test('throws an error if number is negative', () => {
        expect(() => formatNumber(-12.333)).toThrowError()
    })
})