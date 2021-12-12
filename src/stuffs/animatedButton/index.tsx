import { useRef } from "react";
import { useStyles } from "./style";
import { useRipple } from "./useRipple";

export const AnimatedButton = () => {
  const classes = useStyles();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const { createRipple, rippleClass } = useRipple(buttonRef, spanRef);

  return (
    <button onClick={createRipple} ref={buttonRef} className={classes.button}>
      <span ref={spanRef} className={rippleClass} />
      click me
    </button>
  );
};
