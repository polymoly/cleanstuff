import classnames from "classnames";
import useStyles from "./style";
import { SwitchArrowProps } from "../../utility/types";

export const SwitchArrow = ({
  hide,
  onClick,
  icon,
  disabled,
  isPrevious = false,
}: SwitchArrowProps) => {
  const classes = useStyles({ isPrevious } as any);

  return !hide ? (
    <div
      className={classnames(classes.switchArrow, disabled && classes.disable)}
      onClick={onClick}
    >
      {icon}
    </div>
  ) : null;
};
