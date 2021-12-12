import { CSSProperties, ReactNode, useCallback, useState } from "react";
import classnames from "classnames";
import { useStyles } from "./style";

type Pixel = number | string;
export type Unit = "px" | "rem" | "em";

type Interaction = {
  isHovered?: boolean;
  isFocused?: boolean;
};

type Size =
  | "m"
  | "mt"
  | "mr"
  | "mb"
  | "ml"
  | "mx"
  | "my"
  | "p"
  | "pr"
  | "pb"
  | "pl"
  | "pt"
  | "px"
  | "py";

export type Spacing = {
  [key in Size]?: Pixel;
};

type ClassNameInstance = string | undefined | null | false | "";

type ClassNameReturnType = ClassNameInstance | ClassNameInstance[];

type StylesInstance = CSSProperties | undefined;

type StylesReturnType = StylesInstance | StylesInstance[];

interface SuperButtonProps {
  onPress?: () => void;
  onHover?: () => void;
  onFocus?: () => void;
  children?: ReactNode;
  className?: string | ((interactions: Interaction) => ClassNameReturnType);
  style?: CSSProperties | ((interactions: Interaction) => StylesReturnType);
  text?: string;
  link?: boolean;
  disabled?: boolean;
  isLoading?: boolean | { indicator: ReactNode; delay?: number };
  prefix?: ReactNode;
  suffix?: ReactNode;
  type?: "button" | "submit" | "reset";
  spacing?: Spacing;
  spacingUnit?: Unit;
  fontSize?: number;
}

export const SuperButton = ({
  className,
  style,
  spacing,
  spacingUnit = "px",
  children,
  text,
  onHover,
  onFocus,
  onPress,
  disabled,
  isLoading,
  fontSize = 14,
  type = "button",
  link,
  prefix,
  suffix,
}: SuperButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const classes = useStyles({
    ...spacing,
    spacingUnit,
    fontSize,
    onPress,
    theme: {},
  });
  const onMouseEnter = () => {
    setIsHovered(true);
    onHover?.();
  };
  const onMouseLeave = () => {
    setIsHovered(false);
  };
  const onMouseDown = () => {
    setIsFocused(true);
    onFocus?.();
  };
  const onMouseUp = () => {
    setIsFocused(false);
  };

  const classify = useCallback(() => {
    if (!className) return [];

    if (typeof className === "string") {
      return [className];
    }
    if (typeof className === "function") {
      const classNameInstance = className({ isHovered, isFocused });

      if (Array.isArray(classNameInstance)) {
        return classNameInstance.filter(Boolean);
      }
      return [classNameInstance].filter(Boolean);
    }
    return [];
  }, [className, isFocused, isHovered]);

  const getStyle = () => {
    if (!style) return undefined;

    if (typeof style === "function") {
      const styleInstance = style({ isHovered, isFocused });

      if (Array.isArray(styleInstance)) {
        return styleInstance
          .filter(Boolean)
          .reduce((acc, curr) => ({ ...acc, ...curr }), {});
      }
      return [styleInstance].filter(Boolean)?.[0];
    }
    return style;
  };

  return (
    <button
      id="super-button"
      onClick={onPress}
      className={classnames(
        classes.container,
        classify(),
        (disabled || isLoading) && classes.disabled
      )}
      style={getStyle()}
      {...{ onMouseEnter, onMouseLeave, onMouseDown, onMouseUp }}
    >
      {children ? children : text}
    </button>
  );
};

export function css(size?: Pixel, unit: Unit = "px") {
  if (typeof size === "string") {
    if (size.endsWith("px")) {
      return size.replace("px", unit);
    }
    if (size.endsWith("rem")) {
      return size.replace("rem", unit);
    }
    if (size.endsWith("em")) {
      return size.replace("em", unit);
    }
    return size;
  }
  return `${size}${unit}`;
}
