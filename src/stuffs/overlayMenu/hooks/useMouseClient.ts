import { RefObject, useEffect, useState } from "react";
import { Trigger } from "../types";

export type Client = { x: number; y: number };

export const useMouseClient = <T extends HTMLElement>(
  element: RefObject<T>,
  trigger: Trigger
): Client => {
  const [client, setClient] = useState<Client>({ x: 0, y: 0 });
  const positioner = ({ clientX, clientY }: MouseEvent) => {
    setClient({ x: clientX, y: clientY });
  };
  useEffect(() => {
    if (!element.current) return;
    const node = element.current;

    if (trigger === "click") {
      node.addEventListener("click", positioner);
      return;
    }
    node.addEventListener("contextmenu", positioner);

    return () => {
      node.removeEventListener(
        trigger === "context" ? "contextmenu" : "click",
        positioner
      );
    };
  }, [element, trigger]);

  return client;
};
