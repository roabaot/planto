"use client";
import { Button, InfoCard } from "@/components/Main";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import Bag from "@/components/icons/Bag.svg?component";

type Plant = {
  image: string;
  title: string;
  description: string;
  price: string | number;
  reverse?: boolean;
};

type TrendyCardProps = {
  plant: Plant;
};

const TrendyCard = ({ plant }: TrendyCardProps) => {
  const trendyCardRef = useRef<HTMLDivElement>(null);
  const [imgHeight, setImgHeight] = useState<number>(540); // fallback

  // useLayoutEffect ensures measurement before paint; useEffect is also okay if flicker is acceptable.
  useLayoutEffect(() => {
    const measure = () => {
      if (trendyCardRef.current) {
        const h = trendyCardRef.current.offsetHeight;
        console.log("Measured height:", h);

        setImgHeight(h + 124);
      }
    };
    measure();

    // Optional: update on resize if layout can change
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  return (
    <div ref={trendyCardRef}>
      <InfoCard>
        <div
          className={`flex gap-4 ${
            plant.reverse ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <div className="relative flex-1">
            <Image
              src={`/trees/trimmed/${plant.image}`}
              alt="tree"
              width={540}
              height={imgHeight}
              className={`absolute -top-[124px] ${
                plant.reverse ? "right-0" : "left-0"
              }`}
              style={{ height: `${imgHeight}px` }}
            />
          </div>
          <div className="space-y-6 px-8 py-12 flex-1">
            <h3 className="text-white text-4xl font-semibold">{plant.title}</h3>
            <p className="text-white text-lg font-semibold">
              {plant.description}
            </p>
            <p className="text-white text-4xl font-semibold">{plant.price}</p>

            <div className="flex items-center gap-4">
              <Button className="py-3 px-6 text-2xl font-medium !text-white">
                Explore
              </Button>
              <Button iconOnly className="p-3 !text-white">
                <Bag className="w-8 h-8" />
              </Button>
            </div>
          </div>
        </div>
      </InfoCard>
    </div>
  );
};

export default TrendyCard;
