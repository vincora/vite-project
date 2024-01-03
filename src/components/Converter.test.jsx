import { describe, test, expect } from "vitest";
import { customQueryWrapper } from "@/lib/customQueryWrapper";
import { render, screen } from "@testing-library/react";
import Converter from "./Converter";

describe('Converter', () =>{
    test('shows rotating lines component when loading', () => {
        vi.mock('../hooks/useCustomQuery', () => ({
            useCustomQuery: () => ({
                currenciesQuery: { isLoading: true },
                ratesQuery: { isLoading: true },
            }),
        }));
        render(<Converter />, { wrapper: customQueryWrapper() });

        const loadingIndicator = screen.getByTestId('converter-loading-indicator');
        expect(loadingIndicator).toBeInTheDocument();
        vi.unmock('../hooks/useCustomQuery');
    });
})