import {
  cloneElement,
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Popover } from "antd";
import { createUseStyles } from "react-jss";

interface ItemProps {
  children: JSX.Element;
  index: number;
}

interface TourProps {
  children: ReactElement<ItemProps>[];
}

type TourContextProps = {
  current: number | null;
  isLast: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onDestroy: () => void;
};

const TourContext = createContext<TourContextProps>({
  current: null,
  isLast: false,
  onNext: () => null,
  onPrevious: () => null,
  onDestroy: () => null,
});

const Tour = ({ children }: TourProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemIndexes, setItemIndexes] = useState<number[]>([]);
  const [current, setCurrent] = useState<number | null>(null);
  const mountRef = useRef<boolean>(true);

  const isLast = useMemo(() => {
    const items = itemIndexes.sort();
    const currentIndex = items.findIndex((value) => value === current);
    if (currentIndex !== -1) {
      return currentIndex === items?.length - 1;
    }
    return false;
  }, [current, itemIndexes]);

  useEffect(() => {
    if (itemIndexes.length > 0 && mountRef.current) {
      const items = itemIndexes.sort();
      setCurrent(items?.[0]);
      mountRef.current = false;
    }
  }, [itemIndexes]);

  const onNext = () => {
    const items = itemIndexes.sort();

    setCurrent((last) => {
      const lastIndex = items.findIndex((index) => index === last);
      if (lastIndex !== -1) {
        const next = items?.[lastIndex + 1];
        return next ? next : null;
      }
      return null;
    });
  };
  const onPrevious = () => {
    const items = itemIndexes.sort();

    setCurrent((last) => {
      const lastIndex = items.findIndex((index) => index === last);
      if (lastIndex !== -1) {
        const previous = items?.[lastIndex - 1];
        return previous ? previous : null;
      }
      return null;
    });
  };

  const onDestroy = () => {
    setCurrent(null);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const items = container.querySelectorAll("[data-tour-index]");

    items.forEach((item) => {
      const tourIndex = item.getAttribute("data-tour-index");

      setItemIndexes((prev) => [...prev, Number(tourIndex)]);
    });
  }, [containerRef, children]);

  return (
    <TourContext.Provider
      value={{ current, isLast, onNext, onPrevious, onDestroy }}
    >
      <div ref={containerRef}>{children}</div>
    </TourContext.Provider>
  );
};

const Item = ({ children, index }: ItemProps) => {
  const { current, onNext, onPrevious, isLast } = useContext(TourContext);
  return (
    <Popover
      arrowPointAtCenter
      destroyTooltipOnHide
      placement="bottom"
      content={
        <div style={{ maxWidth: 300 }}>
          {current}
          <button onClick={onNext}>{isLast ? "finish" : "next"}</button>
          <button onClick={onPrevious}>previous</button>
        </div>
      }
      visible={current === index}
    >
      {cloneElement(children, {
        ...children.props,
        "data-tour-index": index,
      })}
    </Popover>
  );
};

Tour.Item = Item;

export { Tour };
