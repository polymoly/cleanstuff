import { useStyles } from "./style";
import "./style";

interface BarSpinnerProps {
  size?: number;
  isLoading?: boolean;
  space?: number;
  thickness?: number;
  color?: string;
  count?: number;
}

export const BarSpinner = ({
  color = "#222",
  count = 5,
  isLoading,
  size = 15,
  space = 5,
  thickness = 5,
}: BarSpinnerProps) => {
  const classes = useStyles({ color, size, space, thickness, count } as any);

  return isLoading ? (
    <div className={classes.container}>
      {Array.from(Array(count).keys()).map((_, i) => (
        <div
          key={i}
          className={classes.bar}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  ) : null;
};
