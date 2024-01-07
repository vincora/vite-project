const apiKey = import.meta.env.VITE_OPEN_EXCHANGE_RATES_API_KEY;

export const fetchCurrencies = async () => {
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    const apiUrl = `https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=${encodeURIComponent(apiKey)}`;
    const response = await fetch(apiUrl, options);
    const data = await response.json();
    return data;
};
