
import { COINGECKO_API_URL } from '../constants';
import { BitcoinPriceData } from '../types';

interface CoinGeckoResponse {
  bitcoin: BitcoinPriceData;
}

export const fetchBitcoinPrice = async (): Promise<number> => {
  try {
    const response = await fetch(COINGECKO_API_URL);
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.statusText}`);
    }
    const data = (await response.json()) as CoinGeckoResponse;
    if (data.bitcoin && typeof data.bitcoin.usd === 'number') {
      return data.bitcoin.usd;
    }
    throw new Error('Invalid data format from CoinGecko API');
  } catch (error) {
    console.error('Failed to fetch Bitcoin price:', error);
    throw error; // Re-throw to be caught by the caller
  }
};
