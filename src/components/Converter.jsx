import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';

import { calculateConverterInput } from '@/lib/calculateConverterInput';
import { formatNumber } from '@/lib/formatNumber';
import { parseConverterInput } from '@/lib/parseConverterInput';
import { useConverterForm } from '@/hooks/useConverterForm';
import { useCustomQuery } from '../hooks/useCustomQuery';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const Converter = () => {
    const [normalizedInput, setNormalizedInput] = useState('');
    const [conversionResult, setConversionResult] = useState();
    const { currenciesQuery, ratesQuery } = useCustomQuery();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useConverterForm(currenciesQuery.data);

    const onSubmit = ({ input }) => {
        const parsedInput = parseConverterInput(input);
        setNormalizedInput(parsedInput);

        const [amount, fromCurrency, , toCurrency] = parsedInput.split(' ');
        const fromRate = ratesQuery.data[fromCurrency.toUpperCase()];
        const toRate = ratesQuery.data[toCurrency.toUpperCase()];

        const convertedAmount = calculateConverterInput(fromRate, toRate, amount);

        setConversionResult(`${formatNumber(convertedAmount)} ${toCurrency}`);
    };

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
                    onClick={() => ratesQuery.refetch()}
                >
                    Refetch data
                </Button>
            </div>
        );
    }
    if (!ratesQuery.data) {
        return <h3>No data</h3>;
    }

    return (
        <form
            name='form'
            onSubmit={handleSubmit(onSubmit)}
        >
            <Label htmlFor='converterInput'>What do you want to convert?</Label>
            <Controller
                name='input'
                control={control}
                render={({ field, fieldState }) => (
                    <div>
                        <Input
                            id='converterInput'
                            placeholder='Example: 15 usd in rub'
                            onChange={(e) => field.onChange(e.target.value)}
                            value={field.value}
                            className={cn('mt-2', { 'border-red-600': errors?.input })}
                        />
                        {fieldState.error && <p className='text-red-600 text-sm mt-1'>{fieldState.error.message}</p>}
                    </div>
                )}
            />
            <Button
                type='submit'
                className='bg-sky-800 mt-4'
            >
                Calculate
            </Button>
            {conversionResult && <div className='mt-4'>{`${normalizedInput} = ${conversionResult}`}</div>}
        </form>
    );
};

export default Converter;
