import Image from "next/image";
import sentiment from "@/app/libs/sentiment";

interface SentimentProps {
  message: string;
}

const Sentiment = ({ message }: SentimentProps) => {
  const getSentimentPath = (score: number) => {
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

  return (
    <div className="w-6 h-6">
      <Image
        src={getSentimentPath(sentiment.analyze(message).score)}
        alt="sentiment"
        width={48} height={48}
      />
    </div>
  );
}
export default Sentiment;