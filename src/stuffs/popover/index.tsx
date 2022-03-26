import React, { Fragment, ReactNode, RefObject, useCallback } from "react";
import { motion, AnimatePresence, usePresence, useCycle } from "framer-motion";

interface PopoverProps {
  children: ReactNode;
}

export const Popover = ({ children }: PopoverProps) => {
  const [isVisible, toggle] = useCycle(false, true);

  return (
    <Fragment key="popover">
      <AnimatePresence presenceAffectsLayout initial={false}>
        {isVisible && (
          <motion.div
            initial={{
              width: 200,
              height: 200,
              background: "teal",
              scale: 0,
              position: "fixed",
              left: 220,
              top: 20,
            }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{
              duration: 0.25,
            }}
          />
        )}
      </AnimatePresence>
      <div onClick={() => toggle()}>{children}</div>
    </Fragment>
  );
};
