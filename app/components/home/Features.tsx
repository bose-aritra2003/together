import FeatureCard from "@/app/components/home/FeatureCard";
import useFeatures from "@/app/hooks/useFeatures";

const Features = () => {
  const features = useFeatures();
  return (
    <div className="pt-5 pb-16 sm:py-20 space-y-16 px-4 sm:px-10 xl:px-16 2xl:px-36">
      {
        features.map(({ img, title, desc }, idx) => (
          <FeatureCard
            key={idx}
            img={img}
            title={title}
            desc={desc}
            reverse={idx % 2 === 1}
          />
        ))
      }
    </div>
  );
}
export default Features;