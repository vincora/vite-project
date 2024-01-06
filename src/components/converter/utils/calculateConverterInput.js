

export const calculateConverterInput = (amount, fromCurrency, toCurrency) => {
    return (amount * (toCurrency / fromCurrency));
};