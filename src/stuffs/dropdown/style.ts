import { createUseStyles } from "react-jss";

export default createUseStyles({
  input: {
    border: "none",
    outline: "none",
    width: "100%",
    height: "100%",
    background: "transparent",
    padding: [0, 8],
    fontSize: 14,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 2,
    border: [1, "solid", "#ccc"],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
    color: "#000",
    minHeight: 35,
  },
  container: {
    minWidth: 200,
    minHeight: 35,
  },

  overlay: {
    width: "100%",
    height: 500,
    background: "#ccc",
    borderRadius: 2,
    padding: 8,
  },
});
