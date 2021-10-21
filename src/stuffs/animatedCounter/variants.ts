import { Variants } from "framer-motion";
import { Direction, Style } from "./types";

interface VariantArgs {
  style: Style;
  direction: Direction;
}

export const variants: Variants = {
  initial: ({ style: { height = 30 } = {}, direction }: VariantArgs) => ({
    y: (height + 8) * (direction === "upwards" ? 1 : -1),
  }),
  animated: {
    y: 0,
    position: "absolute",
  },
  exit: ({ style: { height = 30 } = {}, direction }: VariantArgs) => ({
    y: (height + 8) * (direction === "upwards" ? -1 : 1),
    position: "absolute",
  }),
};
