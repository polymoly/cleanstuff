import { motion } from "framer-motion";
import { memo } from "react";
import { PreviewProps } from "../../utility/types";
import useStyles from "./style";

export const Preview = memo(
  ({ currentImage, rotate, zoom, placeholder }: PreviewProps) => {
    const classes = useStyles({ rotate } as any);

    return (
      <motion.div
        className={classes.imagePreview}
        animate={{
          rotateZ: rotate,
          scale: zoom,
          transformOrigin: "center",
          transition: {
            type: "tween",
            ease: "easeInOut",
          },
        }}
      >
        <motion.div className={classes.wrapper}>
          {currentImage && (
            <motion.img
              src={currentImage}
              alt={currentImage}
              className={classes.previewImage}
              onContextMenu={(e) => e.preventDefault()}
              drag={zoom === 1}
              dragConstraints={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          )}
          {!currentImage && (
            <div className={classes.placeholder}>
              {placeholder ? placeholder : "تصویری یافت نشد"}
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  }
);
