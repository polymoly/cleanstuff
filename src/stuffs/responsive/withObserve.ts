import { cloneElement, useLayoutEffect, useRef, useState } from "react";

type Records = {
  readonly width?: number;
  readonly height?: number;
};

interface ObservedRecords {
  readonly DOMRecords?: Records;
}
type ObservedProps<T> = Omit<T, "DOMRecords">;
type Observable<T> = ObservedProps<T> & ObservedRecords;

export const withObserve = <P = {}, R extends HTMLElement = HTMLElement>(
  Component: (props: Observable<P>) => JSX.Element
) => {
  return (props: Observable<P>) => {
    const [DOMRecords, setDOMRecords] = useState<Records>();

    const ref = useRef<R>(null);

    useLayoutEffect(() => {
      if (!ref.current) return;
      const node = ref.current;

      const observer = new ResizeObserver(([entry]) => {
        const { width, height } = entry?.contentRect;

        setDOMRecords({ width, height });
      });

      observer.observe(node, { box: "border-box" });

      return () => observer.unobserve(node);
    }, [ref]);

    return cloneElement(Component({ ...props, DOMRecords }), { ref });
  };
};
