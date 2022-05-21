import { AnimatePresence, motion, useAnimation, Variants } from "framer-motion";
import { useState } from "react";

interface ImageGroupViewProps {
  images: string[];
  defaultActiveIndex?: number;
  currentImage?: string;
  onImageChange?: () => void;
}

const variants: Variants = {
  init: {
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: 1000,
    inset: 0,
    overflow: "hidden",
    background: "#00000073",
    opacity: 0,
    scale: 0.85,
    transformOrigin: "center center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      type: "tween",
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    transition: {
      duration: 0.25,
      type: "tween",
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

export const ImageGroupView = ({
  images,
  currentImage,
  defaultActiveIndex = 0,
  onImageChange,
}: ImageGroupViewProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(
    defaultActiveIndex || 0
  );

  return (
    <div>
      <div
        style={{ width: 300, height: 300, background: "#f2f2f2" }}
        onClick={() => setOpen(true)}
      >
        <img
          src={images[defaultActiveIndex || 0]}
          alt=""
          width={300}
          height={300}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={variants}
            initial={"init"}
            animate={"open"}
            exit={"exit"}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: 60,
                width: "100%",
                zIndex: 9999,
                background: "rgba(0,0,0,0.1)",
              }}
            >
              <span style={{ color: "#fff" }} onClick={() => setOpen(false)}>
                &times;
              </span>
            </div>
            <img src={images[currentIndex]} alt="" />
            <div
              style={{
                width: 30,
                height: 30,
                background: "#444",
                color: "#fff",
                position: "absolute",
                left: 20,
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
            >
              prev
            </div>
            <div
              style={{
                width: 30,
                height: 30,
                background: "#444",
                color: "#fff",
                position: "absolute",
                right: 20,
                top: "50%",
                transform: "translateY(-50%)",
              }}
              onClick={() => setCurrentIndex((prev) => prev + 1)}
            >
              next
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
