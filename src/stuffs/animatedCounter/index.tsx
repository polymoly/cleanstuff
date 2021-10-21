import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useCycle, MotionValue } from "framer-motion";
import { AnimatedCounterProps, defaultStyle } from "./types";
import { variants } from "./variants";
import useStyles from "./style";

export const AnimatedCounter = ({
  count,
  style = defaultStyle,
  duration = 0.3,
  direction = "downwards",
}: AnimatedCounterProps) => {
  const [counter, onChangeCounter] = useCycle(count);
  const [counterSize, setCounterSize] = useState<number>(0);
  const classes = useStyles({ style, counterSize, duration, theme: {} });
  const motionRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!motionRef.current) return;
    const node = motionRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setCounterSize(entry.borderBoxSize[0]?.inlineSize);
      }
    });
    resizeObserver.observe(node, { box: "border-box" });

    return () => resizeObserver.unobserve(node);
  }, [counter, count]);

  useEffect(() => {
    onChangeCounter();

    return () => {
      const motionSubscriber = new MotionValue(counter);
      motionSubscriber.onChange(onChangeCounter);
      motionSubscriber.destroy();
    };
  }, [counter, count, onChangeCounter]);

  return (
    <div className={classes.counterContainer}>
      <AnimatePresence initial={false}>
        <motion.span
          ref={motionRef}
          key={counter}
          exit={"exit"}
          initial={"initial"}
          animate={"animated"}
          variants={variants}
          transition={{
            type: "keyframes",
            easings: ["easeIn", "easeOut"],
            duration,
          }}
          custom={{ style, direction }}
        >
          {counter}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
