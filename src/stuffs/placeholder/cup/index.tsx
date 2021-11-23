import { CupProps, Show, Animation } from "../types";
import useStyles from "./style";

interface CupHolderProps<S> extends CupProps {
  animation?: Animation;
  isShown?: Show<S>;
}

export const CupHolder = <S extends any>({
  animation,
  isShown = true,
  shape = "circle",
  size = "default",
}: CupHolderProps<S>) => {
  const classes = useStyles({ size, shape } as any);

  return isShown ? (
    <div className={classes.container}>
      <div className={classes.cup} />
      <div className={classes.saucer} />
    </div>
  ) : null;
};
