import { createUseStyles } from "react-jss";
import { Shape, Size } from "../types";
import { Color } from "../utils/enum";

interface AvatarSize {
  size?: Size;
  shape?: Shape;
}

export default createUseStyles({
  avatar: {
    backgroundColor: Color.SOLID,
    width: ({ size }: AvatarSize) => {
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
    height: ({ size }: AvatarSize) => {
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
    borderRadius: ({ shape }) => {
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
    marginInline: 4,
  },
});
