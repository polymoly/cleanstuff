import { useState } from "react";

type DO<U> = U extends infer R
  ? R[keyof R] | ((prev: R) => R[keyof R])
  : U[keyof U];
type DP<U> = U extends infer R ? keyof R : keyof U;
type DD<U> = (property: DP<U>, object: DO<U>) => void;

export const useDeepState = <T extends object>(initialState: T): [T, DD<T>] => {
  const [state, setMutateValue] = useState<T>(initialState);

  const setState = (property: DP<T>, object: DO<T>) => {
    setMutateValue((prev) => {
      if (object instanceof Function) {
        return {
          ...prev,
          [property]: object(prev),
        };
      }
      return {
        ...prev,
        [property]: object,
      };
    });
  };

  return [state, setState];
};
