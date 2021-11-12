import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { OverlayMenu, OverlayMenuProps } from "../../types";
import useStyles from "./style";
import classnames from "classnames";
import { useShortCut } from "../../hooks/useShortcut";
import { ShortcutRender } from "./shortcutRender";

interface MenuItemProps extends OverlayMenu {
  className?: string;
  style?: CSSProperties;
  showShortcut?: OverlayMenuProps["showShortcut"];
  isVisible?: boolean;
}

export const MenuItem = ({
  title,
  action,
  disabled,
  shortcut,
  className,
  style,
  showShortcut,
  isVisible,
}: MenuItemProps) => {
  const classes = useStyles();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const onClickMenuItem = () => {
    action?.();
  };

  useShortCut(shortcut, onClickMenuItem, isVisible);

  const onEnter = () => {
    setIsHovered(true);
  };
  const onLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onClick={action}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={classnames(
        classes.menuItem,
        action && classes.hasAction,
        isHovered && classes.hover,
        className
      )}
      style={style}
    >
      {title}
      <ShortcutRender {...{ shortcut, showShortcut }} />
    </div>
  );
};
