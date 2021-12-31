import React, {
  createRef,
  Key,
  ReactNode,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ScrollView, View } from "reactjs-view";
import { useScrollDirection } from "react-use-scroll-direction";
import { composeRef } from "reactjs-view-core";

interface InfiniteViewProps<T> {
  children: (item: T, index?: number) => ReactNode;
  data: T[];
  itemKey?: keyof T;
  width?: number | string;
  height?: number | string;
  itemSize?: number;
  hasMore?: boolean;
  loader?: ReactNode;
  next: () => void;
}

export const InfiniteView = <S extends any>({
  children,
  data,
  itemKey,
  next,
  hasMore,
  itemSize,
  width,
  height,
  loader,
}: InfiniteViewProps<S>) => {
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef<number>(0);

  const refs = useMemo(() => {
    return Array.from({ length: data.length }, () =>
      createRef<HTMLDivElement>()
    );
  }, [data]);

  useLayoutEffect(() => {
    if (!refs || refs.length === 0 || !isScrollingDown) return;
    const nodeRef = refs[data.length - 1];

    if (!nodeRef?.current) return;

    const node = nodeRef?.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          next();
        }
      },
      {
        root: root.current,
      }
    );
    observer.observe(node);

    return () => observer.unobserve(node);
  }, [data, hasMore, isScrollingDown, next, refs]);

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setIsScrollingDown(scrollTop > lastScrollTop.current);
    lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
  };

  return (
    <View
      ref={root}
      style={{
        flex: 1,
        width: width,
        height: height,
        border: "1px solid #ccc",
        overflowY: "auto",
      }}
      onScroll={onScroll}
    >
      {data.map((item, index) => (
        <View
          key={(itemKey ? item?.[itemKey] || index : index) as Key}
          ref={refs?.[index]}
          style={{ minHeight: itemSize }}
        >
          {children(item, index)}
        </View>
      ))}
      <View
        style={{
          width: "100%",
          minHeight: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        loading...
      </View>
    </View>
  );
};
