import { useMemo, useRef } from "react";
import { IframeHTMLAttributes } from "react";
import { createPortal } from "react-dom";
import useStyles from "./style";

interface IFrameProps extends IframeHTMLAttributes<HTMLIFrameElement> {}

export const IFrame = ({ children, title, ...rest }: IFrameProps) => {
  const classes = useStyles();
  const iFrameRef = useRef<HTMLIFrameElement>(null);

  const onLoadIframe = () => {
    if (!iFrameRef.current?.contentDocument) {
      return;
    }
  };

  const node = useMemo(() => {
    return iFrameRef?.current?.contentWindow?.document?.body;
  }, []);

  return (
    <iframe
      title={title}
      ref={iFrameRef}
      sandbox="allow-scripts"
      referrerPolicy="no-referrer"
      frameBorder={0}
      onLoad={onLoadIframe}
      className={classes.iframe}
      width="50%"
      height="100%"
      {...rest}
    >
      {node && createPortal(children, node)}
    </iframe>
  );
};
