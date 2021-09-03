import { useConnection } from "./useConnection";
import { createPortal } from "react-dom";
import { ReactNode } from "react";
import classnames from "classnames";
import useStyles from "./style";

interface BackdropProps {
  content?: string | ReactNode | ReactNode[];
  mask?: boolean;
  visible?: boolean;
}

export const Backdrop = ({
  content,
  mask = true,
  visible = true,
}: BackdropProps) => {
  const classes = useStyles();
  const isOnline = useConnection();

  return !isOnline && visible
    ? createPortal(
        <div className={classnames(classes.backdrop, mask && classes.mask)}>
          {content ? content : "Your connection is lost"}
        </div>,
        document.body
      )
    : null;
};
