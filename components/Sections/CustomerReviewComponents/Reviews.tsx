"use client";
import { useKeenSlider } from "keen-slider/react";
import { KeenSliderInstance } from "keen-slider";
import "keen-slider/keen-slider.min.css";
import { reviews } from "@/utils/data";
import { Card, Rating } from "@/components/Main";
import Image from "next/image";
const Reviews = () => {
  const AutoplayPlugin = (slider: KeenSliderInstance) => {
    let timeout: ReturnType<typeof setTimeout>;
    let mouseOver = false;
    function clearNextTimeout() {
      clearTimeout(timeout);
    }
    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        slider.next();
      }, 2000);
    }
    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });
    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);
  };
  const [ref] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      breakpoints: {
        "(min-width: 600px)": {
          slides: { perView: 2, spacing: 5 },
        },
        "(min-width: 1000px)": {
          slides: { perView: 3, spacing: 10 },
        },
        "(min-width: 1200px)": {
          slides: { perView: 4, spacing: 12 },
        },
      },
      slides: { perView: 1 },
    },
    [AutoplayPlugin]
  );
  return (
    <div ref={ref} className="keen-slider">
      {reviews.map((review) => (
        <div key={review.id} className="keen-slider__slide">
          <Card>
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-4">
                <Image
                  src={`/avatar/${review.image}`}
                  alt="Person"
                  width={64}
                  height={64}
                  className="rounded-full w-[64px] h-[64px]"
                />
                <div>
                  <h3 className="text-white">{review.name}</h3>
                  <Rating
                    value={review.rating}
                    valuePrecision={1}
                    className="text-white/75"
                    aria-label={`User rating ${review.rating} out of 5`}
                  />
                </div>
              </div>

              <p className="text-white/75">{review.comment}</p>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
