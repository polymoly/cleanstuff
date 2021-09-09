import { useCallback } from "react";
import classnames from "classnames";
import { useStyles } from "./style";
import "./style";

interface CircularLoaderProps {
  count?: number;
  width?: number;
  height?: number;
  space?: number;
  paragraph?: boolean;
  inline?: boolean;
}

interface CircularSkeletonProps extends CircularLoaderProps {
  children: JSX.Element;
  isLoading: boolean;
}

const CircularLoader = ({
  count = 1,
  height,
  space,
  width,
  paragraph,
  inline,
}: CircularLoaderProps) => {
  const classes = useStyles({ height, space, width, inline } as any);

  return (
    <div className={classes.loader}>
      <div className={classes.inner} />
    </div>
  );
};

export const CircularSkeleton = ({
  children,
  isLoading,
  ...rest
}: CircularSkeletonProps) => {
  return <>{isLoading ? <CircularLoader {...rest} /> : children}</>;
};
