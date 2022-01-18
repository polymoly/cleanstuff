import {
  createRef,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { View } from "reactjs-view";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";

interface InfinitePagerProps<S> {
  data: Array<S>;
  children: (item: S, index: number) => ReactNode;
  itemSize: number;
  total: number;
  threshold?: number;
  mode?: "intersecting" | "scrolling";
  width: number;
  height: number;
  next: () => void;
}

export const InfinitePager = <S extends object>({
  data,
  children,
  itemSize,
  threshold = 1,
  next,
  total,
  mode = "scrolling",
  width,
  height,
}: InfinitePagerProps<S>) => {
  const [isReached, setIsReached] = useState<boolean>(false);

  const refs = useMemo(() => {
    return Array.from({ length: data.length }, () =>
      createRef<HTMLDivElement>()
    );
  }, [data]);

  useEffect(() => {
    if (mode === "scrolling") return;

    const thresholdHeight = (data.length - 1) * threshold;
    const target = Math.floor(thresholdHeight);
    const remains = thresholdHeight - target;
    const intersected = refs[target];

    if (!intersected.current) return;

    const element = intersected.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          next();
          observer.unobserve(element);
        }
      },
      {
        threshold: remains || 0,
      }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [itemSize, data, refs, threshold, next, total, mode]);

  const scroll = useCallback(
    (scrollOffset: number) => {
      if (isReached || mode === "intersecting") return;
      const size = data.length * itemSize;

      if (scrollOffset + height >= size * threshold) {
        setIsReached(scrollOffset >= size * threshold);
        next();
      }
    },
    [data, height, isReached, itemSize, mode, next, threshold]
  );

  const Row = ({ index, style, data }: ListChildComponentProps<Array<S>>) => (
    <View key={index} ref={refs[index]} style={style}>
      {children(data[index], index)}
    </View>
  );

  const overscanCount = useMemo(() => {
    const count = data.length - Math.ceil(height / itemSize);
    if (count < 0) {
      return 0;
    }
    return count;
  }, [data, height, itemSize]);

  return (
    <List
      height={height}
      itemCount={data.length}
      itemSize={itemSize}
      width={width}
      itemData={data}
      overscanCount={mode === "intersecting" ? overscanCount : 5}
      onScroll={({ scrollOffset }) => scroll(scrollOffset)}
    >
      {Row}
    </List>
  );
};
