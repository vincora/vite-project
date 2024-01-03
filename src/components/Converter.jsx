import { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

import { calculateConverterInput } from '@/lib/calculateConverterInput';
import { formatNumber } from '@/lib/formatNumber';

import { useCustomQuery } from '../hooks/useCustomQuery';
import Form from './Form';
import { Button } from './ui/button';

const Converter = () => {
    const { currenciesQuery, ratesQuery } = useCustomQuery();
    const [request, setRequest] = useState({
        amount: 0,
        fromCurrency: '',
        toCurrency: '',
    });
    const [conversionResult, setConversionResult] = useState('');

    const handleFormSubmit = (data) => {
        setRequest(data);
    };

    useEffect(() => {
        if (!ratesQuery.data) return;

        const { amount, fromCurrency, toCurrency } = request;

        const fromRate = ratesQuery.data[fromCurrency.toUpperCase()];
        const toRate = ratesQuery.data[toCurrency.toUpperCase()];

        if (!fromRate || !toRate) return;

        const result = formatNumber(calculateConverterInput(amount, fromRate, toRate));
        setConversionResult(`${amount} ${fromCurrency} in ${toCurrency} = ${result} ${toCurrency}`);
    }, [request, ratesQuery.data]);

    const currencyCodes = Object.keys(currenciesQuery.data ?? []);

    if (ratesQuery.isLoading || currenciesQuery.isLoading) {
        return (
            <div className='flex justify-center' data-testid='converter-loading-indicator'>
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
            <div className='flex flex-col items-center gap-4' data-testid='converter-error-block'>
                <h3 data-testid='converter-error-message'>Error: {ratesQuery.error.message}</h3>
                <Button
                    className='bg-sky-800'
                    onClick={() => ratesQuery.refetch()}
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
        <>
            <Form
                currencyCodes={currencyCodes}
                onSubmit={handleFormSubmit}
            />
            {conversionResult && <div className='mt-4'>{conversionResult}</div>}
        </>
    );
};

export default Converter;
