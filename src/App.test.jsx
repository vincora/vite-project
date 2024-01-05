import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { test, expect, describe } from 'vitest';

import App from './App';
import ErrorPage from './ErrorPage';
import Converter from './components/Converter';
import ExchangeRates from './components/ExchangeRates';
import { customQueryWrapper } from './lib/customQueryWrapper';

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <ExchangeRates /> },
            {
                path: '/list',
                element: <ExchangeRates />,
            },
            {
                path: '/converter',
                element: <Converter />,
            },
        ],
    },
];

describe('Layout', () => {
    test('renders header elements', () => {
        const router = createMemoryRouter(routes);

        render(<RouterProvider router={router} />, { wrapper: customQueryWrapper() });

        expect(screen.getByText('Exchange rates')).toBeInTheDocument();
        expect(screen.getByText('Converter')).toBeInTheDocument();
    });
});

describe('Router', () => {
    test('basic navigation works correctly', async () => {
        const router = createMemoryRouter(routes);
        render(<RouterProvider router={router} />, { wrapper: customQueryWrapper() });

        const user = userEvent.setup();

        await user.click(screen.getByText('Converter'));
        expect(await screen.findByTestId('converter-form')).toBeInTheDocument();

        await user.click(screen.getByText('Exchange rates'));
        expect(await screen.findByTestId('exchange-rates-page')).toBeInTheDocument();
    });
    test('shows error page if the path is incorrect', () => {
        const router = createMemoryRouter(routes, { initialEntries: ['/some-incorrect-path'] });
        render(<RouterProvider router={router} />, { wrapper: customQueryWrapper() });

        expect(screen.getByTestId('error-page')).toBeInTheDocument();
    });
})