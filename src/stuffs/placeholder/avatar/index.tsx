import { AvatarProps, Show, Animation } from "../types";
import useStyles from "./style";

interface AvatarHolderProps<S> extends AvatarProps {
  animation?: Animation;
  isShown?: Show<S>;
}

export const AvatarHolder = <S extends any>({
  animation,
  isShown = true,
  shape,
  size,
}: AvatarHolderProps<S>) => {
  const classes = useStyles({ shape, size } as any);

  return isShown ? <div className={classes.avatar} /> : null;
};
