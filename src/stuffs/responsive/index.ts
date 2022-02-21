import { RefObject, useCallback, useContext, useEffect, useState } from "react";
import { useWindowSize } from "./useWindowSize";
import { ObserveContext } from "./withObserve";

export function useObserveElement<S extends HTMLElement>(ref?: RefObject<S>) {
  const [size, setSize] = useState<number>(0);
  const { width } = useWindowSize();
  const parentRef = useContext(ObserveContext);

  useEffect(() => {
    if (
      ref?.current ||
      !parentRef?.current ||
      typeof ObserveContext === "undefined"
    ) {
      return;
    }

    const node = parentRef.current;

    const observer = new ResizeObserver(([entry]) => {
      setSize(entry?.contentRect?.width);
    });

    observer.observe(node, { box: "border-box" });

    return () => observer.unobserve(node);
  }, [ref, parentRef]);

  useEffect(() => {
    if (!ref?.current) return;
    const node = ref.current;

    const observer = new ResizeObserver(([entry]) => {
      setSize(entry?.contentRect?.width);
    });

    observer.observe(node, { box: "border-box" });

    return () => observer.unobserve(node);
  }, [ref]);

  const observe = useCallback(
    (query: number) => {
      if (ref?.current || parentRef?.current) {
        return size >= query;
      }
      if (typeof window === "undefined") return;

      return width >= query;
    },
    [ref, parentRef, size, width]
  );

  return observe;
}
