
import React, { useState, useEffect, useCallback } from 'react';
import { fetchBitcoinPrice } from './services/cryptoService';
import { generateCryptoNews, predictNextBitcoinPrice } from './services/geminiService';
import { PriceHistoryEntry, Prediction, NewsArticle, CardType } from './types';
import { REFRESH_INTERVAL_MS, MAX_PRICE_HISTORY_LENGTH } from './constants';
import { BitcoinIcon } from './constants.tsx';
import InfoCard from './components/InfoCard';
import ErrorDisplay from './components/ErrorDisplay';

const App: React.FC = () => {
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [priceHistory, setPriceHistory] = useState<PriceHistoryEntry[]>([]);
  const [news, setNews] = useState<NewsArticle | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  
  const [isLoadingPrice, setIsLoadingPrice] = useState<boolean>(true);
  const [isLoadingNews, setIsLoadingNews] = useState<boolean>(true);
  const [isLoadingPrediction, setIsLoadingPrediction] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);

  const formatCurrency = (value: number | null) => {
    if (value === null) return 'N/A';
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const fetchDataAndPredict = useCallback(async () => {
    setError(null);
    setIsLoadingPrice(true);
    setIsLoadingNews(true);
    setIsLoadingPrediction(true);

    let fetchedPrice: number | null = null;

    try {
      fetchedPrice = await fetchBitcoinPrice();
      setCurrentPrice(fetchedPrice);
      setPriceHistory(prevHistory => {
        const newEntry = { time: Date.now(), price: fetchedPrice! };
        const updatedHistory = [newEntry, ...prevHistory];
        return updatedHistory.slice(0, MAX_PRICE_HISTORY_LENGTH);
      });
      setIsLoadingPrice(false);
    } catch (e) {
      console.error(e);
      setError('Failed to fetch Bitcoin price. Using last known price for predictions if available.');
      setIsLoadingPrice(false);
      // Use previous price if available for subsequent steps, or bail if it's the first fetch
      if (currentPrice === null) {
          setIsLoadingNews(false);
          setIsLoadingPrediction(false);
          return; 
      }
      fetchedPrice = currentPrice; // Use stale price for prediction attempt
    }

    // Ensure fetchedPrice is not null for AI calls
    if (fetchedPrice === null) {
        setError('Critical error: Bitcoin price is unavailable for AI processing.');
        setIsLoadingNews(false);
        setIsLoadingPrediction(false);
        return;
    }
    
    const currentHistoryPrices = priceHistory.map(entry => entry.price).reverse(); // oldest to newest

    try {
      const generatedNews = await generateCryptoNews();
      setNews(generatedNews);
      setIsLoadingNews(false);

      // Now predict using the new price and generated news
      const priceToPredictWith = fetchedPrice; // Always use the latest available price
      const newsSummaryForPrediction = generatedNews.summary;

      const generatedPrediction = await predictNextBitcoinPrice(
        priceToPredictWith,
        currentHistoryPrices, 
        newsSummaryForPrediction
      );
      setPrediction(generatedPrediction);
      setIsLoadingPrediction(false);

    } catch (e) {
      console.error(e);
      setError('Failed to generate AI insights or prediction.');
      setIsLoadingNews(false);
      setIsLoadingPrediction(false);
    }
    setLastUpdateTime(new Date());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPrice]); // Dependency on currentPrice helps if we want to manually trigger on price change, but interval is primary.

  useEffect(() => {
    fetchDataAndPredict(); // Initial call
    const intervalId = setInterval(fetchDataAndPredict, REFRESH_INTERVAL_MS);
    return () => clearInterval(intervalId); // Cleanup on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array: Run once on mount to set up interval

  return (
    <div className="min-h-screen bg-neutral-lighter text-neutral-dark p-4 md:p-8">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <BitcoinIcon className="w-12 h-12 text-brand-accent mr-3 animate-pulse-fast" />
          <h1 className="text-4xl md:text-5xl font-display text-brand-primary tracking-tight">
            CryptoPredict <span className="text-brand-secondary">Minute</span>
          </h1>
        </div>
        <p className="text-neutral-medium">AI-powered Bitcoin price insights, refreshed every minute.</p>
         {lastUpdateTime && (
          <p className="text-sm text-neutral-medium mt-1">
            Last updated: {lastUpdateTime.toLocaleTimeString()}
          </p>
        )}
      </header>

      <ErrorDisplay message={error} />

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard title="Current Bitcoin Price" type={CardType.CURRENT_PRICE} isLoading={isLoadingPrice}>
          <p className="text-4xl font-bold text-brand-accent">
            {formatCurrency(currentPrice)}
          </p>
          {priceHistory.length > 1 && (
            <div className="mt-2 text-sm">
              <span className={`font-semibold ${currentPrice !== null && priceHistory[1] && currentPrice > priceHistory[1].price ? 'text-green-500' : 'text-red-500'}`}>
                {currentPrice !== null && priceHistory[1] && currentPrice > priceHistory[1].price ? '▲' : '▼'}
              </span>
              <span className="ml-1">
                vs last ({formatCurrency(priceHistory[1]?.price)})
              </span>
            </div>
          )}
        </InfoCard>

        <InfoCard title="AI News Snapshot" type={CardType.NEWS} isLoading={isLoadingNews}>
          {news ? (
            <>
              <h3 className="text-lg font-semibold text-brand-secondary mb-1">{news.headline}</h3>
              <p className="text-sm">{news.summary}</p>
            </>
          ) : (
            <p>No news available.</p>
          )}
        </InfoCard>

        <InfoCard title="AI 1-Min Prediction" type={CardType.PREDICTION} isLoading={isLoadingPrediction} timestamp={prediction?.timestamp}>
          {prediction ? (
            <>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(prediction.price)}
              </p>
              <p className="text-sm mt-2 italic">"{prediction.rationale}"</p>
            </>
          ) : (
            <p>No prediction available.</p>
          )}
        </InfoCard>
      </main>

      <footer className="mt-12 text-center text-xs text-neutral-medium">
        <p>&copy; {new Date().getFullYear()} CryptoPredict Minute. All data is for informational purposes only.</p>
        <p className="font-semibold">Not financial advice. Crypto investments are volatile.</p>
         <p className="mt-2">Powered by CoinGecko & Google Gemini API.</p>
      </footer>
    </div>
  );
};

export default App;
