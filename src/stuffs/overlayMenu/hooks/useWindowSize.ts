import { useEffect, useState } from "react";

type Size = { width: number; height: number };

export const useWindowSize = (): Size => {
  const [size, setSize] = useState<Size>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const resizer = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resizer);

    return () => window.removeEventListener("resize", resizer);
  }, []);

  return size;
};
