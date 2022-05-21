import { useEffect, useRef, useState } from "react";

export const useTrack = <T>(value: T, onChange?: () => void) => {
  const [tracked, setTracked] = useState<T>(value);
  const changeRef = useRef<T[]>([]);

  useEffect(() => {
    setTracked(value);

    if (tracked !== value) {
      changeRef.current.push(value);
      onChange?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return changeRef.current;
};
