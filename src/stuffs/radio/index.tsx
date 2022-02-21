import { createUseStyles } from "react-jss";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const useStyle = createUseStyles({
  radioWrapper: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    border: [2, "solid", "teal"],
    display: "grid",
    placeItems: "center",
  },
  ball: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    backgroundColor: "teal",
  },
});

export const Radio = () => {
  const classes = useStyle();
  const [checked, setChecked] = useState<boolean>(false);
  console.log({ checked });

  return (
    <div className={classes.radioWrapper}>
      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                type: "keyframes",
                duration: 0.1,
                ease: "easeInOut",
              },
            }}
            exit={{ scale: 0, opacity: 0 }}
            className={classes.ball}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
