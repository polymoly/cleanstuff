import { CSSProperties, ReactNode } from "react";

type Default = string | number;

type Node = ReactNode | (() => ReactNode);

type TagScrollContainer = boolean | Node;

type Clear = boolean | Node;

export type Value = ListItem | ListItem[];

type Type = "normal" | "tag";

type ListItem = {
  key: Default;
  value: Default;
  disabled?: boolean;
  userAdded?: boolean;
};

export interface SelectorProps {
  list: ListItem[];
  isMultiple?: boolean;
  hasFilter?: boolean;
  hasSearch?: boolean;
  hasTagScrollContainer?: TagScrollContainer;
  listItemPrefix?: Node;
  listItemSuffix?: Node;
  type?: Type;
  allowClear?: Clear;
  value?: Value;
  onChangeValue?: (value?: SelectorProps["value"]) => void;
  onClear?: (removed?: SelectorProps["value"]) => void;
  onSearch?: (term?: Default) => void;
  tagRender?: (tag?: ListItem) => ReactNode;
  onClick?: (item?: ListItem) => void;
  onSelect?: (list?: SelectorProps["value"]) => void;
  className?: string;
  overlayClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  style?: CSSProperties;
  overlayStyle?: CSSProperties;
  itemStyle?: CSSProperties;
  activeItemStyle?: CSSProperties;
  suffix?: Node;
  prefix?: Node;
  footer?: Node;
  virtual?: boolean;
}

export interface OverlayProps {
  list: SelectorProps["list"];
}

export interface ItemProps extends Omit<ListItem, "key"> {
  onClick?: () => void;
  onSearch?: () => void;
  onChange?: () => void;
}

export type ItemEvents = [
  (value?: Value) => void,
  (list?: Value) => void,
  (item?: ListItem) => void
];
