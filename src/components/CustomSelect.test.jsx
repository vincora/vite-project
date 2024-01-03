import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';

import { mockCurrencies } from '@/mocks/mockCurrencies';

import { CustomSelect } from './CustomSelect';

const currencies = Object.values(mockCurrencies);

describe('Custom select', () => {
    test('renders select field correctly', async () => {
        const mockFn = vi.fn();
        render(
            <CustomSelect
                value={'USD'}
                onChange={(v) => 0}
                options={mockCurrencies}
            />,
        );

        const selectField = await screen.findByTestId('select-field');
        expect(selectField).toBeInTheDocument();
    });
    test('renders first element correctly', async () => {
        render(
            <CustomSelect
                value={'USD'}
                onChange={(v) => 0}
                options={mockCurrencies}
            />,
        );
        const selectField = await screen.findByTestId('select-field');

        const user = userEvent.setup();
        await user.click(selectField);

        // expect( await screen.findByText('United Arab Emirates Dirham')).toBeInTheDocument();
        expect(await screen.findByText(currencies[0])).toBeInTheDocument();
    });
});
