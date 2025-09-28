import React from "react";

import Title from "../Main/Title";
import Reviews from "./CustomerReviewComponents/Reviews";

const CustomerReview = () => {
  return (
    <section id="customer-review" className="container py-28">
      <Title
        tag="h2"
        fancy
        wrapperClassName="text-center mb-24"
        contentClassName="text-3xl md:text-4xl lg:text-5xl font-semibold"
      >
        Customer Reviews
      </Title>

      <Reviews />
    </section>
  );
};

export default CustomerReview;
