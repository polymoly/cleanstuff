import { createUseStyles } from "react-jss";

export default createUseStyles({
  menuItem: {
    width: "100%",
    height: 30,
    padding: [4, 8],
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hasAction: {
    cursor: "pointer",
  },
  hover: {
    backgroundColor: "#f1f1f1",
  },
});
