import { createUseStyles } from "react-jss";
import { Shape, Size } from "../types";
import { Color } from "../utils/enum";

interface CupSize {
  size?: Size;
  shape?: Shape;
}

export default createUseStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginInline: 4,
    maxWidth: ({ size }: CupSize) => {
      if (!size) return 36;

      if (size === "small") {
        return 24;
      }
      if (size === "default") {
        return 36;
      }
      if (size === "large") {
        return 48;
      }
      return size;
    },
  },
  cup: {
    marginBottom: 2,
    backgroundColor: Color.SOLID,
    borderRadius: ({ shape }: CupSize) => {
      if (!shape) return "50%";

      if (shape === "circle") {
        return "50%";
      }
      if (shape === "square") {
        return 2;
      }
      if (shape === "rounded") {
        return 8;
      }
      return "50%";
    },
    width: ({ size }: CupSize) => {
      if (!size) return 36;

      if (size === "small") {
        return 24;
      }
      if (size === "default") {
        return 36;
      }
      if (size === "large") {
        return 48;
      }
      return size;
    },
    height: ({ size }: CupSize) => {
      if (!size) return 36;

      if (size === "small") {
        return 24;
      }
      if (size === "default") {
        return 36;
      }
      if (size === "large") {
        return 48;
      }
      return size;
    },
  },
  saucer: {
    marginTop: 2,
    backgroundColor: Color.SOLID,
    width: ({ size }: CupSize) => {
      if (!size) return 36;

      if (size === "small") {
        return 24;
      }
      if (size === "default") {
        return 36;
      }
      if (size === "large") {
        return 48;
      }
      return size;
    },
    height: ({ size }: CupSize) => {
      if (!size) return 36 * 0.4;

      if (size === "small") {
        return 24 * 0.4;
      }
      if (size === "default") {
        return 36 * 0.4;
      }
      if (size === "large") {
        return 48 * 0.4;
      }
      return size * 0.4;
    },
  },
});
