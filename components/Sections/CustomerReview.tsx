"use client";
import React from "react";

import Title from "../Main/Title";
import Reviews from "./CustomerReviewComponents/Reviews";
import { motion } from "framer-motion";
import { sectionVariants } from "@/utils/animation";

const CustomerReview = () => {
  return (
    <motion.section
      id="customer-review"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      className="container py-28"
    >
      <Title
        tag="h2"
        fancy
        wrapperClassName="text-center mb-24"
        contentClassName="text-3xl md:text-4xl lg:text-5xl font-semibold"
      >
        Customer Reviews
      </Title>

      <Reviews />
    </motion.section>
  );
};

export default CustomerReview;
