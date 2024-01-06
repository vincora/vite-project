import { Controller } from 'react-hook-form';

import { useConverterForm } from '@/components/converter/form/useConverterForm';
import { normalizeConverterInput } from '@/components/converter/utils/normalizeConverterInput.js';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Form = ({ currencyCodes, onSubmit }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useConverterForm(currencyCodes);

    const prepareSubmitData = ({ input }) => {
        const parsedInput = normalizeConverterInput(input);
        const [amount, fromCurrency, , toCurrency] = parsedInput.split(' ');

        onSubmit({ amount, fromCurrency, toCurrency });
    };
    return (
        <form
            name='form'
            onSubmit={handleSubmit(prepareSubmitData)}
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
        </form>
    );
};

export default Form;
