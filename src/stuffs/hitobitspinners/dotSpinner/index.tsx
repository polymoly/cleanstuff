import { useStyles } from "./style";
import "./style";

interface DotSpinnerProps {
  size?: number;
  space?: number;
  color?: string;
  isLoading?: boolean;
}

export const DotSpinner = ({
  color = "#222",
  isLoading,
  size = 10,
  space = 4,
}: DotSpinnerProps) => {
  const classes = useStyles({ color, size, space } as any);
  return isLoading ? (
    <div className={classes.container}>
      {Array.from(Array(3).keys()).map((_, i) => (
        <div key={i} className={classes.dot} />
      ))}
    </div>
  ) : null;
};
