import { useEffect, useState, RefObject } from "react";

export const useHold = <T extends HTMLElement>(
  ref: RefObject<T>,
  duration: number
) => {
  const [press, setPress] = useState<boolean>(false);
  const [isHold, setIsHold] = useState<boolean>(false);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;

    const down = () => setPress(true);

    node.addEventListener("mousedown", down);

    return () => node.removeEventListener("mousedown", down);
  }, [ref]);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;

    const up = () => {
      setPress(false);
      setIsHold(false);
    };

    node.addEventListener("mouseup", up);

    return () => node.removeEventListener("mouseup", up);
  }, [ref]);

  useEffect(() => {
    if (!press) return;

    const timer = setTimeout(() => {
      setIsHold(true);
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [duration, press]);

  return isHold;
};
