import { useCallback, useEffect } from "react";

export const useKeyPressed = (key: string, callback: () => void) => {
  const keyHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === key.toLowerCase() || e.code === key) {
        e.preventDefault();
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
