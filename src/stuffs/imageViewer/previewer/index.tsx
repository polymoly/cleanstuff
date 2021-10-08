import { AnimatePresence, motion } from "framer-motion";
import { useFullScreenHandle, FullScreen } from "react-full-screen";
import { useCallback, useState } from "react";
import { Footer } from "./footer";
import { Preview } from "./preview";
import { Title } from "./title";
import { useKeyPressed } from "../../hooks/useKeyPressed";
import { SwitchArrow } from "./switchArrow";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { PreviewerProps } from "../utility/types";

export const Previewer = ({
  footer,
  isVisible,
  onClose,
  title,
  current,
  sources,
  onNext,
  onPrevious,
  keyboard,
  options,
  placeholder,
  counterRender,
}: PreviewerProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(current);
  const [rotate, setRotate] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const handle = useFullScreenHandle();

  const onNextIndex = useCallback(() => {
    if (currentIndex < sources?.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      onNext?.(currentIndex);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const onPreviousIndex = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      onPrevious?.(currentIndex);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const exitFullscreen = async () => {
    await handle.exit();
  };

  const onFullscreen = async () => {
    if (handle.active) {
      await exitFullscreen();
      return;
    }
    await handle.enter();
  };

  const onRotate = (isReverse?: boolean) => {
    setRotate((prev) => (isReverse ? prev - 90 : prev + 90));
  };

  const onZoom = (isReverse?: boolean) => {
    setZoom((prev) => (isReverse ? prev - 0.5 : prev + 0.5));
  };

  useKeyPressed("ArrowRight", () => keyboard && onNextIndex());

  useKeyPressed("ArrowLeft", () => keyboard && onPreviousIndex());

  useKeyPressed("F11", () => keyboard && onFullscreen());

  useKeyPressed("+", () => keyboard && onZoom());

  useKeyPressed("-", () => keyboard && zoom > 1 && onZoom(true));

  return (
    <FullScreen handle={handle}>
      <AnimatePresence exitBeforeEnter initial>
        {isVisible && (
          <motion.div
            initial={{
              left: 0,
              top: 0,
              scale: 0,
              position: "fixed",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            animate={{
              background: "rgba(80,80,80,.6)",
              scale: 1,
              transition: {
                type: "keyframes",
                easings: "easeOut",
              },
            }}
            exit={{ scale: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Title
              title={title}
              onClose={async () => {
                await exitFullscreen();
                onClose();
              }}
              onFullscreen={onFullscreen}
              onRotate={onRotate}
              onZoom={onZoom}
              zoomValue={zoom}
              currentIndex={currentIndex}
              sources={sources}
              options={options}
              counterRender={counterRender}
            />
            <SwitchArrow
              onClick={onPreviousIndex}
              disabled={currentIndex === 0}
              hide={sources?.length <= 1}
              icon={<ArrowLeftOutlined />}
              isPrevious
            />
            <Preview
              rotate={rotate}
              zoom={zoom}
              placeholder={placeholder}
              currentImage={sources[currentIndex] || sources[0]}
            />
            <SwitchArrow
              onClick={onNextIndex}
              disabled={currentIndex === sources?.length - 1}
              hide={sources?.length <= 1}
              icon={<ArrowRightOutlined />}
            />
            {footer && <Footer footer={footer} />}
          </motion.div>
        )}
      </AnimatePresence>
    </FullScreen>
  );
};
