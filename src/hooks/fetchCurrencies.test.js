import { fetchCurrencies } from "./fetchCurrencies";
import { mockCurrencies } from "@/mocks/mockCurrencies";
import { test, expect } from "vitest";

test('fetches mocked data correctly', async () => {
    const data = await fetchCurrencies();
    expect(data).toEqual(mockCurrencies)
})