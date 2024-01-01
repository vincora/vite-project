import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const useConverterForm = (currencyCodes) => {
    const schema = useMemo(() => {
        if (!Array.isArray(currencyCodes) || !currencyCodes.length) {
            return z.object({
                input: z.string(),
            });
        }

        const regexStr = currencyCodes.join('|');
        const regex = new RegExp('^\\s*\\d+\\s+(' + regexStr + ')\\s+in\\s+(' + regexStr + ')\\s*$', 'i');

        return z.object({
            input: z.string().regex(regex, {
                message: 'Invalid input',
            }),
        });
    }, [currencyCodes]);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            input: '',
        },
    });

    useEffect(() => {
        if (form.isSubmitSuccessful) {
            form.reset();
        }
    }, [form.isSubmitSuccessful]);

    return form;
};
