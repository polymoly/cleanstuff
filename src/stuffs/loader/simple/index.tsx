import { useCallback } from "react";
import classnames from "classnames";
import { useStyles } from "./style";
import "./style";

interface SimpleLoaderProps {
  count?: number;
  width?: number;
  height?: number;
  space?: number;
  paragraph?: boolean;
  inline?: boolean;
}

interface SimpleSkeletonProps extends SimpleLoaderProps {
  children: JSX.Element;
  isLoading: boolean;
}

const SimpleLoader = ({
  count = 1,
  height,
  space,
  width,
  paragraph,
  inline,
}: SimpleLoaderProps) => {
  const classes = useStyles({ height, space, width, inline } as any);

  const calc = useCallback(
    (cur: number, list: number[]) =>
      count > 1 && paragraph && !inline && cur === list.length,
    [count, paragraph, inline]
  );

  return (
    <div className={classes.container}>
      {Array.from({ length: count }, (_, i) => i + 1).map((c, _, list) => (
        <div
          key={c}
          className={classnames(classes.loader, calc(c, list) && classes.last)}
        />
      ))}
    </div>
  );
};

export const SimpleSkeleton = ({
  children,
  isLoading,
  ...rest
}: SimpleSkeletonProps) => {
  return <>{isLoading ? <SimpleLoader {...rest} /> : children}</>;
};
