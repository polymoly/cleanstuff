import { RefObject, useCallback, useLayoutEffect, useState } from "react";

type Query = number | string;

/**
 *
 * @description If the element width size is greater than the passed query, the observe function returns true, otherwise returns false.
 * @description If the type of passed query is a string, it is considered as a pixel value regardless of its unit.
 * @returns The observe function that returns boolean (true/false).
 */
export const useObserveElement = <S extends HTMLElement>(ref: RefObject<S>) => {
  const [size, setSize] = useState<number>(0);

  useLayoutEffect(() => {
    if (!ref.current || typeof document === "undefined") return;
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
      if (!ref.current) return;

      return size > getQuery(query);
    },
    [ref, size]
  );

  return observe;
};

function getQuery(query: Query): number {
  if (typeof query === "number") {
    return query;
  }
  const numericQuery = query.replace(/\D/g, "");

  return Number(numericQuery);
}
