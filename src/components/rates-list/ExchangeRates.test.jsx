import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { beforeEach } from 'node:test';
import { describe, test, expect, vi } from 'vitest';

import { mockRates } from '@/mocks/mockRates';
import { customQueryWrapper } from '@/tests/testQueryWrapper';

import ExchangeRates from './ExchangeRates';

const rates = Object.values(mockRates.rates);

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

const viMockTransaction = async (pathToModule, mockModuleFactory, testFunc) => {
    vi.doMock(pathToModule, mockModuleFactory);
    vi.resetModules();
    await testFunc();

    vi.doUnmock(pathToModule);
};

describe('Exchange rates page statuses', () => {
    test('Loading', async () => {
        await viMockTransaction(
            '@/api/queries',
            () => ({
                useApiCurrencies: () => ({
                    isLoading: true,
                }),
                useApiRates: () => ({
                    isLoading: true,
                }),
            }),
            async () => {
                const ExchangeRates = (await import('./ExchangeRates')).default;
                render(<ExchangeRates />, { wrapper: customQueryWrapper() });

                const loadingIndicator = screen.getByTestId('rates-loading-indicator');
                expect(loadingIndicator).toBeInTheDocument();
            },
        );
    });
    describe('Error', () => {
        const errorMessage = 'loading error';
        const mockRefetch = vi.fn(() => 0);

        const mockErrorFactory = () => ({
            useApiCurrencies: () => ({
                isError: true,
                isLoading: false,
            }),
            useApiRates: () => ({
                isError: true,
                isLoading: false,
                error: { message: errorMessage },
                refetch: mockRefetch,
            }),
        });

        beforeEach(() => vi.resetAllMocks());

        test('renders error block correctly', async () => {
            await viMockTransaction('@/api/queries', mockErrorFactory, async () => {
                const ExchangeRates = (await import('./ExchangeRates')).default;
                render(<ExchangeRates />, { wrapper: customQueryWrapper() });

                expect(screen.getByTestId('error-block')).toBeInTheDocument();
                expect(screen.getByTestId('error-message')).toContainHTML(errorMessage);
                expect(screen.getByRole('button', { name: 'Refetch data' })).toBeInTheDocument();
            });
        });
        test('calls refetch function when button is clicked', async () => {
            await viMockTransaction('@/api/queries', mockErrorFactory, async () => {
                const ExchangeRates = (await import('./ExchangeRates')).default;
                render(<ExchangeRates />, { wrapper: customQueryWrapper() });

                const refetchButton = screen.getByRole('button', { name: 'Refetch data' });
                expect(refetchButton).toBeInTheDocument();

                const user = userEvent.setup();
                await user.click(refetchButton);
                expect(mockRefetch).toBeCalledTimes(1);
            });
        });
    });
    test('No data', async () => {
        
        await viMockTransaction(
            '@/api/queries',
            () => ({
                useApiCurrencies: () => ({
                    data: null,
                }),
                useApiRates: () => ({
                    data: null,
                }),
            }),
            async () => {
                const ExchangeRates = (await import('./ExchangeRates')).default;
                render(<ExchangeRates />, { wrapper: customQueryWrapper() });
                expect(screen.getByText(/no data/i)).toBeInTheDocument();
            },
        );
    });
});
