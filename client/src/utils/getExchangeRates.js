import axios from "axios";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/price";

export const getExchangeRates = async () => {
  try {
    const response = await axios.get(COINGECKO_API_URL, {
      params: {
        ids: "ethereum",
        vs_currencies: "usd,ngn",
      },
    });
    return response.data.ethereum;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return { usd: 0, ngn: 0 };
  }
};
