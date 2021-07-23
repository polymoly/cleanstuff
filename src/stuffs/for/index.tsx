import { Suspense, cloneElement, SuspenseProps } from "react";
import { uniqueId } from "../uniqueIdGenerator";

interface ForProps<S, U> extends Omit<Partial<SuspenseProps>, "children"> {
  each: readonly S[];
  children: (item: S, index: number) => U;
}

export function For<S, U extends JSX.Element>({
  each,
  fallback,
  children,
}: ForProps<S, U>) {
  return (
    <Suspense fallback={fallback ?? false}>
      {each?.map((item: S, index: number) =>
        cloneElement(children(item, index), { key: uniqueId() })
      )}
    </Suspense>
  );
}
