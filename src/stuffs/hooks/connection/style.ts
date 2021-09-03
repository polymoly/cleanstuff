import { createUseStyles } from "react-jss";

export default createUseStyles({
  backdrop: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 9999,
    color: "#000",
    left: 0,
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
    userSelect: "none",
    backgroundColor: "transparent",
  },
  mask: {
    backgroundColor: "rgba(0,0,0,.16)",
  },
});
