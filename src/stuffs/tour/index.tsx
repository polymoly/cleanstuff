import { ReactNode, useEffect, useState } from "react";
import { useKeyPressed } from "../hooks/useKeyPressed";
import useStyles from "./style";

type Item = { id: string; content: string | ReactNode };

interface TourProps {
  items: Item[];
}

const useTour = (targets: Item[]) => {
  const [currentTour, setCurrentTour] = useState<Item>(targets[0]);
  const [targetCoords, setTargetCoords] = useState<DOMRect>();

  const nextTour = () => {
    const currentIndex = targets?.findIndex(({ id }) => id === currentTour?.id);
    const nextTarget = targets[currentIndex + 1];
    if (nextTarget) {
      setCurrentTour(nextTarget);
    }
  };

  const previousTour = () => {
    const currentIndex = targets?.findIndex(({ id }) => id === currentTour?.id);
    const previousTarget = targets[currentIndex - 1];
    if (previousTarget) {
      setCurrentTour(previousTarget);
    }
  };

  useEffect(() => {
    if (typeof document === "undefined") return;

    const node = document.getElementById(currentTour?.id);

    if (node) {
      const coords = node.getBoundingClientRect();
      setTargetCoords(coords);
    }
  }, [currentTour]);

  return {
    currentTour,
    targetCoords,
    nextTour,
    previousTour,
  };
};

export const Tour = ({ items }: TourProps) => {
  const classes = useStyles();
  const [skip, setSkip] = useState<boolean>(false);
  const { currentTour, nextTour, previousTour, targetCoords } = useTour(items);

  const tourOver = () => {
    setSkip(true);
  };

  const isFirst = () => {
    return currentTour?.id === items[0]?.id;
  };
  const isLast = () => {
    return currentTour?.id === items[items?.length - 1]?.id;
  };

  useKeyPressed("ArrowRight", () => nextTour());
  useKeyPressed("ArrowLeft", () => previousTour());
  useKeyPressed("Escape", () => tourOver());

  return !skip ? (
    <div
      style={{
        left: (targetCoords?.left || 0) + 24,
        top: (targetCoords?.bottom || 0) + 8,
      }}
      className={classes.tourContainer}
    >
      {currentTour?.content}
      <div>
        {!isFirst() && <button onClick={() => previousTour()}>previous</button>}
        <button onClick={() => (isLast() ? tourOver() : nextTour())}>
          {isLast() ? "end" : "next"}
        </button>
      </div>
    </div>
  ) : null;
};
