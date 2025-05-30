
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME } from '../constants';
import { NewsArticle, Prediction } from '../types';

// Ensure API_KEY is available in the environment.
// In a real production frontend, this key should be handled via a backend proxy.
// For this exercise, we assume process.env.API_KEY is set.
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY for Gemini is not set in environment variables.");
  // Potentially throw an error or disable AI features if critical
}
const ai = new GoogleGenAI({ apiKey: apiKey || "MISSING_API_KEY" });


export const generateCryptoNews = async (): Promise<NewsArticle> => {
  if (!apiKey) return { headline: "AI News Generation Offline", summary: "API Key not configured." };
  try {
    const prompt = "Generate a very short, plausible crypto news headline (max 10 words) and a one-sentence summary (max 25 words) relevant to Bitcoin's current market sentiment. Be creative and sound like a news snippet. Format: HEADLINE: [Your Headline] SUMMARY: [Your Summary]";
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_MODEL_NAME,
        contents: prompt,
    });

    const text = response.text;
    const headlineMatch = text.match(/HEADLINE: (.*?)(?=SUMMARY:|$)/i);
    const summaryMatch = text.match(/SUMMARY: (.*)/i);

    const headline = headlineMatch && headlineMatch[1] ? headlineMatch[1].trim() : "AI Could Not Generate Headline";
    const summary = summaryMatch && summaryMatch[1] ? summaryMatch[1].trim() : "AI could not generate a news summary at this time.";
    
    return { headline, summary };

  } catch (error) {
    console.error('Error generating crypto news:', error);
    return { 
      headline: "News Generation Error", 
      summary: "Could not fetch news insight. Please check console for details." 
    };
  }
};

export const predictNextBitcoinPrice = async (
  currentPrice: number,
  priceHistory: number[], // oldest to newest
  newsSummary: string
): Promise<Prediction> => {
  if (!apiKey) return { price: currentPrice, rationale: "AI Prediction Offline - API Key missing.", timestamp: Date.now() + 60000 };
  try {
    const historyString = priceHistory.length > 0 
      ? `Recent prices (last ${priceHistory.length} mins, oldest to newest): ${priceHistory.map(p => `$${p.toFixed(2)}`).join(', ')}.`
      : "No recent price history available.";

    const prompt = `
      Current Bitcoin price: $${currentPrice.toFixed(2)}. 
      ${historyString}
      Relevant Crypto News Snippet: "${newsSummary}"
      Based on this information, predict Bitcoin's price in the next minute. 
      The prediction should be a small, plausible fluctuation from the current price.
      Respond ONLY in the following format:
      PRICE: [predicted_price_number_here]
      RATIONALE: [Your 1-sentence rationale here (max 20 words)]
    `;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_MODEL_NAME,
        contents: prompt,
    });

    const text = response.text;
    const priceMatch = text.match(/PRICE: (\d+\.?\d*)/i);
    const rationaleMatch = text.match(/RATIONALE: (.*)/i);

    let predictedPriceNum = currentPrice; // Default to current price on parse failure
    if (priceMatch && priceMatch[1]) {
        const parsedPrice = parseFloat(priceMatch[1]);
        if (!isNaN(parsedPrice)) {
            predictedPriceNum = parsedPrice;
        }
    }
    
    const rationale = rationaleMatch && rationaleMatch[1] ? rationaleMatch[1].trim() : "AI could not determine a rationale.";
    
    return {
      price: predictedPriceNum,
      rationale: rationale,
      timestamp: Date.now() + 60000, // Prediction for 1 minute from now
    };

  } catch (error) {
    console.error('Error predicting Bitcoin price:', error);
    return {
      price: currentPrice, // Fallback to current price
      rationale: "Prediction error. Could not fetch AI prediction.",
      timestamp: Date.now() + 60000,
    };
  }
};
