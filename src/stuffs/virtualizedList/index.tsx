import { ReactNode, memo, Key, useState } from "react";
import {
  FixedSizeList as List,
  ListChildComponentProps,
  areEqual,
} from "react-window";
import { View } from "reactjs-view";

interface VirtualizedListProps<T> {
  list: T[];
  children: (props: T) => ReactNode;
  width: number | string;
  itemSize: number;
  direction?: "rtl" | "ltr";
  itemKey?: keyof T;
  canFetchNextPage?: boolean;
  visibleItemsCount?: number;
}

export function VirtualizedList<T extends any>({
  list,
  children,
  width,
  itemSize,
  direction = "rtl",
  itemKey,
  visibleItemsCount = 10,
}: VirtualizedListProps<T>) {
  const [isForwardScrolling, setIsForwardScrolling] = useState<boolean>(true);

  const Row = memo(
    ({ style, index, data }: ListChildComponentProps<Array<T>>) => (
      <View style={style}>{children(data[index])}</View>
    ),
    areEqual
  );

  return (
    <List
      height={itemSize * visibleItemsCount}
      overscanCount={5}
      itemCount={list?.length}
      itemSize={itemSize}
      width={width}
      itemData={list}
      onItemsRendered={({ visibleStopIndex }) => {
        if (!isForwardScrolling) return;

        if (visibleStopIndex === list?.length - 1) {
          console.log("visible");
        }
      }}
      onScroll={({ scrollDirection, scrollOffset }) => {
        if (scrollDirection === "backward") {
          setIsForwardScrolling(false);
          return;
        }
        setIsForwardScrolling(true);
      }}
      direction={direction}
      itemKey={(index, data) =>
        (itemKey ? data[index]?.[itemKey] || index : index) as Key
      }
    >
      {Row}
    </List>
  );
}
