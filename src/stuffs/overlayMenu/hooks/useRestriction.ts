import { RefObject, useEffect, useState } from "react";
import { Client } from "./useMouseClient";
import { useWindowSize } from "../../responsive/useWindowSize";

type RestrictValue = { h: number; v: number };

export const useRestriction = <T extends HTMLElement>(
  element: RefObject<T>,
  isPresent: boolean,
  client: Client,
  hasRestrict?: boolean,
  boundOffset: number = 8
): RestrictValue => {
  const { width, height } = useWindowSize();
  const [restrictValue, setRestrictValue] = useState<RestrictValue>({
    h: 0,
    v: 0,
  });
  useEffect(() => {
    if (!element.current) return;
    const node = element.current;

    if (!hasRestrict || !isPresent) {
      setRestrictValue({ h: 0, v: 0 });
      return;
    }

    if (client.x + node.clientWidth > width) {
      setRestrictValue((prevState) => ({
        ...prevState,
        h: client.x + node.clientWidth - width + boundOffset,
      }));
    }
    if (client.y + node.clientHeight > height) {
      setRestrictValue((prevState) => ({
        ...prevState,
        v: client.y + node.clientHeight - height + boundOffset,
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boundOffset, hasRestrict, height, width, client, isPresent, element]);

  return restrictValue;
};
