import { jss, createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  action: {
    padding: [6, 12],
    backgroundColor: "#ccc",
    borderRadius: 4,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#444",
  },
  hover: {
    backgroundColor: "#999",
  },
  focus: {
    backgroundColor: "brown",
  },
  tabFocus: {
    border: [2, "solid", "red"],
  },
});
