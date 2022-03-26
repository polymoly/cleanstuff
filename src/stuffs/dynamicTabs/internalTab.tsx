import React, { ReactNode, useEffect, useRef } from "react";
import { createUseStyles } from "react-jss";
import { TabProps } from ".";

const useStyle = createUseStyles({
  tab: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    margin: 0,
    minWidth: 70,
  },
});

type Layout = {
  width: number;
  height: number;
};

export interface InternalTabProps extends TabProps {
  onLayout?: (layout: Layout) => void;
  onPress?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const InternalTab = ({
  children,
  onLayout,
  onPress,
  ...rest
}: InternalTabProps) => {
  const classes = useStyle();
  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tabRef?.current) return;
    const node = tabRef.current;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.target.getBoundingClientRect();
      onLayout?.({ width, height });
    });

    observer.observe(node, { box: "border-box" });

    return () => observer.unobserve(node);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabRef]);

  return (
    <div className={classes.tab} ref={tabRef} onClick={onPress} {...rest}>
      {children}
    </div>
  );
};
