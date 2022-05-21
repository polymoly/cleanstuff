import { useState } from "react";

type CycleState<T> = [T, (index?: number) => void];

export const useCycle = <P>(...args: P[]): CycleState<P> => {
  const [cycleIndex, setCycleIndex] = useState<number>(0);

  const cycle = (index?: number) => {
    setCycleIndex((i) => index ?? (i === args.length - 1 ? 0 : i + 1));
  };

  return [args[cycleIndex], cycle];
};
