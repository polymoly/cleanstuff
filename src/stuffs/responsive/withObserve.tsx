import React, { cloneElement, createContext, useRef } from "react";
import { useForm } from "react-hook-form";

interface ObservedRecords<R> {
  readonly observationRef?: React.RefObject<R>;
}
type Observable<T, R> = T & ObservedRecords<R>;

export const ObserveContext =
  createContext<React.RefObject<HTMLElement> | null>(null);

export const withObserve = <
  P extends object = {},
  R extends HTMLElement = HTMLDivElement
>(
  Component: (props: Observable<P, R>) => JSX.Element
) => {
  return (props: Observable<P, R>) => {
    const ref = useRef<R>(null);
    const methods = useForm();

    return (
      <ObserveContext.Provider value={ref}>
        {cloneElement(Component({ ...props, observationRef: ref }))}
      </ObserveContext.Provider>
    );
  };
};
