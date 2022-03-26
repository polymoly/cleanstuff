import React, { useEffect, useRef, useState } from "react";
import { useStyle } from "./style";

export const RangeSlider = () => {
  const classes = useStyle();
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const handlerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const onMouseDown = () => {
    setIsGrabbing(true);
  };

  const onMouseUp = () => {
    setIsGrabbing(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const up = () => {
      setIsGrabbing(false);
    };

    const move = (e: MouseEvent) => {
      if (!isGrabbing || !handlerRef.current) return;
      e.preventDefault();
      const { width, x } = handlerRef.current.getBoundingClientRect();
      const clientX = e.clientX;
      const offset = width + x - 10;
      const diff = clientX - x;
      const fit = width - 10;
      const current = clientX <= x ? 0 : clientX >= offset ? fit : diff;
      animationRef.current = requestAnimationFrame(() => setProgress(current));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  });

  return (
    <div className={classes.slider} ref={handlerRef}>
      <div
        className={classes.handler}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        style={{ left: progress }}
      />
    </div>
  );
};
