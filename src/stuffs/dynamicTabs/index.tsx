import {
  Children,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { InternalTab } from "./internalTab";
import { createUseStyles } from "react-jss";
import { CSSProperties } from "styled-components";

export interface TabProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

interface DynamicTabsProps {
  children: ReactElement<TabProps>[];
}

const useStyle = createUseStyles({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    background: "#ccc",
    position: "relative",
    minWidth: 400,
    overflowY: "hidden",
    overflowX: "auto",
  },
  inkbar: {
    height: 3,
    backgroundColor: "blue",
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    transition: "all 250ms ease-in-out",
  },
});

type InkBar = {
  left: number;
  width: number;
};

const DynamicTabs = ({ children }: DynamicTabsProps) => {
  const classes = useStyle();
  const props = Children.map(children, (child) => child.props);
  const [tabsWidth, setTabsWidth] = useState<Record<string, number>>({});
  const [inkBarPosition, setInkBarPosition] = useState<InkBar>();
  const mountRef = useRef<boolean>(true);

  useEffect(() => {
    if (
      tabsWidth &&
      Object.keys(tabsWidth || {}).length > 0 &&
      mountRef.current
    ) {
      setInkBarPosition({ left: 0, width: tabsWidth[0] });
      mountRef.current = false;
    }
  }, [tabsWidth]);

  const sum = (p: number, q: number) => p + q;

  return (
    <div className={classes.container}>
      {props.map(({ children, ...rest }, index) => (
        <InternalTab
          key={index}
          {...rest}
          onLayout={({ width }) =>
            setTabsWidth((prev) => ({ ...prev, [index]: width }))
          }
          onPress={() => {
            const aggregation = Object.values(tabsWidth || {})
              ?.slice(0, index)
              ?.reduce(sum, 0);

            const left = index === 0 ? 0 : aggregation;

            const width = tabsWidth?.[index];

            setInkBarPosition({ left, width });
          }}
        >
          {children}
        </InternalTab>
      ))}
      <div
        className={classes.inkbar}
        style={{
          insetInlineStart: inkBarPosition?.left,
          width: inkBarPosition?.width,
        }}
      />
    </div>
  );
};

const Tab = (_props: TabProps) => null;

DynamicTabs.Tab = Tab;

export { DynamicTabs };
