import { cloneElement, useLayoutEffect, useRef, useState } from "react";

type TRecord = {
  readonly width?: number;
  readonly height?: number;
};

interface ObservedRecords {
  readonly Records?: TRecord;
}
type ObservedProps<T> = Omit<T, "Records">;
type Observable<T> = ObservedProps<T> & ObservedRecords;

export const withObserve = <P = {}, R extends HTMLElement = HTMLElement>(
  Component: (props: Observable<P>) => JSX.Element
) => {
  return (props: Observable<P>) => {
    const [Records, setRecords] = useState<TRecord>();

    const ref = useRef<R>(null);

    useLayoutEffect(() => {
      if (!ref.current) return;
      const node = ref.current;

      const observer = new ResizeObserver(([entry]) => {
        const { width, height } = entry?.contentRect;

        setRecords({ width, height });
      });

      observer.observe(node, { box: "border-box" });

      return () => observer.unobserve(node);
    }, [ref]);

    return cloneElement(Component({ ...props, Records }), {
      ref,
    });
  };
};
