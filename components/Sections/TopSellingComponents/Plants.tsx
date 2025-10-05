"use client";
import React from "react";
import { Button, Card } from "@/components/Main";
import { topSellingPlants } from "@/utils/data";
import Bag from "@/components/icons/Bag.svg?component";

const Plants = () => {
  return (
    <>
      {topSellingPlants.map((plant) => (
        <Card
          key={plant.id}
          imageUrl={`/trees/${plant.image}`}
          innerStroke
          allowImageOverflow
          onClick={() => {
            console.log(`Clicked on ${plant.title}`);
          }}
        >
          <div className="md:px-12 px-8 pb-9">
            <h3 className="md:text-3xl text-2xl font-semibold text-white/75 group-hover:text-white transition-colors duration-300 ease-in-out">
              {plant.title}
            </h3>
            <p className="md:text-xl text-lg line-clamp-2 text-white/75 group-hover:text-white transition-colors duration-300 ease-in-out">
              {plant.description}
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="md:text-3xl text-2xl font-bold text-white/75 group-hover:text-white transition-colors duration-300 ease-in-out">
                {plant.price}
              </span>
              <Button iconOnly className="p-1.5">
                <Bag className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};

export default Plants;
