import classNames from "classnames";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  item: {
    width: "100%",
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
    justifySelf: "center",
    cursor: "pointer",
  },
  cell: {
    width: 30,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
    justifySelf: "center",
    borderRadius: "50%",
  },
  select: {
    backgroundColor: "teal",
    color: "#fff",
  },
});

interface CellProps {
  label: string | number;
  isStatic?: boolean;
  isSelect?: boolean;
  onHover?: (hovering: boolean) => void;
  onSelect?: () => void;
}

export const Cell = ({ label, onHover, onSelect, isSelect }: CellProps) => {
  const classes = useStyle();

  const onMouseEnter = () => {
    onHover?.(true);
  };

  const onMouseLeave = () => {
    onHover?.(false);
  };

  return (
    <div
      className={classes.item}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onSelect}
    >
      <div className={classNames(classes.cell, isSelect && classes.select)}>
        {label}
      </div>
    </div>
  );
};
