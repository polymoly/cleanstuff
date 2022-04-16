import { Variants } from "framer-motion";

type Custom = {
  maxHeight?: number;
  shouldReverse?: boolean;
  block: { left: number; bottom: number };
};

export const variants: Variants = {
  initial: ({ maxHeight, shouldReverse, block }: Custom) => ({
    width: "100%",
    maxWidth: 500,
    height: "auto",
    maxHeight: maxHeight ? maxHeight : undefined,
    scaleY: 0.9,
    transformOrigin: shouldReverse ? "bottom center" : "top center",
    msTransformOrigin: shouldReverse ? "bottom center" : "top center",
    MozTransformOrigin: shouldReverse ? "bottom center" : "top center",
    borderRadius: 4,
    position: "absolute",
    left: block?.left || 0,
    top: !shouldReverse ? (block?.bottom || 0) + 8 : undefined,
    bottom: shouldReverse ? (block?.bottom || 0) + 8 : undefined,
    background: "#fff",
    opacity: 0,
    boxShadow: "0 4px 8px rgba(110,110,110,.18)",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "hidden",
    zIndex: 9999,
  }),
  open: ({ shouldReverse }: Custom) => ({
    opacity: 1,
    scaleY: 1,
    transformOrigin: shouldReverse ? "bottom center" : "top center",
    msTransformOrigin: shouldReverse ? "bottom center" : "top center",
    MozTransformOrigin: shouldReverse ? "bottom center" : "top center",
    transition: {
      duration: 0.25,
      type: "keyframes",
      ease: [0.645, 0.045, 0.355, 1],
    },
  }),
  exit: ({ shouldReverse }: Custom) => ({
    opacity: 0,
    scaleY: 0.9,
    transformOrigin: shouldReverse ? "bottom center" : "top center",
    msTransformOrigin: shouldReverse ? "bottom center" : "top center",
    MozTransformOrigin: shouldReverse ? "bottom center" : "top center",
    transition: {
      duration: 0.2,
      type: "keyframes",
      ease: "backOut",
    },
  }),
};
