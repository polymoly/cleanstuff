import { useStyles } from "./style";
import "./style";

interface AvatarLoaderProps {
  count?: number;
  width?: number;
  height?: number;
  space?: number;
  avatar?: "circle" | "square" | "doughnut";
  inline?: boolean;
}

interface AvatarSkeletonProps extends AvatarLoaderProps {
  children: JSX.Element;
  isLoading: boolean;
}

const AvatarLoader = ({
  count = 1,
  height,
  space,
  width,
  avatar = "circle",
  inline = false,
}: AvatarLoaderProps) => {
  const classes = useStyles({ height, space, width, avatar, inline } as any);

  return (
    <div className={classes.container}>
      {Array.from({ length: count }, (_, i) => i + 1).map((c) => (
        <div key={c} className={classes.avatarWrapper}>
          <div className={classes.avatar} />
          <div className={classes.loader} />
        </div>
      ))}
    </div>
  );
};

export const AvatarSkeleton = ({
  children,
  isLoading,
  ...rest
}: AvatarSkeletonProps) => {
  return <>{isLoading ? <AvatarLoader {...rest} /> : children}</>;
};
