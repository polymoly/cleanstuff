import { useStyles } from "./style";
import "./style";

interface LabelLoaderProps {
  count?: number;
  width?: number;
  height?: number;
  space?: number;
  labelWidth?: number;
  labelHeight?: number;
  inline?: boolean;
}

interface LabelSkeletonProps extends LabelLoaderProps {
  children: JSX.Element;
  isLoading: boolean;
}

const LabelLoader = ({
  count = 1,
  height,
  space,
  width,
  inline = false,
}: LabelLoaderProps) => {
  const classes = useStyles({ height, space, width, inline } as any);

  return (
    <div className={classes.container}>
      {Array.from({ length: count }, (_, i) => i + 1).map((c) => (
        <div key={c} className={classes.labelWrapper}>
          <div className={classes.label} />
          <div className={classes.loader} />
        </div>
      ))}
    </div>
  );
};

export const LabelSkeleton = ({
  children,
  isLoading,
  ...rest
}: LabelSkeletonProps) => {
  return <>{isLoading ? <LabelLoader {...rest} /> : children}</>;
};
