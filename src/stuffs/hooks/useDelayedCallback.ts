import { useEffect } from "react";

export const useDelayedCallback = (callback: () => void, delay: number) => {
  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
};
