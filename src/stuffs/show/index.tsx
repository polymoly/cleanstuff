import { ReactNode } from "react";
import { ternary } from "../ternary";

interface ShowProps<S, U> {
  when: S | undefined | false | null;
  children: U | (() => U);
  fallback?: ReactNode | ReactNode[];
}

export function Show<S, U>({ when, fallback, children }: ShowProps<S, U>) {
  const T = (arg: U | (() => U) | undefined) =>
    arg instanceof Function ? arg() : arg;

  return <>{ternary(Boolean(when), T(children), fallback)}</>;
}
