import { useContext } from "react";
import { OverlayContext } from "../context";
import { OverlayProps } from "../types";
import { Item } from "./item";
import useStyles from "./style";

export const Overlay = ({ list }: OverlayProps) => {
  const classes = useStyles();
  const [onChangeValue, onSearch, onClick] = useContext(OverlayContext);

  return (
    <div className={classes.overlay}>
      {list.map(({ key, ...rest }, index, array) => (
        <Item
          key={key}
          onChange={() => onChangeValue?.(array[index])}
          onSearch={() => onSearch?.(array[index])}
          onClick={() => onClick?.(array[index])}
          {...rest}
        />
      ))}
    </div>
  );
};
