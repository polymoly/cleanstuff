import { Variants } from "framer-motion";

export const svgVariants: Variants = {
  light: (color) => ({
    rotate: 40,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
    color: "#fff",
    viewBox: "0 0 24 24",
    width: 30,
    height: 30,
    stroke: "currentcolor",
    cursor: "pointer",
    transformOrigin: "0px 0px",
    transition: { duration: 0.8, type: "spring", stiffness: 50 },
  }),
  dark: {
    rotate: -45,
    transition: { duration: 0.8, type: "spring", stiffness: 50 },
    transformOrigin: "0px 0px",
  },
};

export const maskCircleVariants: Variants = {
  light: {
    cx: "100%",
    cy: 0,
    r: 10,
    fill: "#000",
    transition: { duration: 0.8, type: "spring", stiffness: 50 },
  },
  dark: {
    cx: "40%",
    cy: "23%",
    transition: { duration: 0.8, type: "spring", stiffness: 50 },
  },
};

export const circleVariants: Variants = {
  light: {
    r: 5,
    cx: 12,
    cy: 12,
    fill: "#fff",
    mask: "url(#mask)",
    transition: { duration: 0.8, type: "spring", stiffness: 50 },
  },
  dark: {
    r: 9,
    transition: { duration: 0.8, type: "spring", stiffness: 50 },
  },
};

export const groupVariants: Variants = {
  light: {
    opacity: 1,
    stroke: "currentcolor",
    transition: { duration: 0.8, type: "spring", stiffness: 50 },
  },
  dark: {
    opacity: 0,
    transition: { duration: 0.8, type: "spring", stiffness: 50 },
  },
};
