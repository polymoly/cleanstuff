import { useState } from "react";
import useStyles from "./style";

interface MoreProps {
  isForward?: boolean;
  onJump?: (page?: number) => void;
}

const More = ({ isForward, onJump }: MoreProps) => {
  const classes = useStyles();
  const [isHover, setIsHover] = useState<boolean>(false);

  const onEnter = () => {
    setIsHover(true);
  };

  const onLeave = () => {
    setIsHover(false);
  };

  return (
    <div className={classes.more} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {isHover ? (
        <div className={classes.moreSwitcher} onClick={() => onJump?.(5)}>
          {isForward ? ">>" : "<<"}
        </div>
      ) : (
        <div className={classes.moreItem}>{"..."}</div>
      )}
    </div>
  );
};

export { More };
