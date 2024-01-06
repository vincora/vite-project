import React from 'react';
import { formatNumber } from '@/lib/formatNumber';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


export const CustomTable = ({rates, currencies, baseCurrency}) => {
    return (
        <>
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
                    {Object.keys(rates).map((key) => (
                        <TableRow
                            key={key}
                            data-testid='exchange-rate-table-row'
                        >
                            <TableCell>{key}</TableCell>
                            <TableCell>{currencies[key]}</TableCell>
                            <TableCell
                                className='text-right'
                                data-testid='exchange-rate-number'
                            >
                                {formatNumber(rates[key] / rates[baseCurrency])}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

