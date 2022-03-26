import React from "react";
import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  header: {
    width: "100%",
    maxHeight: 50,
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: [16, 8],
    borderBottom: "1px solid #ccc",
  },
});

interface DatePickerHeaderProps {
  onClick?: () => void;
}

export const DatePickerHeader = ({ onClick }: DatePickerHeaderProps) => {
  const classes = useStyle();

  return (
    <div className={classes.header}>
      <div>
        <span style={{ marginInline: 4 }}>{"<<"}</span>
        <span style={{ marginInline: 4 }}>{"<"}</span>
      </div>
      <div onClick={onClick}>فروردین 1400</div>
      <div>
        <span style={{ marginInline: 4 }}>{">"}</span>
        <span style={{ marginInline: 4 }}>{">>"}</span>
      </div>
    </div>
  );
};
