import { fetchRates } from "./fetchRates";
import { mockRates } from "@/mocks/mockRates";
import { test, expect } from "vitest";

test('fetches mocked rates correctly', async () => {
    const data = await fetchRates();
    expect(data).toEqual(mockRates.rates)
})