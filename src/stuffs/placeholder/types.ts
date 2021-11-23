export type ParagraphProps = {
  rows?: number;
  space?: number;
  cutEndofLine?: boolean;
  width?: number;
  height?: number;
};

export type Shape = "circle" | "square" | "rounded";
export type Size = "small" | "default" | "large" | number;
export type Show<S> = S | boolean | null | undefined;

export type AvatarProps = {
  size?: Size;
  shape?: Shape;
};

export type ButtonProps = {
  shape?: Omit<Shape, "circle">;
  width?: number;
  height?: number;
};

export type ImageProps = {
  width?: number;
  height?: number;
  shape?: Shape;
  withImage?: boolean;
};

export type CupProps = {
  size?: Size;
  shape?: Shape;
};

export type Animation = "blink" | "wave" | boolean;

export interface PlaceholderProps {
  paragraph?: ParagraphProps | boolean;
  cup?: CupProps | boolean;
  avatar?: AvatarProps | boolean;
  button?: ButtonProps | boolean;
  animation?: Animation;
  image?: ImageProps | boolean;
}

export type WithParagraphProps = Pick<PlaceholderProps, "animation"> &
  ParagraphProps;
export type WithAvatarProps = Pick<PlaceholderProps, "animation"> & AvatarProps;
export type WithButtonProps = Pick<PlaceholderProps, "animation"> & ButtonProps;
export type WithImageProps = Pick<PlaceholderProps, "animation"> & ImageProps;
export type WithCupProps = Pick<PlaceholderProps, "animation"> & CupProps;
