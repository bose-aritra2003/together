import Sentiment from "sentiment";

const globalForSentiment = global as unknown as {
  sentiment: Sentiment | undefined
}

const sentiment = globalForSentiment.sentiment ?? new Sentiment();

if (process.env.NODE_ENV !== 'production') {
  globalForSentiment.sentiment = sentiment;
}

export default sentiment;