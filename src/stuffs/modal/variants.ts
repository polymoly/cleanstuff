import { Variants } from "framer-motion";

type CustomProps = {
  width: number;
  shouldReduced: boolean;
};

export const variants: Variants = {
  close: ({ width, shouldReduced }: CustomProps) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    scale: shouldReduced ? 1 : 0.8,
    opacity: 0,
    width: width || 520,
    height: "auto",
    maxWidth: "calc(100% - 32px)",
    maxHeight: "calc(100% - 32px)",
    zIndex: 1000,
    translateX: "-50%",
    translateY: "-50%",
  }),
  maskClose: (mask: boolean) => ({
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: 999,
    inset: 0,
    opacity: 0,
    overflow: "hidden",
    background: mask ? "#00000066" : "transparent",
    pointerEvents: mask ? "auto" : "none",
  }),
  open: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "keyframes",
      ease: "easeOut",
    },
  },
  maskOpen: {
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "keyframes",
      ease: "easeOut",
    },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.4,
      type: "keyframes",
      ease: "backOut",
    },
  },
  maskExit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      type: "keyframes",
      ease: "backOut",
    },
  },
};
