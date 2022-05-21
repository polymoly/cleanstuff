import {
  Key,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useStyle } from "./style";

interface FlowListProps<T> {
  /**
   * @default false
   */
  wheeling?: boolean;
  /**
   * @default true
   */
  handlers?: boolean;
  /**
   * @default false
   */
  keyboard?: boolean;
  width: number;
  itemSize: [number, number?];
  data: T[];
  keyExtractor?: (item: T) => Key;
  renderItem: (item: T, index?: number) => ReactElement<T>;
  onPress?: (item: T) => void;
  onReachEnd?: () => void;
  onReachStart?: () => void;
}

type HandlerReachType = {
  backward: boolean;
  forward: boolean;
};

export const FlowList = <T extends object>({
  width,

  handlers = true,

  wheeling = false,
  data,
  itemSize,
  renderItem,
  keyExtractor,
  keyboard,
  onPress,
  onReachEnd,
  onReachStart,
}: FlowListProps<T>) => {
  const classes = useStyle();
  const reachingRef = useRef<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [reachToHandler, setReachToHandler] = useState<HandlerReachType>({
    backward: true,
    forward: false,
  });
  const [boundary, setBoundary] = useState<number>(width);
  const [selectedItem, setSelectedItem] = useState<Key | number | undefined>(
    undefined
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.target.getBoundingClientRect().width;

      setBoundary(Math.ceil(width));
    });

    observer.observe(container);

    return () => observer.unobserve(container);
  }, [containerRef]);

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!wheeling) return;

    if (e.cancelable) {
      e.preventDefault();
    }

    const scrollLeft = e.currentTarget.scrollLeft;

    const end = scrollLeft >= itemSize[0] * data.length - boundary;
    const start = scrollLeft <= 0;

    e.currentTarget.scrollTo({
      left: scrollLeft + e.deltaY * (boundary / (itemSize[0] * 2)),
      behavior: "smooth",
    });

    if (end && scrollLeft < scrollLeft + e.deltaY) {
      if (reachingRef.current) {
        onReachEnd?.();
        setReachToHandler(() => ({ backward: false, forward: true }));
      }
      reachingRef.current = false;
      return;
    }

    if (start && scrollLeft > scrollLeft + e.deltaY) {
      if (reachingRef.current) {
        onReachStart?.();
        setReachToHandler(() => ({ forward: false, backward: true }));
      }
      reachingRef.current = false;
      return;
    }
    setReachToHandler(() => ({ backward: false, forward: false }));

    reachingRef.current = true;
  };

  const onForward = useCallback(() => {
    if (!handlers || !containerRef.current || reachToHandler.forward) return;

    const container = containerRef.current;

    const scrollLeft = container.scrollLeft;

    const step = Math.floor(boundary / 2);

    const end = scrollLeft + step >= itemSize[0] * data.length - boundary;

    container.scrollTo({
      left: scrollLeft + step,
      behavior: "smooth",
    });

    if (end) {
      if (reachingRef.current) {
        onReachEnd?.();
        setReachToHandler(() => ({ backward: false, forward: true }));
      }
      reachingRef.current = false;
      return;
    }

    setReachToHandler(() => ({ backward: false, forward: false }));

    reachingRef.current = true;
  }, [boundary, data, handlers, itemSize, onReachEnd, reachToHandler]);

  const onBackward = useCallback(() => {
    if (!handlers || !containerRef.current || reachToHandler.backward) return;

    const container = containerRef.current;

    const scrollLeft = container.scrollLeft;

    const step = Math.floor(boundary / 2);

    const start = scrollLeft - step <= 0;

    container.scrollTo({
      left: scrollLeft - step,
      behavior: "smooth",
    });

    if (start) {
      if (reachingRef.current) {
        onReachStart?.();
        setReachToHandler(() => ({ forward: false, backward: true }));
      }
      reachingRef.current = false;
      return;
    }

    setReachToHandler(() => ({ backward: false, forward: false }));

    reachingRef.current = true;
  }, [boundary, handlers, onReachStart, reachToHandler]);

  useEffect(() => {
    if (!keyboard || !handlers || typeof window === "undefined") return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onForward();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onBackward();
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [handlers, keyboard, onBackward, onForward]);

  return (
    <div className={classes.wrapper}>
      {handlers && (
        <div
          onClick={onBackward}
          className={classes.arrow}
          style={{
            marginInlineEnd: 4,
            visibility: reachToHandler.backward ? "hidden" : "visible",
          }}
        >
          {`<-`}
        </div>
      )}
      <div
        className={classes.container}
        style={{ width }}
        onWheel={onWheel}
        ref={containerRef}
      >
        {data.map((item, index) => (
          <div
            key={keyExtractor?.(item) || index}
            className={classes.flowItem}
            style={{
              minWidth: itemSize[0] || "fit-content",
              height: itemSize[1] || "fit-content",
              backgroundColor:
                selectedItem === (keyExtractor?.(item) || index)
                  ? "#f8f8f8"
                  : "transparent",
            }}
            onClick={() => {
              setSelectedItem(keyExtractor?.(item) || index);
              onPress?.(item);
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
      {handlers && (
        <div
          onClick={onForward}
          className={classes.arrow}
          style={{
            marginInlineStart: 4,
            visibility: reachToHandler.forward ? "hidden" : "visible",
          }}
        >
          {`->`}
        </div>
      )}
    </div>
  );
};
