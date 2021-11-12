import useStyles from "./style";
import classnames from "classnames";

interface SwitchProps {
  onClick: () => void;
  disabled: boolean;
  isForward?: boolean;
}

export const Switch = ({ disabled, onClick, isForward }: SwitchProps) => {
  const classes = useStyles({ disabled } as any);
  return (
    <div
      className={classnames(classes.switch, !disabled && classes.hovering)}
      onClick={onClick}
    >
      {isForward ? ">" : "<"}
    </div>
  );
};
