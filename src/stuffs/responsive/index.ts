import { RefObject, useCallback, useLayoutEffect, useState } from "react";
import { useWindowSize } from "./useWindowSize";

type Query = number | string;

/**
 *
 * @description If the element width size is greater than the passed query, the observe function returns true, otherwise returns false.
 * @description If the type of passed query is a string, it is considered as a pixel value regardless of its unit.
 * @description If no ref passed to hook parameter, by default its considers the global window as an observed element.
 * @returns The observe function that returns boolean (true/false).
 */
export function useObserveElement<S extends HTMLElement>(ref?: RefObject<S>) {
  const [size, setSize] = useState<number>(0);
  const { width } = useWindowSize();

  useLayoutEffect(() => {
    if (!ref?.current || typeof document === "undefined") return;
    const node = ref.current;

    const observer = new ResizeObserver(([entry]) => {
      setSize(entry?.contentRect?.width);
    });

    if (document.contains(node)) {
      observer.observe(node, { box: "border-box" });
    }

    return () => observer.unobserve(node);
  }, [ref]);

  const observe = useCallback(
    (query: Query) => {
      if (!ref?.current) {
        if (typeof window === "undefined") {
          throw new Error("Window is undefined.");
        }

        return width > getQuery(query);
      }

      return size > getQuery(query);
    },
    [ref, size, width]
  );

  return observe;
}

function getQuery(query: Query): number {
  if (typeof query === "number") {
    return query;
  }
  const numericQuery = query.replace(/\D/g, "");

  return Number(numericQuery);
}
