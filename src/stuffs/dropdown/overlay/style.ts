import { createUseStyles } from "react-jss";

export default createUseStyles({
  overlay: {
    width: "100%",
    height: 500,
    background: "#ccc",
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    overflowX: "hidden",
    overflowY: "auto",
  },
});
