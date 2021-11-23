import { ButtonProps, Show, Animation } from "../types";
import useStyles from "./style";

interface ButtonHolderProps<S> extends ButtonProps {
  animation?: Animation;
  isShown?: Show<S>;
}

export const ButtonHolder = <S extends any>({
  animation,
  height,
  isShown = true,
  shape,
  width,
}: ButtonHolderProps<S>) => {
  const classes = useStyles({ shape, width, height } as any);
  return isShown ? <div className={classes.button} /> : null;
};
