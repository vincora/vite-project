export const formatNumber = (num) => {
    if (num < 0) {
        throw new Error('Only positive numbers accepted');
    } else if (num >= 1) {
        return Number(num.toFixed(2));
    } else {
        const decimalIndex = Array.from(String(num).substring(2)).findIndex((digit) => digit !== '0');
        return Number(num.toFixed(decimalIndex + 2));
    }
};
