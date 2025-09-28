import React, { useId } from "react";

export interface RatingProps {
  /** Current rating value (supports fractions e.g. 3.5 or 4.8) */
  value: number;
  /** Maximum number of stars */
  max?: number;
  /** Size in pixels for each star */
  size?: number;
  /** Color of filled portion */
  color?: string;
  /** Color of empty portion */
  emptyColor?: string;
  /** Show numeric text like 4.8/5 */
  showValue?: boolean;
  /** Decimal places for numeric value */
  valuePrecision?: number;
  /** Additional className for wrapper */
  className?: string;
  /** aria-label override */
  "aria-label"?: string;
}

/**
 * Accessible, purely presentational star rating display with fractional support (including half stars)
 * Works with Next.js 15 (no dynamic import needed, minimal dependencies)
 */
export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 18,
  color = "#FFC107", // amber
  emptyColor = "#ffffff40", // white with opacity
  showValue = false,
  valuePrecision = 1,
  className,
  "aria-label": ariaLabel,
}) => {
  const safeMax = Math.max(1, max);
  const clamped = Math.min(Math.max(value, 0), safeMax);
  const uid = useId();

  return (
    <div
      className={`inline-flex items-center gap-2 ${className || ""}`.trim()}
      role="img"
      aria-label={
        ariaLabel ||
        `${clamped.toFixed(valuePrecision)} out of ${safeMax} stars`
      }
    >
      <div className="flex" aria-hidden="true">
        {Array.from({ length: safeMax }).map((_, i) => {
          const starIndex = i + 1; // 1-based
          // Determine fill for this star
          const fullPortion = clamped - (starIndex - 1);
          const starFill = Math.max(0, Math.min(1, fullPortion)); // 0..1
          const gradientId = `${uid}-star-gradient-${i}`;
          const needsGradient = starFill > 0 && starFill < 1;
          const fill =
            starFill >= 1
              ? color
              : starFill <= 0
              ? emptyColor
              : `url(#${gradientId})`;
          return (
            <StarIcon
              key={i}
              size={size}
              fill={fill}
              gradient={
                needsGradient
                  ? {
                      id: gradientId,
                      from: color,
                      to: emptyColor,
                      percent: starFill * 100,
                    }
                  : undefined
              }
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm text-white/75">{`${clamped.toFixed(
          valuePrecision
        )}/${safeMax}`}</span>
      )}
    </div>
  );
};

interface StarIconProps {
  size: number;
  fill?: string;
  gradient?: { id: string; from: string; to: string; percent: number };
}

const StarIcon: React.FC<StarIconProps> = ({
  size,
  fill = "currentColor",
  gradient,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={gradient ? `url(#${gradient.id})` : fill}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ display: "block" }}
  >
    {gradient && (
      <defs>
        <linearGradient id={gradient.id} x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset={`${gradient.percent}%`} stopColor={gradient.from} />
          <stop offset={`${gradient.percent}%`} stopColor={gradient.to} />
        </linearGradient>
      </defs>
    )}
    <path d="M12 2.25l2.834 6.086 6.716.565-5.086 4.43 1.548 6.619L12 16.98l-6.012 2.97 1.548-6.619-5.086-4.43 6.716-.565L12 2.25z" />
  </svg>
);

export default Rating;
