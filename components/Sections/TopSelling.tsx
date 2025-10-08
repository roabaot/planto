"use client";
import React from "react";
import Title from "../Main/Title";
import Plants from "./TopSellingComponents/Plants";
import { motion } from "framer-motion";
import { sectionVariants } from "@/utils/animation";

const TopSelling = () => {
  return (
    <motion.section
      id="top-selling"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="container py-28"
    >
      <Title
        tag="h2"
        fancy
        wrapperClassName="text-center mb-24"
        contentClassName="text-3xl md:text-4xl lg:text-5xl font-semibold"
      >
        Our Top Selling Plants
      </Title>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 md:gap-y-12 gap-y-16">
        <Plants />
      </div>
    </motion.section>
  );
};

export default TopSelling;
