import { motion, MotionProps, HTMLMotionProps } from "framer-motion";
import { ForwardedRef, forwardRef } from "react";
import { Client } from "../hooks/useMouseClient";

type MotionOverlayProps = HTMLMotionProps<"div"> & MotionProps;

interface OverlayProps extends MotionOverlayProps {
  client: Client;
  strictBounding: boolean;
}

export const Overlay = forwardRef(
  (
    {
      children,
      onClick,
      onContextMenu,
      client,
      strictBounding,
      ...rest
    }: OverlayProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const onClickOverlay = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      e.stopPropagation();
      onClick?.(e);
    };

    const onContextOverlay = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      e.stopPropagation();
      e.preventDefault();
      onContextMenu?.(e);
    };

    return (
      <motion.div
        ref={ref}
        onClick={onClickOverlay}
        onContextMenu={onContextOverlay}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }
);
