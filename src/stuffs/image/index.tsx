import { ReactNode, useEffect, useRef, useState } from "react";

interface ImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
  onError?: () => void;
  loader?: ReactNode;
  loading?: "lazy" | "eager";
}

const imageClass = (width?: number, height?: number) => {
  return new Image(width, height);
};

export const ImageBox = ({
  src,
  height,
  width,
  alt,
  onLoad,
  loading = "lazy",
  loader,
  onError,
}: ImageProps) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!imageRef.current) return;
    const imageNode = imageRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const image = imageClass(width, height);
        image.onload = () => {
          if (entry.isIntersecting) {
            setCurrentSrc(image.src);
          }
        };
        image.src = src;
      },
      { threshold: 0.5 }
    );

    observer.observe(imageNode);

    return () => observer.unobserve(imageNode);
  }, [height, imageRef, src, width]);

  return (
    <div
      style={{ position: "relative", width, height, background: "#ccc" }}
      ref={imageRef}
    >
      {!currentSrc && loader}
      <img
        src={currentSrc}
        alt={alt}
        onLoad={onLoad}
        width={width}
        height={height}
        onError={onError}
        loading={loading}
        decoding="auto"
      />
    </div>
  );
};
