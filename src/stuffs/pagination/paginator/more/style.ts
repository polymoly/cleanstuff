import { createUseStyles } from "react-jss";

export default createUseStyles({
  more: {
    width: 30,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#111",
    background: "transparent",
    marginInline: 2,
  },
  moreItem: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  moreSwitcher: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
});
