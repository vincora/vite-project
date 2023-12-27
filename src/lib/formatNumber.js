export const formatNumber = (num) => {
    if (num < 0) {
        throw new Error('Only positive numbers accepted');
    }
    if (num >= 1) {
        return num.toFixed(2);
    }
    const decimalIndex = String(num).substring(2).search(/0[^0]/) + 1;
    return num.toFixed(decimalIndex + 2);
};
