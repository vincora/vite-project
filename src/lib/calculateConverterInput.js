export const calculateConverterInput = (fromCurrency, toCurrency, amount) => {
    return (amount * (toCurrency / fromCurrency)).toFixed(2);
};