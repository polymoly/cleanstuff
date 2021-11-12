import { CSSProperties, ReactNode } from "react";

export type MenuKey = string | number;
type Action = () => void;
export type Shortcut = {
  key: string;
  combination?: "ctrl" | "alt";
};
export type Trigger = "click" | "context";
export type MaxSize = [number, number];
export type Offsets = [number, number, number, number];
type Transition = "default" | "fade" | "zoom";

export type OverlayMenu = {
  key: MenuKey;
  title: string | ReactNode;
  action?: Action;
  shortcut?: Shortcut;
  disabled?: boolean;
};

export interface OverlayMenuProps {
  children: ReactNode;
  menu?: OverlayMenu[] | JSX.Element;
  menuClassName?: string;
  overlayClassName?: string;
  menuStyle?: CSSProperties;
  overlayStyle?: CSSProperties;
  trigger?: Trigger;
  showShortcut?: boolean | ((shortcut?: Shortcut) => ReactNode);
  strictBounding?: boolean;
  maxSize?: MaxSize;
  offsets?: Offsets;
  transition?: Transition;
  backdrop?: boolean;
}

export const getDefaultBounds = <T extends HTMLElement | null>(
  element: T
): DOMRect => {
  return {
    bottom: (element?.clientTop || 0) + (element?.clientHeight || 0),
    left: element?.clientLeft || 0,
    top: element?.clientTop || 0,
    width: element?.clientWidth || 0,
    height: element?.clientHeight || 0,
    x: element?.clientLeft || 0,
    y: element?.clientTop || 0,
    right: (element?.clientLeft || 0) + (element?.clientWidth || 0),
    toJSON: element?.getBoundingClientRect().toJSON(),
  };
};
