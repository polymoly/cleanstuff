import { createUseStyles } from "react-jss";

export const useStyle = createUseStyles({
  slider: {
    width: 400,
    height: 6,
    borderRadius: 999,
    background: "#ccc",
    position: "relative",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  handler: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    background: "#222",
    position: "absolute",
    cursor: "pointer",
  },
});
