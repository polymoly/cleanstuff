import { createUseStyles } from "react-jss";

export default createUseStyles({
  gotoWrapper: {
    width: "auto",
    height: 30,
    marginInline: 8,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  goto: {
    width: 60,
    height: "100%",
    outline: "none",
    backgroundColor: "transparent",
    paddingInline: 4,
    border: [1, "solid", "#ccc"],
    marginInline: 2,
  },
});
