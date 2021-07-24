import { useCallback, useState } from "react";

type Key<U> = keyof U;

type Identifier<U> = U extends object ? Key<U> : null;

type Value<U> = U extends object ? NonNullable<U>[Key<U>] : U;

export const useArray = <S>(initialArray: Array<S>) => {
  const [array, setArray] = useState<S[]>(initialArray);

  const removeByIndentifier = useCallback(
    (identifier: Identifier<S>, value: Value<S>) => {
      const remaining = [...initialArray].filter((item) => {
        return item?.[identifier as Key<S>] !== value;
      });

      setArray(remaining);
    },
    [initialArray]
  );

  const removeByIndex = useCallback(
    (index: number) => {
      const remaining = [...initialArray].filter((_, i) => i !== index);
      setArray(remaining);
    },
    [initialArray]
  );

  const add = useCallback(
    (item: S, place?: number) => {
      const duplicatedArray = [...initialArray];
      duplicatedArray.splice(place ? place : duplicatedArray.length, 0, item);
      setArray(duplicatedArray);
    },
    [initialArray]
  );

  const clear = useCallback(() => setArray(() => []), []);

  return { array, setArray, removeByIndentifier, removeByIndex, add, clear };
};
