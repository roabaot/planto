"use client";
import { useKeenSlider } from "keen-slider/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { heroData } from "@/utils/data";
import { Button, Card } from "../../Main";
import "keen-slider/keen-slider.min.css";

const HeroSwiper = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  // Ref to track external (Card-wide) hover pause state
  const pausedRef = useRef(false);
  // Wrapper ref (covers whole Card area, including image portions outside slider container)
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // External autoplay (more controllable)
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const delay = 3000;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const schedule = useCallback(() => {
    clearTimer();
    if (pausedRef.current) return;
    intervalRef.current = setTimeout(() => {
      if (!pausedRef.current) {
        instanceRef.current?.next();
        schedule();
      }
    }, delay);
  }, [clearTimer, instanceRef]);

  // Start autoplay when slider ready
  useEffect(() => {
    if (!loaded) return;
    schedule();
    return () => clearTimer();
  }, [loaded, schedule, clearTimer]);

  // Hover handlers directly on wrapper
  const handleMouseEnter = () => {
    pausedRef.current = true;
    clearTimer();
  };
  const handleMouseLeave = () => {
    pausedRef.current = false;
    schedule();
  };

  return (
    <div
      className="w-[381px] ms-auto"
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter} // accessibility (tab focus pauses)
      onBlur={handleMouseLeave}
    >
      {/* Slider container */}
      <div>
        <Card
          imageUrl={heroData.swipers[currentSlide].image}
          allowImageOverflow
          innerStroke
        >
          <div
            ref={sliderRef}
            className="keen-slider !overflow-y-visible !overflow-x-clip"
          >
            {heroData.swipers.map((swiper, idx) => (
              <div
                key={idx}
                className="keen-slider__slide !overflow-y-visible !overflow-x-clip"
              >
                <div className="space-y-6 text-start px-9">
                  <p className="text-lg text-white">{swiper.subtitle}</p>
                  <h3 className="text-2xl text-white/75 leading-[1]">
                    {swiper.title}
                  </h3>
                  <Button>Buy Now</Button>
                </div>
              </div>
            ))}
          </div>
          {loaded && instanceRef.current && (
            <div className="flex gap-2 py-6 justify-center">
              {heroData.swipers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={`h-2 w-2 rounded-full transition-colors duration-200 cursor-pointer ${
                    currentSlide === idx
                      ? "bg-white w-6 rounded-2xl"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default HeroSwiper;
