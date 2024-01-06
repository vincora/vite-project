import { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

import { useCustomQuery } from '@/api/queries/useCustomQuery';
import { Button } from '@/components/ui/button';


import { CustomSelect } from './select/CustomSelect';
import { CustomTable } from './table/CustomTable';

const ExchangeRates = () => {
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const { currenciesQuery, ratesQuery } = useCustomQuery();

    if (ratesQuery.isLoading || currenciesQuery.isLoading) {
        return (
            <div
                className='flex justify-center'
                data-testid='rates-loading-indicator'
            >
                <RotatingLines
                    strokeColor='grey'
                    strokeWidth='5'
                    animationDuration='0.75'
                    width='96'
                    visible={true}
                />
            </div>
        );
    }

    if (ratesQuery.isError || currenciesQuery.isError) {
        return (
            <div
                className='flex flex-col items-center gap-4'
                data-testid='error-block'
            >
                <h3 data-testid='error-message'>Error: {ratesQuery.error.message}</h3>
                <Button
                    className='bg-sky-800'
                    onClick={ratesQuery.refetch}
                >
                    Refetch data
                </Button>
            </div>
        );
    }
    if (!ratesQuery.data || !currenciesQuery.data) {
        return <h3>No data</h3>;
    }

    return (
        <div
            className='space-y-2'
            data-testid='exchange-rates-page'
        >
            <h2 className='text-sm font-medium'>Choose base currency</h2>
            <CustomSelect
                value={baseCurrency}
                onChange={setBaseCurrency}
                options={currenciesQuery?.data}
            />
            <CustomTable
                rates={ratesQuery?.data}
                currencies={currenciesQuery?.data}
                baseCurrency={baseCurrency}
            />
        </div>
    );
};

export default ExchangeRates;
