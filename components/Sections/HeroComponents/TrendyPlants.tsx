"use client";
import { motion } from "framer-motion";
import Title from "@/components/Main/Title";
import { heroData } from "@/utils/data";
import TrendyCard from "./TrendyCard";
import { sectionVariants } from "@/utils/animation";

const TrendyPlants = () => {
  // Each card will animate individually when 50% of it is visible in viewport
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="py-28 space-y-20"
    >
      <Title
        fancy
        wrapperClassName="text-center"
        contentClassName="text-center text-3xl md:text-4xl lg:text-5xl text-white font-semibold"
      >
        Our Trendy plants
      </Title>

      <div className="space-y-16">
        {heroData.trendyPlants.map((plant) => (
          <motion.div
            key={plant.id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <TrendyCard plant={plant} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TrendyPlants;
