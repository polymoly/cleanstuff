import { useStyles } from "./style";
import "./style";

interface CircleSpinnerProps {
  color?: string;
  size?: number;
  isLoading?: boolean;
  strokeWidth?: number;
}

export const CircleSpinner = ({
  color = "#222",
  isLoading,
  size = 40,
  strokeWidth = 4,
}: CircleSpinnerProps) => {
  const classes = useStyles({ color, size } as any);
  return isLoading ? (
    <div className={classes.loader}>
      <svg className={classes.circular} viewBox="25 25 50 50">
        <circle
          className={classes.path}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth={strokeWidth}
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  ) : null;
};
