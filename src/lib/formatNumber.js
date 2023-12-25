export const formatNumber = (num) =>  {
    if (num >= 1) {
        return num.toFixed(2);
    } else {
        const decimalIndex = Array.from(String(num).substring(2)).findIndex((digit) => digit !== '0');
        return num.toFixed(decimalIndex + 2);
    }
}