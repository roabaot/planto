import React from "react";
import { Button, Rating, InfoCard } from "../Main";
import Image from "next/image";
import PolygonIcon from "@/components/icons/Polygon.svg?component";
import { HeroSwiper, TrendyPlants } from "./HeroComponents";

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen w-full bg-[url('/hero-background.svg')] bg-cover bg-no-repeat"
    >
      <div className="container pt-[200px]">
        <div className="grid md:grid-cols-3 grid-cols-1">
          <div className="col-span-2 text-start">
            <div>
              <div>
                <h1 className="text-8xl font-bold text-white">
                  Breath Natural
                </h1>
                <p className="text-lg text-white/75">
                  Experience the tranquility of nature with our premium
                  products.
                </p>
              </div>
              <div className="flex items-center gap-6 mt-6">
                <Button className="py-4 px-8">Shop Now</Button>
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="border border-white/75 group-hover:border-white group-active:bg-white/10 text-white/75 group-hover:text-white rounded-full group-hover:bg-white/5 p-4 transition-colors duration-300 ease-in-out">
                    <PolygonIcon className="w-[24px] h-[24px] transition-colors duration-300" />
                  </div>
                  <span className="text-white/75 group-hover:text-white transition-colors duration-300 ease-in-out select-none">
                    Live Demo...
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-72">
              <InfoCard className="max-w-[400px]">
                <div className="p-8 space-y-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/avatar/person1.png"
                      alt="Person"
                      width={64}
                      height={64}
                      className="rounded-full w-[64px] h-[64px]"
                    />
                    <div>
                      <h3 className="text-white">alena Patel</h3>
                      <Rating
                        value={4.3}
                        valuePrecision={1}
                        className="text-white/75"
                        aria-label="User rating 4.3 out of 5"
                      />
                    </div>
                  </div>

                  <p className="text-white/75">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt...
                  </p>
                </div>
              </InfoCard>
            </div>
          </div>
          <div className="h-fit">
            <HeroSwiper />
          </div>
        </div>

        <TrendyPlants />
      </div>
    </section>
  );
};

export default Hero;
