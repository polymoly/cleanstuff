import React, {
  Children,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SlideProps {
  children: ReactNode;
}

interface SliderProps {
  children: ReactElement<SlideProps>[];
}

const Slider = ({ children }: SliderProps) => {
  const [current, setCurrent] = useState<number>(0);
  const props = Children.map(children, (child) => child.props);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        background: "#f5f5f5",
        height: 300,
        width: 400,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 10,
          fontSize: 34,
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
        onClick={() => setCurrent((prev) => prev - 400)}
      >{`<`}</div>
      <AnimatePresence initial exitBeforeEnter>
        {props.map(({ children }, index) => (
          <motion.div
            key={index}
            initial={{
              minWidth: 400,
              height: 300,
              background: "#ccc",
              borderInline: "1px solid red",
            }}
            animate={{ transform: `translateX(${-current}px)` }}
          >
            {children}
          </motion.div>
        ))}
      </AnimatePresence>
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: 10,
          fontSize: 34,
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
        onClick={() => {
          console.log(current, props.length * 400);
          setCurrent((prev) => {
            if (prev >= 400 * props.length) {
              return prev - 400 * props.length;
            }
            return prev + 400;
          });
        }}
      >{`>`}</div>
    </div>
  );
};

Slider.Slide = (_props: SlideProps) => null;

export { Slider };
