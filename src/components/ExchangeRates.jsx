import { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

import { formatNumber } from '@/lib/formatNumber';

import { useCustomQuery } from '../hooks/useCustomQuery';
import { CustomSelect } from './CustomSelect';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

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
        <div>
            <div className='space-y-2'>
                <h2 className='text-sm font-medium'>Choose base currency</h2>
                <CustomSelect
                    value={baseCurrency}
                    onChange={setBaseCurrency}
                    options={currenciesQuery?.data}
                />
            </div>
            <Table className='mt-4'>
                <TableHeader>
                    <TableRow>
                        <TableHead
                            className='w-0'
                            data-testid='exchange-rate-table-head'
                        >
                            Code
                        </TableHead>
                        <TableHead data-testid='exchange-rate-table-head'>Currency</TableHead>
                        <TableHead
                            className='text-right'
                            data-testid='exchange-rate-table-head'
                        >
                            Quote
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.keys(ratesQuery?.data).map((key) => (
                        <TableRow
                            key={key}
                            data-testid='exchange-rate-table-row'
                        >
                            <TableCell>{key}</TableCell>
                            <TableCell>{currenciesQuery?.data && currenciesQuery?.data[key]}</TableCell>
                            <TableCell
                                className='text-right'
                                data-testid='exchange-rate-number'
                            >
                                {formatNumber(ratesQuery?.data[key] / ratesQuery?.data[baseCurrency])}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ExchangeRates;
