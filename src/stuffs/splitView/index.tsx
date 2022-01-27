import classNames from "classnames";
import React, {
  ReactElement,
  ReactNode,
  Children,
  useState,
  useEffect,
  useRef,
  Fragment,
} from "react";
import { View } from "reactjs-view";
import { getSize } from "./helper";
import { useStyles } from "./style";

export type Size = string | number;

type Pane<S> = ReactElement<S>;

interface PaneProps {
  children: ReactNode;
  portion?: number;
  minSize?: Size;
}

interface SplitViewProps {
  children: [Pane<PaneProps>, Pane<PaneProps>];
}

const RESIZER_SIZE = 4;
export const DEFAULT_MIN_SIZE = 50;

const SplitView = ({ children }: SplitViewProps) => {
  const classes = useStyles();
  const [isResizerGrab, setIsResizerGrab] = useState<boolean>(false);
  const [paneSize, setPaneSize] = useState<[number?, number?]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const paneProps = Children.map(children, (child) => child.props);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const discard = () => setIsResizerGrab(false);

    const move = (event: MouseEvent) => {
      event.preventDefault();
      const { clientY } = event;
      if (!isResizerGrab || !containerRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const min =
        paneProps?.[paneProps.length - 1]?.minSize || DEFAULT_MIN_SIZE;

      const size = clientY - top + RESIZER_SIZE + (getSize(height, min) || 0);

      if (height <= size) {
        return;
      }

      setPaneSize([clientY - top, height - (clientY - top)]);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", discard);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", discard);
    };
  }, [isResizerGrab, containerRef, paneProps]);

  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setIsResizerGrab(true);
  };

  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setIsResizerGrab(false);
  };

  return (
    <View
      ref={containerRef}
      className={classes.splitContainer}
      onMouseUp={() => setIsResizerGrab(false)}
      style={{ cursor: isResizerGrab ? "row-resize" : "default" }}
    >
      {paneProps.map(({ children, minSize, portion }, index) => (
        <Fragment key={index}>
          <View
            className={classes.pane}
            style={{
              height: paneSize?.[index],
              minHeight: minSize || DEFAULT_MIN_SIZE,
              flexGrow: portion || 1,
            }}
          >
            {children}
          </View>
          {index === 0 && (
            <View
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
    </View>
  );
};

SplitView.Pane = (_props: PaneProps) => null;

export { SplitView };
