import React, { ReactNode, useCallback, useMemo, useState } from "react";
import useStyles from "./style";

interface InfinitePagerProps<S> {
  data: Array<S>;
  children: (item: S, index: number) => ReactNode;
  itemSize: number;
  threshold?: number;
  total: number;
  width: number;
  height: number;
  next: () => void;
  loader?: ReactNode;
}

export const InfinitePager = <S extends object>({
  data,
  children,
  itemSize,
  threshold = 1,
  total,
  next,
  width,
  height,
  loader,
}: InfinitePagerProps<S>) => {
  const [storedSize, setStoredSize] = useState<number>(0);
  const classes = useStyles({ width, height, itemSize, theme: {} });

  const hasMore = useMemo(() => {
    return total > data?.length;
  }, [data, total]);

  const scroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const offset = event.currentTarget.scrollTop;
      const size = data.length * itemSize;
      if (storedSize === size) return;

      if (offset + height >= size * threshold) {
        setStoredSize(size);
        next();
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, height, storedSize, itemSize, total, threshold]
  );

  return (
    <div className={classes.scrollContainer} onScroll={scroll}>
      {data.map((item, index) => (
        <div key={index} className={classes.item}>
          {children(item, index)}
        </div>
      ))}
      {hasMore && loader && <div className={classes.loader}>{loader}</div>}
    </div>
  );
};
