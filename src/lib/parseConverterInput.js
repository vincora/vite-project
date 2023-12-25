export const parseConverterInput = (input) => {
    let arr = input.trim().replace(/\s+/g, ' ').split(' ');
    arr[0] = Number(arr[0]);
    return arr
};
