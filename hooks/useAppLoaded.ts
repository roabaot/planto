"use client";
import { useEffect, useState } from "react";

/**
 * Hook that returns true when the window load event has fired (all resources) OR
 * when a safety timeout triggers. Can be used by components that want to delay
 * hydration animations until everything is ready.
 */
export function useAppLoaded(timeoutMs: number = 6000) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    function onLoad() {
      setLoaded(true);
      document.body.classList.add("app-loaded");
    }
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }
    const t = setTimeout(() => {
      setLoaded(true);
      document.body.classList.add("app-loaded");
    }, timeoutMs);
    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(t);
    };
  }, [timeoutMs]);

  return loaded;
}
