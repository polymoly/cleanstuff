import { createUseStyles } from "react-jss";
import { Shape } from "../types";
import { Color } from "../utils/enum";

interface ButtonSize {
  width?: number;
  height?: number;
  shape?: Omit<Shape, "circle">;
}

export default createUseStyles({
  button: {
    backgroundColor: Color.SOLID,
    marginInline: 4,
    borderRadius: ({ shape }: ButtonSize) => {
      if (!shape) return 2;

      if (shape === "square") {
        return 2;
      }
      if (shape === "rounded") {
        return 8;
      }
      return 2;
    },
    width: ({ width }) => (width ? width : 75),
    height: ({ height }) => (height ? height : 35),
  },
});
