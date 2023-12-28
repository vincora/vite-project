import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import { customQueryWrapper } from '@/lib/customQueryWrapper';

import Converter from './Converter';

describe('Converter', () => {
    test('renders header', async () => {
        render(<Converter />, { wrapper: customQueryWrapper() });
        const header = await screen.findByText('What do you want to convert?');
        expect(header).toBeInTheDocument();
    });
    test('renders input element', async () => {
        render(<Converter />, { wrapper: customQueryWrapper() });
        const inputElement = await screen.findByPlaceholderText('Example: 15 usd in rub');
        expect(inputElement).toBeInTheDocument();
    });
    test('renders button element', async () => {
        render(<Converter />, { wrapper: customQueryWrapper() });
        const buttonElement = await screen.findByRole('button', { name: 'Calculate' });
        expect(buttonElement).toBeInTheDocument();
    });
});
