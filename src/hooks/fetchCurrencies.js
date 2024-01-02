const apiKey = import.meta.env.REACT_APP_OPEN_EXCHANGE_RATES_API_KEY;

export const fetchCurrencies = async () => {
    try {
        const options = { method: 'GET', headers: { accept: 'application/json' } };
        const response = await fetch(
            `https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=${apiKey}`,
            options,
        );
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};
