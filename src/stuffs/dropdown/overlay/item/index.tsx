import { ItemProps } from "../../types";
import useStyles from "./style";

export const Item = ({
  value,
  disabled,
  onChange,
  onClick,
  onSearch,
  userAdded,
}: ItemProps) => {
  const classes = useStyles();

  const onItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    onChange?.();
    onClick?.();
  };

  return (
    <div className={classes.item} onClick={onItemClick}>
      {value}
    </div>
  );
};
