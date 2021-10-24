import useStyles from "./style";

interface SwitchProps {
  onClick: () => void;
  disabled: boolean;
  isForward?: boolean;
}

export const Switch = ({ disabled, onClick, isForward }: SwitchProps) => {
  const classes = useStyles({ disabled } as any);
  return (
    <div className={classes.switch} onClick={onClick}>
      {isForward ? ">" : "<"}
    </div>
  );
};
