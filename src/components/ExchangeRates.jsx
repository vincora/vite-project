import { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useCustomQuery } from '../hooks/useCustomQuery';

const ExchangeRates = ({}) => {
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const {currenciesQuery, ratesQuery} = useCustomQuery();

    if (ratesQuery.isLoading) {
        return (
            <div className='flex justify-center'>
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

    if (ratesQuery.isError) {
        return (
            <div className='flex flex-col items-center gap-4'>
                <h3>Error: {ratesQuery.error.message}</h3>
                <Button
                    className='bg-sky-800'
                    onClick={ratesQuery.refetch}
                >
                    Refetch data
                </Button>
            </div>
        );
    }
    if (!ratesQuery.data) {
        return <h3>No data</h3>;
    }

    function formatNumber(num) {
        if (num >= 1) {
            return num.toFixed(2);
        } else {
            const decimalIndex = Array.from(String(num).substring(2)).findIndex((digit) => digit !== '0');
            return num.toFixed(decimalIndex + 2);
        }
    }

    console.log(currenciesQuery.data);

    return (
        <div>
            <div className='space-y-2'>
                <h2 className='text-sm font-medium'>Choose base currency</h2>
                <Select
                    value={baseCurrency}
                    onValueChange={(value) => setBaseCurrency(value)}
                >
                    <SelectTrigger className='w-full'>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {currenciesQuery.data &&
                            Object.keys(currenciesQuery?.data).map((key) => (
                                <SelectItem
                                    key={key}
                                    value={key}
                                >
                                    {currenciesQuery?.data[key]}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
            <Table className='mt-4'>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-0'>Code</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead className='text-right'>Quote</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.keys(ratesQuery?.data).map((key) => (
                        <TableRow key={key}>
                            <TableCell>{key}</TableCell>
                            <TableCell>{currenciesQuery?.data && currenciesQuery?.data[key]}</TableCell>
                            <TableCell className='text-right'>
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
