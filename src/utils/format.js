export const formatNumber = (num) => {
    if (num < 0) {
        throw new Error('Only positive numbers accepted');
    }
    const numString = num.toFixed(20);

    if (num < 0.01){
        const decimalIndex = numString.substring(2).search(/0[^0]/) + 1;
        return num.toFixed(decimalIndex + 2);
    }
    return num.toFixed(2);
};
