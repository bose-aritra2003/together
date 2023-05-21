import { useMemo } from "react";

const useFeatures = () => {
  return useMemo(() => [
    {
      img: "/features/sentiments.svg",
      title: "Sentiments",
      desc: "Witness the power of words transformed into vibrant emojis that reflect the true sentiment behind each message. From cheerful sunbursts to tearful raindrops, our app unveils the hidden emotions."
    },
    {
      img: "/features/real-time.svg",
      title: "Real time",
      desc: "Delve into a realm where time bends, and messages dance in perfect synchrony. Experience the thrill of instant connections and embrace the magic of real-time communication at your fingertips."
    },
    {
      img: "/features/groups.svg",
      title: "Group chat",
      desc: "Engage multiple members simultaneously, share ideas, and make decisions together effortlessly. From brainstorming sessions to project coordination, our group chat sparks creativity and fuels innovation."
    },
  ], []);
}

export default useFeatures;