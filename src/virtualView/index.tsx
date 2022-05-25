import React, {
  Key,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  container: {
    overflowY: "auto",
    overflowX: "hidden",
    display: "block",
    position: "relative",
  },
  list: {
    position: "absolute",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
    padding: 0,
    margin: 0,
    left: 0,
  },
  item: {
    width: "100%",
    position: "absolute",
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: [1, "solid", "#f1f1f1"],
    overflow: "hidden",
  },
});

interface VirtualViewProps<T> {
  data: T[];
  renderItem: (item: T, index: number, isScrolling?: boolean) => ReactNode;
  keyExtractor?: (item: T) => Key;
  itemSize: number;
  count?: number;
  overscan?: number;
  width?: number | string;
  useIsScrolling?: boolean;
}

export const VirtualView = <T extends object>({
  data,
  itemSize,
  renderItem,
  keyExtractor,
  count = 10,
  overscan = 0,
  width = 300,
  useIsScrolling,
}: VirtualViewProps<T>) => {
  const classes = useStyle();
  const [virtualIndex, setVirtualIndex] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const scrollingTimerId = useRef<NodeJS.Timeout>();

  const onScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      if (useIsScrolling) {
        clearTimeout(scrollingTimerId.current);
        setIsScrolling(true);

        scrollingTimerId.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      }

      const scrollTop = event.currentTarget.scrollTop;
      const index = scrollTop / itemSize;
      setVirtualIndex(index);
    },
    [itemSize, useIsScrolling]
  );

  const slicedData = useMemo(() => {
    const floorIndex = Math.floor(virtualIndex);
    return data.slice(floorIndex, count + floorIndex + overscan);
  }, [count, data, virtualIndex, overscan]);

  return (
    <div
      className={classes.container}
      style={{ height: itemSize * count, width }}
      onScroll={onScroll}
    >
      <div
        className={classes.list}
        style={{
          height: itemSize * (data.length - virtualIndex),
          top: itemSize * virtualIndex,
        }}
      >
        {slicedData.map((item, index) => (
          <div
            key={keyExtractor ? keyExtractor(item) : index}
            className={classes.item}
            style={{ height: itemSize, top: itemSize * index }}
          >
            {renderItem(item, index, isScrolling)}
          </div>
        ))}
      </div>
    </div>
  );
};
