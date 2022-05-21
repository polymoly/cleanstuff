import { createUseStyles } from "react-jss";

export const useStyle = createUseStyles({
  wrapper: {
    maxWidth: "100%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    minHeight: 30,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflowY: "hidden",
    overflowX: "auto",
    maxWidth: "100%",
    minHeight: 30,
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  flowItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    borderRadius: 2,
    cursor: "pointer",
    transition: "all 250ms ease",
    "&:hover": {
      background: "#f8f8f8",
    },
  },
  arrow: {
    height: "100%",
    minWidth: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    minHeight: 30,

    "&:hover": {
      background: "#f8f8f8",
    },
  },
});
