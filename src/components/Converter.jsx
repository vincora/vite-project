import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import { z } from 'zod';

import { useCustomQuery } from '../hooks/useCustomQuery';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';


const Converter = () => {
    const [normalizedInput, setNormalizedInput] = useState('');
    const [conversionResult, setConversionResult] = useState();
    const { currenciesQuery, ratesQuery } = useCustomQuery();

    const schema = useMemo(() => {
        if (!currenciesQuery.data) {
            return z.object({
                input: z.string(),
            });
        }
        const currencies = Object.keys(currenciesQuery.data);
        const regexStr = currencies.join('|');
        const regex = new RegExp('^\\s*\\d+\\s+(' + regexStr + ')\\s+in\\s+(' + regexStr + ')\\s*$', 'i');
        return z.object({
            input: z.string().regex(regex, {
                message: 'Invalid input',
            }),
        });
    }, [currenciesQuery.data]);

    const {
        handleSubmit,
        control,
        formState: { isSubmitSuccessful, errors },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            input: '',
        },
    });

    const parseConverterInput = (input) => {
        return input.trim().replace(/\s+/g, ' ');
    };

    const calculateConverter = (normalizedInput) => {
        const inputData = normalizedInput.split(' ').filter((item) => item !== 'in');
        const amount = inputData[0];
        const fromCurrency = inputData[1].toUpperCase();
        const toCurrency = inputData[2].toUpperCase();
        return (amount * (ratesQuery.data[toCurrency] / ratesQuery.data[fromCurrency])).toFixed(2);
    };

    const onSubmit = ({ input }) => {
        const parsedInput = parseConverterInput(input);
        const toCurrency = parsedInput.split(' ').pop();
        setNormalizedInput(parsedInput);
        setConversionResult(`${calculateConverter(parsedInput)} ${toCurrency}`);
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

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
