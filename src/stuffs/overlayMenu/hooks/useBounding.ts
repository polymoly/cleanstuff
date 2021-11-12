import { RefObject, useLayoutEffect, useState } from "react";

export type Bound = DOMRect | undefined;

export const useBounding = <T extends HTMLElement>(
  element: RefObject<T>
): Bound => {
  const [bounds, setBounds] = useState<Bound>();

  useLayoutEffect(() => {
    if (!element.current || typeof window === "undefined") return;
    const node = element.current;
    const onSetBounds = () => {
      setBounds(node?.getBoundingClientRect());
    };
    onSetBounds();

    window.addEventListener("scroll", onSetBounds);

    return () => window.removeEventListener("scroll", onSetBounds);
  }, [element]);

  return bounds;
};
