import { createUseStyles } from "react-jss";
import { Style } from "./types";

interface StyleProps {
  style?: Style;
  counterSize?: number;
  duration?: number;
}

export default createUseStyles({
  counterContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden !important",
    padding: 4,
    transition: ({ duration = 0.3 }) => `width ${duration}s ease-in-out`,
    width: ({ counterSize = 30 }: StyleProps) => counterSize + 8,
    backgroundColor: ({ style: { backgroundColor } = {} }) =>
      backgroundColor || "#ddd",
    minWidth: ({ style: { width } = {}, counterSize = 30 }) =>
      width || (counterSize > 30 ? counterSize : 30),
    height: ({ style: { height = 30 } = {} }) => height,
    maxHeight: ({ style: { height = 30 } = {} }) => height,
    fontSize: ({ style: { fontSize } = {} }) => fontSize || undefined,
    fontFamily: ({ style: { fontFamily } = {} }) => fontFamily || undefined,
    color: ({ style: { color } = {} }) => color || "#111",
    borderRadius: ({ style: { borderRadius, width = 30, height = 30 } = {} }) =>
      borderRadius || Math.max(width, height),
  },
});
