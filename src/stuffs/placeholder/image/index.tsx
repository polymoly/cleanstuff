import ImageLoaded from "../img.png";
import { ImageProps, Show, Animation } from "../types";
import useStyles from "./style";

interface ImageHolderProps<S> extends ImageProps {
  animation?: Animation;
  isShown?: Show<S>;
}

export const ImageHolder = <S extends any>({
  isShown = true,
  animation,
  height,
  shape,
  width,
  withImage = true,
}: ImageHolderProps<S>) => {
  const classes = useStyles({ height, shape, width } as any);

  return isShown ? (
    <div className={classes.image}>
      {withImage && (
        <img
          className={classes.imageView}
          src={ImageLoaded}
          alt="placeholder"
        />
      )}
    </div>
  ) : null;
};
