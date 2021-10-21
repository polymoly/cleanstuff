import { CSSProperties } from "react";

export declare type Properties =
  | "width"
  | "height"
  | "borderRadius"
  | "backgroundColor"
  | "color"
  | "fontSize"
  | "fontFamily";

declare type StyleTypes = Pick<CSSProperties, Properties>;
export declare type Direction = "upwards" | "downwards";

export interface Style extends Omit<StyleTypes, "width" | "height"> {
  width?: number;
  height?: number;
}

export interface AnimatedCounterProps {
  count: number;
  style?: Style;
  duration?: number;
  direction?: Direction;
}

export const defaultStyle: Style = {
  backgroundColor: "#ddd",
  borderRadius: "50%",
  color: "#111",
  height: 30,
  width: 30,
};
