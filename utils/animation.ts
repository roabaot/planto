import type { Variants } from "framer-motion";

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      duration: 0.6,
    },
  },
};

// Individual card (or generic item) fade + slight rise.
// Can be used with a parent providing staggerChildren, OR each card can control its own
// initial/whileInView + custom delay (mobile-friendly when parent viewport trigger fires too early).
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1], // custom ease for a smooth spring-like feel
    },
  },
};
