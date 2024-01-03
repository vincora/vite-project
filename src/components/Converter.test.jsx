import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';

import { customQueryWrapper } from '@/lib/customQueryWrapper';

const viMockTransaction = async (pathToModule, mockModuleFactory, testFunc) => {
    vi.doMock(pathToModule, mockModuleFactory);
    vi.resetModules();
    await testFunc();

    vi.doUnmock(pathToModule);
};

describe('Converter page statuses', () => {
    test('Loading', async () => {
        await viMockTransaction(
            '../hooks/useCustomQuery',
            () => ({
                useCustomQuery: () => ({
                    currenciesQuery: { isLoading: true },
                    ratesQuery: { isLoading: true },
                }),
            }),
            async () => {
                const Converter = (await import('./Converter')).default;
                render(<Converter />, { wrapper: customQueryWrapper() });

                expect(screen.getByTestId('converter-loading-indicator')).toBeInTheDocument();
            },
        );
    });
    describe('Error', () => {
        const errorMessage = 'loading error';
        const mockRefetch = vi.fn(() => 0);

        const mockErrorFactory = () => ({
            useCustomQuery: () => ({
                currenciesQuery: { isError: true, isLoading: false },
                ratesQuery: { isError: true, isLoading: false, error: { message: errorMessage }, refetch: mockRefetch },
            }),
        });
        test('renders error block correctly', async () => {
            await viMockTransaction('../hooks/useCustomQuery', mockErrorFactory, async () => {
                const Converter = (await import('./Converter')).default;
                render(<Converter />, { wrapper: customQueryWrapper() });

                expect(screen.getByTestId('converter-error-block')).toBeInTheDocument();
                expect(screen.getByTestId('converter-error-message')).toContainHTML(errorMessage);
                expect(screen.getByRole('button', { name: 'Refetch data' })).toBeInTheDocument();
            });
        });
        test('calls refetch function when button is clicked', async () => {
            await viMockTransaction('../hooks/useCustomQuery', mockErrorFactory, async () => {
                const Converter = (await import('./Converter')).default;
                render(<Converter />, { wrapper: customQueryWrapper() });

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
            '../hooks/useCustomQuery',
            () => ({
                useCustomQuery: () => ({
                    currenciesQuery: { data: null },
                    ratesQuery: { data: null },
                }),
            }),
            async () => {
                const Converter = (await import('./Converter')).default;
                render(<Converter />, { wrapper: customQueryWrapper() });

                expect(screen.getByText(/no data/i)).toBeInTheDocument();
            },
        );
    });
});
