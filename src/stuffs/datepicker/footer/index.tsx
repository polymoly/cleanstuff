import React from "react";
import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  footer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    maxHeight: 50,
    flex: 1,
    width: "100%",
    borderTop: "1px solid #ccc",
    padding: [16, 8],
  },
});

export const DatePickerFooter = () => {
  const classes = useStyle();

  return <div className={classes.footer}>امروز</div>;
};
