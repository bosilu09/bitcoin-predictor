
export interface BitcoinPriceData {
  usd: number;
}

export interface PriceHistoryEntry {
  time: number; // timestamp
  price: number;
}

export interface Prediction {
  price: number;
  rationale: string;
  timestamp: number; // Time the prediction is for
}

export interface NewsArticle {
  headline: string;
  summary: string;
}

export enum CardType {
  CURRENT_PRICE,
  NEWS,
  PREDICTION
}
