import { ReactNode } from "react";
import { CloseIcon } from "./closeIcon";
import classes from "./title.module.scss";

interface TitleProps {
  closable?: boolean;
  closeIcon?: ReactNode;
  children: ReactNode;
  onClose?: () => void;
}

export const Title = ({
  children,
  closable,
  closeIcon,
  onClose,
}: TitleProps) => {
  const Icon = closeIcon ? (
    closeIcon
  ) : (
    <span className={classes.icon} onClick={onClose}>
      <CloseIcon />
    </span>
  );

  return (
    <div className={classes.title}>
      {closable && Icon}
      {children}
    </div>
  );
};
