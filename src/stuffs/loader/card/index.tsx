import { useStyles } from "./style";
import "./style";

interface CardLoaderProps {
  width?: number;
  height?: number;
  space?: number;
}

interface CardSkeletonProps extends CardLoaderProps {
  children: JSX.Element;
  isLoading: boolean;
}

const CardLoader = ({ height, space, width }: CardLoaderProps) => {
  const classes = useStyles({ height, space, width } as any);

  return (
    <div className={classes.container}>
      {Array.from({ length: 1 }, (_, i) => i + 1).map((c) => (
        <div key={c} className={classes.cardWrapper}>
          <div className={classes.card} />
          <div className={classes.loader} />
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton = ({
  children,
  isLoading,
  ...rest
}: CardSkeletonProps) => {
  return <>{isLoading ? <CardLoader {...rest} /> : children}</>;
};
