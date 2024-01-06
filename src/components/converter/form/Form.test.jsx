import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';

import { mockCurrencies } from '@/mocks/mockCurrencies';
import { customQueryWrapper } from '@/tests/testQueryWrapper';

import Form from './Form';

describe('Form', () => {
    test('renders header', async () => {
        render(<Form />, { wrapper: customQueryWrapper() });
        const header = await screen.findByText('What do you want to convert?');
        expect(header).toBeInTheDocument();
    });
    test('renders input element', async () => {
        render(<Form />, { wrapper: customQueryWrapper() });
        const inputElement = await screen.findByPlaceholderText('Example: 15 usd in rub');
        expect(inputElement).toBeInTheDocument();
    });
    test('renders button element', async () => {
        render(<Form />, { wrapper: customQueryWrapper() });
        const buttonElement = await screen.findByRole('button', { name: 'Calculate' });
        expect(buttonElement).toBeInTheDocument();
    });
});
describe('Converter form validation', () => {
    test('submits', async () => {
        const mockSubmit = vi.fn(() => 0);
        const currencies = Object.keys(mockCurrencies);
        const user = userEvent.setup();
        render(
            <Form
                currencyCodes={currencies}
                onSubmit={mockSubmit}
            />,
            { wrapper: customQueryWrapper() },
        );

        await user.type(await screen.findByPlaceholderText('Example: 15 usd in rub'), '15 usd in rub');
        await user.click(await screen.findByRole('button', { name: 'Calculate' }));

        expect(mockSubmit).toBeCalledTimes(1);
    });
    test('shows error message when input is invalid', async () => {
        const mockSubmit = vi.fn(() => 0);
        const currencies = Object.keys(mockCurrencies);
        const user = userEvent.setup();
        render(
            <Form
                currencyCodes={currencies}
                onSubmit={mockSubmit}
            />,
            { wrapper: customQueryWrapper() },
        );

        await user.type(await screen.findByPlaceholderText('Example: 15 usd in rub'), '20 abc jj kkk');
        await user.click(await screen.findByRole('button', { name: 'Calculate' }));

        expect(mockSubmit).not.toBeCalled();
        expect(await screen.findByText('Invalid input')).toBeInTheDocument();
    });
    test('resets input field after submission', async () => {
        const mockSubmit = vi.fn(() => 0);
        const currencies = Object.keys(mockCurrencies);
        const user = userEvent.setup();
        render(
            <Form
                currencyCodes={currencies}
                onSubmit={mockSubmit}
            />,
            { wrapper: customQueryWrapper() },
        );

        const inputElement = await screen.findByPlaceholderText('Example: 15 usd in rub');

        await user.type(inputElement, '15 usd in rub');
        await user.click(await screen.findByRole('button', { name: 'Calculate' }));

        expect(mockSubmit).toBeCalledTimes(1);
        expect(inputElement.value).toBe('');
    });
});
