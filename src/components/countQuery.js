export function countQuery(input, ratesQuery) {
  let amount = input[0];
  let curr1 = input[1].toUpperCase();
  let curr2 = input[3].toUpperCase();
  let res =
    (amount * (ratesQuery.data[curr2] / ratesQuery.data[curr1])).toFixed(2) +
    ` ${curr2}`;
  return res;
}
