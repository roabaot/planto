import React from "react";
import Title from "../Main/Title";
import Plants from "./TopSellingComponents/Plants";

const TopSelling = () => {
  return (
    <section className="container py-28">
      <Title
        tag="h2"
        fancy
        wrapperClassName="text-center mb-24"
        contentClassName="text-3xl md:text-4xl lg:text-5xl font-semibold"
      >
        Our Top Selling Plants
      </Title>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-12">
        <Plants />
      </div>
    </section>
  );
};

export default TopSelling;
