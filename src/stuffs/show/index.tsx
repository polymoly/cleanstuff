import { Suspense, SuspenseProps } from "react";

interface ShowProps<S> extends Omit<Partial<SuspenseProps>, "children"> {
  when: S | undefined | false | null;
  children: JSX.Element | ((item: S) => JSX.Element);
}

export function Show<S>({ when, fallback, children }: ShowProps<S>) {
  return (
    <Suspense fallback={fallback ?? false}>
      {when && (children instanceof Function ? children(when) : children)}
    </Suspense>
  );
}
