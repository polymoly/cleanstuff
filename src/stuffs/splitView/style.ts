import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  splitContainer: {
    flex: 1,
    alignItems: "center",
    background: "#ccc",
    overflow: "hidden",
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
  },
  pane: {
    width: "100%",
    overflow: "hidden",
  },
  resizer: {
    width: "100%",
    cursor: "row-resize",
    background: "#111",
  },
  grab: {
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      width: "100%",
      height: "100%",
      background: "#1c91e6",
      zIndex: 2,
    },
  },
});
