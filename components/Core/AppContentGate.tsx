"use client";
import { useEffect, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AppContentGateProps {
  children: ReactNode;
  /** Delay (ms) after app-ready event before mounting children */
  mountDelay?: number;
  /** Whether to animate the wrapper when it appears */
  animate?: boolean;
}

/**
 * Gate component that waits for the custom `app:ready` event (emitted by LoadingScreen)
 * before actually rendering its children. Prevents child animations from starting
 * underneath the loading overlay.
 */
export default function AppContentGate({
  children,
  mountDelay = 0,
  animate = true,
}: AppContentGateProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function markReady() {
      if (mountDelay) {
        setTimeout(() => setReady(true), mountDelay);
      } else {
        setReady(true);
      }
    }
    // If loader already finished before hydration
    if (document.body.classList.contains("app-ready")) {
      markReady();
    } else {
      window.addEventListener("app:ready", markReady, { once: true });
    }
    return () => {
      window.removeEventListener("app:ready", markReady);
    };
  }, [mountDelay]);

  if (!ready && !animate) return null;

  return (
    <AnimatePresence>
      {ready && (
        <motion.div
          {...(animate
            ? {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -8 },
                transition: { duration: 0.6, ease: "easeOut" },
              }
            : {})}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
