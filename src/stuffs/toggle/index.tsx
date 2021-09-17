import { useState } from "react";
import { motion } from "framer-motion";
import {
  circleVariants,
  groupVariants,
  maskCircleVariants,
  svgVariants,
} from "./variants";

export const DarkModeSwitch = () => {
  const [dark, setDark] = useState<boolean>(false);
  const create = () => {
    setDark(!dark);
  };

  return (
    <motion.svg
      variants={svgVariants}
      initial="light"
      animate={dark ? "dark" : "light"}
      onClick={() => create()}
      style={{ margin: 50 }}
      custom={"red"}
    >
      <motion.mask id="mask">
        <motion.rect
          initial={{
            x: 0,
            y: 0,
            width: "100%",
            height: "100%",
            fill: "#fff",
          }}
        ></motion.rect>
        <motion.circle
          variants={maskCircleVariants}
          initial="light"
          animate={dark ? "dark" : "light"}
        ></motion.circle>
      </motion.mask>
      <motion.circle
        variants={circleVariants}
        initial="light"
        animate={dark ? "dark" : "light"}
      ></motion.circle>
      <motion.g
        variants={groupVariants}
        initial="light"
        animate={dark ? "dark" : "light"}
      >
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </motion.g>
    </motion.svg>
  );
};
