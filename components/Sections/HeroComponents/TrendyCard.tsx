"use client";
import { Button, InfoCard } from "@/components/Main";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import Bag from "@/components/icons/Bag.svg?component";
// Using custom IntersectionObserver-based reveal
import { useReveal } from "@/hooks/useReveal";
import { CSSProperties } from "react";

type Plant = {
  image: string;
  title: string;
  description: string;
  price: string | number;
  reverse?: boolean;
};

type TrendyCardProps = {
  plant: Plant;
  index?: number; // for staggered delay
};

// (animation removed)

const TrendyCard = ({ plant, index = 0 }: TrendyCardProps) => {
  const trendyCardRef = useRef<HTMLDivElement>(null);
  const [imgHeight, setImgHeight] = useState<number | "auto">(540); // fallback
  const { ref: revealRef, visible } = useReveal<HTMLDivElement>({
    threshold: 0.45,
    rootMargin: "0px 0px -15% 0px",
  });

  // useLayoutEffect ensures measurement before paint; useEffect is also okay if flicker is acceptable.
  useLayoutEffect(() => {
    const measure = () => {
      if (window.innerWidth < 768) {
        setImgHeight("auto");
      } else if (trendyCardRef.current) {
        const h = trendyCardRef.current.offsetHeight;

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
          ref={revealRef}
          className={`reveal ${
            visible ? "reveal-visible" : ""
          } md:flex gap-4 rounded-[45px] ${
            plant.reverse ? "flex-row-reverse" : "flex-row"
          }`}
          style={{ ["--reveal-delay"]: `${index * 90}ms` } as CSSProperties}
        >
          <div className="relative flex-1">
            <Image
              src={`/trees/trimmed/${plant.image}`}
              alt="tree"
              width={540}
              height={typeof imgHeight === "number" ? imgHeight : 540}
              className={`md:absolute -top-[124px] md:mt-0 -mt-24 ${
                plant.reverse ? "right-0" : "left-0"
              }`}
              style={{
                height: imgHeight === "auto" ? "auto" : `${imgHeight}px`,
              }}
            />
          </div>
          <div className="space-y-6 px-8 md:py-12 pt-0 pb-6 flex-1">
            <h3 className="text-white lg:text-4xl md:text-3xl text-2xl font-semibold">
              {plant.title}
            </h3>
            <p className="text-white lg:text-lg md:text-base text-sm font-semibold">
              {plant.description}
            </p>
            <p className="text-white lg:text-4xl md:text-3xl text-2xl font-semibold">
              {plant.price}
            </p>

            <div className="flex items-center gap-4">
              <Button className="py-3 px-6 lg:text-2xl md:text-xl text-lg font-medium !text-white">
                Explore
              </Button>
              <Button iconOnly className="p-3 !text-white">
                <Bag className="lg:w-8 lg:h-8 w-7 h-7" />
              </Button>
            </div>
          </div>
        </div>
      </InfoCard>
    </div>
  );
};

export default TrendyCard;
