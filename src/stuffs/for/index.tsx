import { useCallback, cloneElement } from "react";
import { uniqueId } from "../uniqueIdGenerator";

type Fn<U> = U | (() => U);
interface ForProps<S, U> {
  each: readonly S[];
  children: (item: S, index: number) => U;
  fallback?: Fn<U>;
}

export function For<S, U extends JSX.Element>({
  each,
  fallback,
  children,
}: ForProps<S, U>) {
  const make = useCallback(
    (arg: Fn<U> | undefined) => (arg instanceof Function ? arg() : arg),
    []
  );

  return (
    <>
      {each && each.length > 0
        ? each.map((item: S, index: number) =>
            cloneElement(children(item, index), { key: uniqueId() })
          )
        : make(fallback)}
    </>
  );
}
