import { motion, useCycle } from "framer-motion";
import { createPortal } from "react-dom";
import { useKeyPressed } from "../hooks/useKeyPressed";
import { Previewer } from "./previewer";
import classnames from "classnames";
import useStyles from "./style";
import { ImageViewerProps } from "./utility/types";

export const ImageViewer = ({
  title,
  footer,
  getContainer,
  sources,
  keyboard,
  width,
  height,
  currentIndex = 0,
  onNext,
  onPrevious,
  options,
  placeholder,
  onVisibleChange,
  counterRender,
  alt,
  className,
  style,
}: ImageViewerProps) => {
  const [isVisible, onCycle] = useCycle(false, true);
  const classes = useStyles({ width, height } as any);

  const visibleChange = () => {
    onVisibleChange?.(!isVisible);
    onCycle();
  };

  useKeyPressed("Escape", () => {
    if (isVisible && keyboard) {
      visibleChange();
    }
  });

  const PreviewerNode = (
    <Previewer
      isVisible={isVisible}
      footer={footer}
      title={title}
      onClose={visibleChange}
      current={currentIndex}
      sources={sources}
      onNext={onNext}
      onPrevious={onPrevious}
      keyboard={keyboard}
      options={options}
      placeholder={placeholder}
      counterRender={counterRender}
    />
  );

  return (
    <motion.div
      className={classnames(classes.container, className)}
      style={style}
    >
      <motion.img
        className={classes.cardImage}
        src={sources?.[currentIndex] || sources?.[0]}
        alt={alt}
        width={width || "100%"}
        height={height || "100%"}
        onClick={visibleChange}
      />
      {getContainer ? createPortal(PreviewerNode, getContainer) : PreviewerNode}
    </motion.div>
  );
};
