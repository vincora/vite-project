import { useQuery } from "@tanstack/react-query";

const apiKey = import.meta.env.REACT_APP_OPEN_EXCHANGE_RATES_API_KEY;

const fetchRates = async () => {
  const apiUrl = `https://openexchangerates.org/api/latest.json?app_id=${encodeURIComponent(
    apiKey
  )}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.rates;
  } catch (error) {
    throw error;
  }
};

export const useRates = () => {
  return useQuery({
    queryKey: ["ratesList"],
    queryFn: fetchRates,
  });
};
