import { useCallback, useEffect } from "react";

export const useKeyPressed = (key: string, callback: () => void) => {
  const keyHandler = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === key.toLowerCase() || e.code === key) {
        callback();
      }
    },
    [callback, key]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  }, [keyHandler]);
};
