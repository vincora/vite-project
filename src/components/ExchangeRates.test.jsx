import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';

import { customQueryWrapper } from '@/lib/customQueryWrapper';
import { mockRates } from '@/mocks/mockRates';

import ExchangeRates from './ExchangeRates';

const rates = Object.values(mockRates.rates);

beforeEach(() => {
    vi.resetModules();
});

describe('Rates List', () => {
    test('renders header correctly', async () => {
        render(<ExchangeRates />, { wrapper: customQueryWrapper() });
        expect(await screen.findByText(/Choose base currency/i)).toBeInTheDocument();
    });
    test('renders table titles', async () => {
        render(<ExchangeRates />, { wrapper: customQueryWrapper() });
        const tableHeaders = await screen.findAllByTestId('exchange-rate-table-head');
        expect(tableHeaders).toHaveLength(3);
    });
    test('renders table data rows', async () => {
        render(<ExchangeRates />, { wrapper: customQueryWrapper() });
        const tableRows = await screen.findAllByTestId('exchange-rate-table-row');
        expect(tableRows.length).toEqual(rates.length);
    });
});

describe('Exchange rates page statuses', () => {
    test('shows rotating lines component when loading', () => {
        vi.mock('../hooks/useCustomQuery', () => ({
            useCustomQuery: () => ({
                currenciesQuery: { isLoading: true },
                ratesQuery: { isLoading: true },
            }),
        }));
        render(<ExchangeRates />, { wrapper: customQueryWrapper() });

        const loadingIndicator = screen.getByTestId('rates-loading-indicator');
        expect(loadingIndicator).toBeInTheDocument();
        vi.unmock('../hooks/useCustomQuery');
    });
    // test('shows error message when error in query', async () => {
    //     vi.mock('../hooks/useCustomQuery', () => ({
    //         useCustomQuery: () => ({
    //             currenciesQuery: { isError: true },
    //             ratesQuery: { isError: true },
    //         }),
    //     }));
    //     render(<ExchangeRates />, { wrapper: customQueryWrapper() });

    //     await waitFor(async () => expect(await screen.findByTestId('error-block')).toBeInTheDocument(), { timeout: 10000 });
    //     screen.debug()
    //     vi.unmock('../hooks/useCustomQuery');
    // });
});
