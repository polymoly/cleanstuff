import { createElement, forwardRef, ReactNode } from "react";

type Variant =
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "article"
  | "p"
  | "main"
  | "section";

interface VariantTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className"> {
  variant?: Variant;
  onPress?: (e?: any) => void;
  className?: string;
}

export const VariantText = forwardRef(
  (
    { variant = "div", children, onPress, ...rest }: VariantTextProps,
    ref: any
  ) => {
    const Element = createElement(variant, {
      ref,
      children,
      onClick: onPress,
      ...rest,
    });

    return Element;
  }
);
