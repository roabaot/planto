"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Full-screen loading overlay that fades out once the window 'load' event fires
 * or after a safety timeout (in case some resource stalls).
 */
export default function LoadingScreen() {
  const MIN_VISIBLE_MS = 1000; // exactly 1s minimum display
  const [mountedAt] = useState(() => performance.now());
  const [loaded, setLoaded] = useState(false); // window load fired
  const [visible, setVisible] = useState(true);

  // Listen for full resource load
  useEffect(() => {
    function onLoad() {
      setLoaded(true);
    }
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // Once loaded, ensure at least 1s total visible time
  useEffect(() => {
    if (!loaded) return;
    const elapsed = performance.now() - mountedAt;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
    const t = setTimeout(() => {
      document.body.classList.add("app-ready");
      window.dispatchEvent(new Event("app:ready"));
      setVisible(false);
    }, remaining);
    return () => clearTimeout(t);
  }, [loaded, mountedAt]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="app-loading-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.55, ease: "easeInOut" },
          }}
        >
          <div className="loader">
            <Spinner />
            <p className="loader-text">Loading plants...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Spinner() {
  return (
    <div
      className="plant-spinner"
      aria-label="Content is loading"
      role="status"
    >
      <div className="plant">
        <div className="plant-stem" />
        {/* Stem leaves */}
        <div className="plant-leaf stem-leaf stem-leaf-1" />
        <div className="plant-leaf stem-leaf stem-leaf-2" />
        <div className="plant-leaf stem-leaf stem-leaf-3" />
        <div className="plant-leaf leaf-left" />
        <div className="plant-leaf leaf-right" />
        <div className="plant-leaf leaf-mid" />
        <div className="plant-pot">
          <div className="pot-inner" />
        </div>
        <div className="plant-glow" />
      </div>
    </div>
  );
}
