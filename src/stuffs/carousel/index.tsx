import React, { useEffect, useMemo, useState } from "react";
import { createUseStyles } from "react-jss";
import { animate, AnimatePresence, motion, useAnimation } from "framer-motion";

const useStyle = createUseStyles({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    height: 300,
    background: "transparent",
    maxWidth: 400,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
  },
  slides: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    height: 300,
    maxWidth: 400,
    overflow: "hidden",
    justifyContent: "flex-start",
  },
  item: {
    minWidth: 400,
    height: 300,
    background: "#888",
    borderInline: "1px solid red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  next: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    zIndex: 99,
  },
  previous: {
    position: "absolute",
    left: 10,
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    zIndex: 99,
  },
  dots: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 999,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginInline: 2,
    cursor: "pointer",
  },
});

const data = Array.from({ length: 20 }, (_, i) => {
  return {
    id: i,
    title: `title-${i}`,
  };
});

export const Carousel = () => {
  const classes = useStyle();
  const [current, setCurrent] = useState<number>(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.mount();
  }, []);

  const len = useMemo(() => data?.length, []);

  const slicedData = useMemo(() => {
    if (current === 0) {
      const last = data.filter((_item, index) => index === data.length - 1)[0];
      return [last, ...data.slice(0, current + 2)];
    }
    if (current === len - 1) {
      const start = data.filter((_item, index) => index === 0)[0];
      return [...data.slice(current - 1, len), start];
    }
    return data.slice(current - 1, current + 2);
  }, [current, len]);

  const onNext = async () => {
    await controls.start({
      x: -400,
      transition: { duration: 1.5 },
    });
    setCurrent((p) => (p < len - 1 ? p + 1 : 0));
  };

  const onPrevious = async () => {
    await controls.start({
      x: 400,
      transition: { duration: 1.5 },
    });
    setCurrent((p) => (p > 0 ? p - 1 : len - 1));
  };

  const onChangeSlide = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className={classes.container}>
      <button onClick={onPrevious} className={classes.previous}>
        {"<"}
      </button>
      <div className={classes.slides}>
        <AnimatePresence exitBeforeEnter initial>
          {slicedData.map(({ title, id }, index) => (
            <motion.div key={id} className={classes.item} animate={controls}>
              {title}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <button onClick={onNext} className={classes.next}>
        {">"}
      </button>
      <div className={classes.dots}>
        {data.map(({ id }, index) => (
          <div
            key={id}
            className={classes.dot}
            style={{ background: current === index ? "blue" : "#f5f5f5" }}
            onClick={() => onChangeSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
