import { http, HttpResponse } from 'msw';

import { mockCurrencies } from './mockCurrencies';
import { mockRates } from './mockRates';

export const handlers = [
    http.get('https://openexchangerates.org/api/latest.json', () => {
        return HttpResponse.json(mockRates);
    }),
    http.get('https://openexchangerates.org/api/currencies.json', () => {    
        return HttpResponse.json(mockCurrencies);
    }),
];
