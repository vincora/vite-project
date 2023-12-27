export const calculateConverter = (fromCurrency, toCurrency, amount) => {
    return (amount * (toCurrency / fromCurrency)).toFixed(2);
};