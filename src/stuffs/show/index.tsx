import { useCallback } from "react";

type Fn<U> = U | (() => U);
interface ShowProps<S, U> {
  when: S | undefined | false | null;
  children: Fn<U>;
  fallback?: Fn<U>;
}

export function Show<S, U>({ when, fallback, children }: ShowProps<S, U>) {
  const make = useCallback(
    (arg: Fn<U> | undefined) => (arg instanceof Function ? arg() : arg),
    []
  );

  return <>{when ? make(children) : make(fallback)}</>;
}
