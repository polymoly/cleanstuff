import { createUseStyles } from "react-jss";
import { generateIndex } from "reactjs-view-core";

interface StyleProps {
  iconBackgroundColor?: string;
  tailTickness?: number;
  tailColor?: string;
  activeColor?: string;
}

export default createUseStyles<string, StyleProps>(
  {
    [`step-item`]: {
      justifyContent: "center",
      alignItems: "flex-start",
      flex: 1,
      width: "fit-content",
      padding: 8,
    },
    [`step-item-container`]: {
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    },
    [`isLast`]: {
      maxWidth: "fit-content",
    },
    [`step-item-icon`]: {
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 9999,
      backgroundColor: ({ iconBackgroundColor }) =>
        iconBackgroundColor || "#ccc",
      overflow: "hidden",
      "&::after": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: 9999,
        backgroundColor: ({ activeColor }) => activeColor || "lightblue",
        transform: "scale(0)",
        opacity: 0,
        zIndex: -1,
      },
    },
    [`animated`]: {
      "&::after": {
        transition: "all 300ms ease",
      },
    },
    [`step-item-tail`]: {
      height: ({ tailTickness }) => tailTickness || 2,
      backgroundColor: ({ tailColor }) => tailColor || "#ccc",
      position: "absolute",
      top: 16,
      transform: "translateY(-50%)",
      "&::after": {
        content: '""',
        position: "absolute",
        top: 0,
        insetInlineStart: 0,
        width: 0,
        height: "100%",
        borderRadius: 9999,
        backgroundColor: ({ activeColor }) => activeColor || "lightblue",
      },
    },
    [`animated-tail`]: {
      "&::after": {
        transition: "all 250ms ease",
      },
    },
    [`step-item-title`]: {
      position: "absolute",
      top: 32,
      margin: 8,
      width: 140,
      maxWidth: 140,
    },
    [`step-item-text`]: {
      width: 140,
      maxWidth: 140,
      textAlign: "center",
    },
    [`active-icon`]: {
      "&::after": {
        transform: "scale(1)",
        opacity: 1,
      },
    },

    [`active-tail`]: {
      "&::after": {
        width: "100%",
      },
    },
  },
  {
    index: generateIndex("pages"),
  }
);
