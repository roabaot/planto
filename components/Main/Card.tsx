"use client";

import {
  forwardRef,
  ReactNode,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import Image from "next/image";

export interface CardProps {
  children: ReactNode;
  imageUrl?: string;
  className?: string;
  onClick?: () => void;
  /** If true, the image is rendered outside (above) the clipping path so its top can overflow the concave bend */
  allowImageOverflow?: boolean;
  /** Keep stroke strictly inside the blurred clipped region (prevents blur showing outside). */
  innerStroke?: boolean;
  /** Factor to slightly shrink blurred background (legacy fallback). */
  blurShrinkFactor?: number;
  /** Width (in viewBox units 0-100) of the clear ring under the stroke where blur is removed. */
  blurEdgeClear?: number;
}

/**
 * Card component
 * Clean, modern card with precise background, stroke, and shadow
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    imageUrl,
    children,
    className,
    onClick,
    allowImageOverflow = false,
    innerStroke = true,
    blurEdgeClear = 0,
  },
  ref
) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imgHeight, setImgHeight] = useState<number>(540);
  const id = useId();
  const gradientId = `cardLinear-${id}`;
  const blurMaskId = `blurEdgeMask-${id}`;
  // Normalized (0-100) path based on original Figma shape (viewBox 550x668) for clip-path + overlay stroke
  // This enables intrinsic height (content-driven) because layout happens in HTML.
  // Coordinates scaled: x' = x/550*100, y' = y/668*100 (rounded to 3 decimals where helpful)
  const normalizedPath =
    "M3.455 13.226 C3.455 6.027 11.376 0.562 20.032 1.541 C29.354 2.595 40.909 3.643 50 3.643 C59.091 3.643 70.736 2.595 79.968 1.541 C88.624 0.562 96.545 6.027 96.545 13.226 V84.311 C96.545 90.752 90.368 95.838 82.545 95.838 H17.455 C9.723 95.838 3.455 90.752 3.455 84.311 V13.226 Z";

  // Build a CSS path() string with percentage tokens so it scales with element box.
  const clipPathString =
    'path("M3.455% 13.226% C3.455% 6.027% 11.376% 0.562% 20.032% 1.541% C29.354% 2.595% 40.909% 3.643% 50% 3.643% C59.091% 3.643% 70.736% 2.595% 79.968% 1.541% C88.624% 0.562% 96.545% 6.027% 96.545% 13.226% V84.311% C96.545% 90.752% 90.368% 95.838% 82.545% 95.838% H17.455% C9.723% 95.838% 3.455% 90.752% 3.455% 84.311% V13.226% Z")';

  // Stroke now rendered exactly on the clip boundary (no inset) per user request
  // NOTE: If a faint fringe appears on some displays due to anti-aliasing, you can
  // reintroduce a tiny inset: translate(0.05 0.05) scale(0.999) to hide blur bleed.
  // Blur strategy: We slightly scale the blurred background inward using blurShrinkFactor so
  // the blur kernel doesn't extend outside the stroke. This is an approximation; large shrink factors
  // will visually narrow the curved top. Keep the factor very close to 1 (e.g. 0.998).
  // If a perfect geometric inside stroke is required without scaling artifacts, implement
  // a true path offset for the blur layer or a mask ring.

  useLayoutEffect(() => {
    const measure = () => {
      if (imageRef.current) {
        const h = imageRef.current.offsetHeight;
        console.log("Measured height:", h);

        const imageSpace = h * 0.35; // adjust based on design
        setImgHeight(h - imageSpace);
      }
    };
    measure();

    // Optional: update on resize if layout can change
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div
      ref={ref}
      className={clsx("relative group h-[104%]", className)}
      onClick={onClick}
    >
      {/* Overflow image (optional) sits above the top concave area */}
      {allowImageOverflow && imageUrl && (
        <div
          className="absolute left-0 -top-16 w-full"
          style={{ height: 256, zIndex: 2 }}
        >
          <div className="relative h-full w-full">
            <Image
              ref={imageRef}
              src={imageUrl}
              alt="Card Image"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105 !h-fit"
            />
          </div>
        </div>
      )}

      {/* Clipped card container with intrinsic (content) height */}
      <div
        className={clsx("relative w-full h-full overflow-hidden")}
        style={{
          clipPath: clipPathString,
          WebkitClipPath: clipPathString,
          paddingTop: allowImageOverflow ? imgHeight : 0,
        }}
      >
        {onClick && (
          <div className="absolute inset-0 w-[94%] h-[95%] rounded-b-[14%] rounded-t-[44px] mx-auto mt-1.5 cursor-pointer z-10 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        {/* Blur layer masked to exclude a thin ring under the stroke */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Mask logic: white = keep blur, black = remove. We draw full shape white, then stroke it in black to carve out a ring. */}
            <mask id={blurMaskId} maskUnits="userSpaceOnUse">
              <rect x="0" y="0" width="100" height="100" fill="black" />
              {/* Full shape */}
              <path d={normalizedPath} fill="white" />
              {/* Carve out edge ring (black stroke). strokeWidth = blurEdgeClear *2 to ensure full clearance. */}
              <path
                d={normalizedPath}
                fill="none"
                stroke="black"
                strokeWidth={blurEdgeClear * 2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </mask>
            {/* Simple blur filter as fallback if backdrop-filter unsupported. */}
            <filter
              id={`fallbackBlur-${id}`}
              x="-5%"
              y="-5%"
              width="110%"
              height="110%"
            >
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>
          {/* Background fill with mask; use backdrop-blur via parent layering by stacking an HTML overlay behind if needed. Here we approximate with semi transparent fill + SVG blur fallback. */}
          <g mask={`url(#${blurMaskId})`} className="backdrop-blur-3xl">
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              fill="rgba(255,255,255,0.05)"
              filter={`url(#fallbackBlur-${id})`}
            />
          </g>
        </svg>
        {/* Content spacing */}
        <div className="relative flex flex-col w-[calc(100%-26px)] h-[calc(100%-16px)] mx-auto px-3 pb-3 rounded-b-[44px]">
          {!allowImageOverflow && imageUrl && (
            <div className="relative mb-4" style={{ height: 256 }}>
              <Image
                src={imageUrl}
                alt="Card Image"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          {children}
        </div>
      </div>

      {/* SVG stroke overlay (slightly inset) - blur shows beneath */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        /* Apply same clip so any stroke half outside shape is trimmed (prevents visible blur beyond stroke) */
        style={
          innerStroke
            ? { clipPath: clipPathString, WebkitClipPath: clipPathString }
            : undefined
        }
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="white" stopOpacity="0.2" />
            <stop offset="52%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d={normalizedPath}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          shapeRendering="geometricPrecision"
        />
      </svg>
    </div>
  );
});

export default Card;
