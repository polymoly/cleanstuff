import React, { useLayoutEffect } from "react";
import { motion, usePresence } from "framer-motion";
import { NotifyProps } from ".";

interface NotifyContainerProps extends NotifyProps {
  handleClose: () => void;
}

export const NotifyContainer = ({
  handleClose,
  content,
}: NotifyContainerProps) => {
  const [isPresent, removeFromTree] = usePresence();

  useLayoutEffect(() => {
    if (!isPresent) {
      removeFromTree?.();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPresent]);

  return (
    <motion.div
      initial={{
        position: "fixed",
        top: 10,
        right: -420,
        background: "#ccc",
        width: 200,
        height: 50,
        zIndex: 9999,
        padding: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      animate={{ right: 10 }}
      exit={{ right: -420 }}
    >
      <button onClick={handleClose}>&times;</button>
      {typeof content === "string" ? <span>{content}</span> : content}
    </motion.div>
  );
};
