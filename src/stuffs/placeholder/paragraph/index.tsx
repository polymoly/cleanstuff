import { makeArray } from "../utils/makeArray";
import classnames from "classnames";
import useStyles from "./style";
import { ParagraphProps, Animation, Show } from "../types";

interface ParagraphHolderProps<S> extends ParagraphProps {
  animation?: Animation;
  isShown?: Show<S>;
}

export const ParagraphHolder = <S extends any>({
  cutEndofLine = true,
  rows = 3,
  width,
  height,
  space,
  isShown = true,
  animation,
}: ParagraphHolderProps<S>) => {
  const classes = useStyles({ width, height, space } as any);

  return isShown ? (
    <div className={classes.container}>
      {makeArray(rows).map((row, index, array) => (
        <div
          key={row}
          className={classnames(
            classes.row,
            index !== array.length - 1 && classes.margin,
            index === array.length - 1 && cutEndofLine && classes.cut
          )}
        ></div>
      ))}
    </div>
  ) : null;
};
