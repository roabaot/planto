"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionCardProps {
  children: ReactNode;
}

export function MotionCard({ children }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="rounded-xl border border-gray-200 bg-white/70 backdrop-blur p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      {children}
    </motion.div>
  );
}
