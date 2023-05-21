import Image from "next/image";
import clsx from "clsx";

interface FeatureCardProps {
  img: string;
  title: string;
  desc: string;
  reverse?: boolean
}

const FeatureCard = ({ img, title, desc, reverse }: FeatureCardProps) => {
  return (
    <>
      <div className="hidden sm:block">
        <div className={clsx(
            "p-5 flex justify-between items-center",
            reverse ? 'flex-row-reverse' : 'flex-row'
          )}
        >
          <Image
            width={512} height={512}
            className="w-1/4"
            src={img}
            alt="feature"
          />

          <div className="w-2/3 space-y-5 mt-3 xl:mt-0">
            <h5 className="text-4xl 2xl:text-5xl font-bold tracking-tight text-emerald-900">
              {title}
            </h5>
            <p className="text-2xl 2xl:text-3xl leading-relaxed 2xl:leading-loose font-normal text-gray-500">
              {desc}
            </p>
          </div>
        </div>
      </div>
      <div className="sm:hidden space-y-12">
        <Image
          width={512} height={512}
          className="w-1/2 mx-auto"
          src={img}
          alt="feature"
        />

        <div className="space-y-5 mt-3 xl:mt-0 text-center">
          <h5 className="text-3xl font-bold tracking-tight text-emerald-900">
            {title}
          </h5>
          <p className="text-xl leading-relaxed font-normal text-gray-500">
            {desc}
          </p>
        </div>
      </div>
    </>
  );
}
export default FeatureCard;