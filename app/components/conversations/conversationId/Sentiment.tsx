import Image from "next/image";
import {getSentimentPath, getSentimentScore} from "@/app/actions/getSentiment";

interface SentimentProps {
  message: string;
}

const Sentiment = ({ message }: SentimentProps) => {
  return (
    <div className="w-6 h-6">
      <Image
        src={getSentimentPath(getSentimentScore(message)!)}
        alt="sentiment"
        width={48} height={48}
      />
    </div>
  );
}
export default Sentiment;