import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { test, expect, describe } from 'vitest';

import { customQueryWrapper } from './lib/customQueryWrapper';
import { routerConfig } from './routerConfig';

describe('Layout', () => {
    test('renders header elements', () => {
        const router = createMemoryRouter(routerConfig);

        render(<RouterProvider router={router} />, { wrapper: customQueryWrapper() });

        expect(screen.getByText('Exchange rates')).toBeInTheDocument();
        expect(screen.getByText('Converter')).toBeInTheDocument();
    });
});

describe('Router', () => {
    test('basic navigation works correctly', async () => {
        const router = createMemoryRouter(routerConfig);
        render(<RouterProvider router={router} />, { wrapper: customQueryWrapper() });

        const user = userEvent.setup();

        await user.click(screen.getByText('Converter'));
        expect(await screen.findByTestId('converter-form')).toBeInTheDocument();

        await user.click(screen.getByText('Exchange rates'));
        expect(await screen.findByTestId('exchange-rates-page')).toBeInTheDocument();
    });
    test('shows error page if the path is incorrect', () => {
        const router = createMemoryRouter(routerConfig, { initialEntries: ['/some-incorrect-path'] });
        render(<RouterProvider router={router} />, { wrapper: customQueryWrapper() });

        expect(screen.getByTestId('error-page')).toBeInTheDocument();
    });
});
