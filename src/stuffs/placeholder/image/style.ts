import { createUseStyles } from "react-jss";
import { Shape } from "../types";
import { Color } from "../utils/enum";

interface ImageSize {
  width?: number;
  height?: number;
  shape?: Shape;
}

export default createUseStyles({
  image: {
    overflow: "hidden",
    backgroundColor: Color.SOLID,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: ({ shape }: ImageSize) => {
      if (!shape) return 8;

      if (shape === "circle") {
        return "50%";
      }
      if (shape === "square") {
        return 2;
      }
      if (shape === "rounded") {
        return 8;
      }
      return 8;
    },
    width: ({ width }: ImageSize) => (width ? width : 150),
    height: ({ height }: ImageSize) => (height ? height : 150),
  },
  imageView: {
    width: ({ width }) => (width ? width / 2 : 75),
    height: ({ height }) => (height ? height / 2 : 75),
    objectFit: "contain",
    objectPosition: "center",
  },
});
