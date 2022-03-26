import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  container?: Element;
}

export const Portal = ({ children, container }: PortalProps) => {
  const isValidNode = () => {
    return container && container.nodeType === Node.ELEMENT_NODE;
  };

  return createPortal(
    children,
    container && isValidNode() ? container : document.body
  );
};
