import classNames from "classnames";
import React, {
  ReactElement,
  ReactNode,
  Children,
  useState,
  useEffect,
  useRef,
  Fragment,
  useMemo,
} from "react";
import { getSize } from "./helper";
import { useStyles } from "./style";

export type Size = string | number;

type Pane<S> = ReactElement<S>;

type PaneSize = [number?, number?];

export interface PaneProps {
  children: ReactNode;
  portion?: number;
  minSize?: Size;
}

export interface SplitViewProps {
  children: [Pane<PaneProps>, Pane<PaneProps>];
  shouldPersist?: boolean;
}

export const RESIZER_SIZE = 4;
export const MIN_SIZE = 50;

const SplitView = ({ children, shouldPersist }: SplitViewProps) => {
  const classes = useStyles();
  const [isResizerGrab, setIsResizerGrab] = useState<boolean>(false);
  const [paneSize, setPaneSize] = useState<PaneSize>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const props = Children.map(children, (child) => child.props);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const discard = () => setIsResizerGrab(false);

    const move = (event: MouseEvent) => {
      event.preventDefault();

      const { clientY } = event;

      if (!isResizerGrab || !containerRef.current) return;

      const node = containerRef.current;

      const { top, height } = node.getBoundingClientRect();

      const min = props?.[props.length - 1]?.minSize || MIN_SIZE;

      const calculateMin = getSize(height, min);

      const substracted = clientY - top;

      const topPane = substracted <= calculateMin ? calculateMin : substracted;

      const size = topPane + calculateMin;

      if (height >= size) {
        const paneArray: PaneSize = [topPane, height - topPane];
        setPaneSize(paneArray);

        if (shouldPersist) {
          localStorage.setItem("split-view", JSON.stringify(paneArray));
        }
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", discard);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", discard);
    };
  }, [isResizerGrab, containerRef, props, shouldPersist, paneSize]);

  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsResizerGrab(true);
  };

  const onMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsResizerGrab(false);
  };

  const storedPaneSize = useMemo(() => {
    const persistedPane = localStorage.getItem("split-view");

    if (persistedPane) {
      const parsedPaneSize: PaneSize = JSON.parse(persistedPane);
      return parsedPaneSize;
    }
    return paneSize;
  }, [paneSize]);

  return (
    <div
      ref={containerRef}
      className={classes.splitContainer}
      onMouseUp={() => setIsResizerGrab(false)}
      style={{ cursor: isResizerGrab ? "row-resize" : "default" }}
    >
      {props.map(({ children, minSize, portion }, index) => (
        <Fragment key={index}>
          <div
            className={classes.pane}
            style={{
              height: storedPaneSize?.[index],
              minHeight: minSize || MIN_SIZE,
              flexGrow: portion || 1,
              flexShrink: 0,
            }}
          >
            {children}
          </div>
          {index === 0 && (
            <div
              style={{ height: RESIZER_SIZE }}
              className={classNames(
                classes.resizer,
                isResizerGrab && classes.grab
              )}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};

SplitView.Pane = (_props: PaneProps) => null;

export { SplitView };
