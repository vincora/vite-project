import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


export const useConverterForm = (currencies) => {
    const schema = useMemo(() => {
        if (!currencies) {
            return z.object({
                input: z.string(),
            });
        }

        const currencyCodes = Object.keys(currencies);
        const regexStr = currencyCodes.join('|');
        const regex = new RegExp('^\\s*\\d+\\s+(' + regexStr + ')\\s+in\\s+(' + regexStr + ')\\s*$', 'i');

        return z.object({
            input: z.string().regex(regex, {
                message: 'Invalid input',
            }),
        });
    }, [currencies]);

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
    }, [form.isSubmitSuccessful, form.reset]);

    return form;
};