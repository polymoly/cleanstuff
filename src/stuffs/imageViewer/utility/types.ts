import { CSSProperties, ReactNode } from "react";

type Options = {
  rotate?: boolean;
  zoom?: boolean;
  fullscreen?: boolean;
  download?: boolean;
  showCounter?: boolean;
};
interface ImageViewerProps {
  currentIndex?: number;
  width?: number | string;
  height?: number | string;
  sources: string[];
  title?: ReactNode;
  footer?: ReactNode;
  keyboard?: boolean;
  options?: Options;
  getContainer?: HTMLElement;
  placeholder?: ReactNode;
  className?: string;
  style?: CSSProperties;
  alt?: string;
  counterRender?: (current: number, dataLength: number) => ReactNode;
  onVisibleChange?: (visible: boolean) => void;
  onNext?: (currentIndex?: number) => void;
  onPrevious?: (currentIndex?: number) => void;
}

interface TitleProps {
  title?: ReactNode;
  zoomValue: number;
  currentIndex: number;
  sources: string[];
  options?: Options;
  onClose: () => void;
  onFullscreen: () => Promise<void>;
  onRotate: (isReverse?: boolean) => void;
  onZoom: (isReverse?: boolean) => void;
  counterRender?: (current: number, dataLength: number) => ReactNode;
}

interface PreviewerProps {
  isVisible?: boolean;
  title?: ReactNode;
  footer?: ReactNode;
  current: number;
  sources: string[];
  keyboard?: boolean;
  options?: Options;
  placeholder?: ReactNode;
  onNext?: (currentIndex?: number) => void;
  onPrevious?: (currentIndex?: number) => void;
  counterRender?: (current: number, dataLength: number) => ReactNode;
  onClose: () => void;
}

interface FooterProps {
  footer?: ReactNode;
}

interface PreviewProps {
  currentImage?: string;
  rotate?: number;
  zoom?: number;
  placeholder?: ReactNode;
}

interface SwitchArrowProps {
  hide?: boolean;
  disabled?: boolean;
  onClick: () => void;
  icon?: ReactNode;
  isPrevious?: boolean;
}

export type {
  Options,
  ImageViewerProps,
  TitleProps,
  PreviewerProps,
  FooterProps,
  PreviewProps,
  SwitchArrowProps,
};
