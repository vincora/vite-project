const apiKey = import.meta.env.VITE_OPEN_EXCHANGE_RATES_API_KEY;

export const fetchRates = async () => {
    const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${encodeURIComponent(apiKey)}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
};
