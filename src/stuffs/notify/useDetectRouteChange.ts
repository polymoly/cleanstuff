import { useLayoutEffect, useRef } from "react";

export const useDetectRouteChange = (callback: () => void) => {
  const previousRoute = useRef<string>("");

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new MutationObserver((a) => {
      if (window.location.href !== previousRoute.current) {
        previousRoute.current = window.location.href;
        callback();
      }
    });

    observer.observe(document, { subtree: true, childList: true });

    return () => observer.disconnect();
  }, []);
};
