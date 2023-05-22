import sentiment from "@/app/libs/sentiment";

export const getSentimentScore = (phrase: string) => {
  try {
    const result = sentiment.analyze(phrase);
    return result.score;
  } catch (error: any) {
    return null
  }
}

export const getSentimentPath = (score: number) => {
  if (score >= 2) {
    return '/sentiments/happy.svg';
  } else if (score >= 0) {
    return '/sentiments/neutral.svg';
  } else if (score >= -2) {
    return '/sentiments/annoyed.svg';
  } else if (score >= -4){
    return '/sentiments/sad.svg';
  } else {
    return '/sentiments/angry.svg';
  }
}