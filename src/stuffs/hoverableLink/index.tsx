import { useState, useEffect } from "react";

interface HoverableLinkProps {
  text: string | number;
  url: string;
}

export const HoverableLink = ({ text, url }: HoverableLinkProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isCtrlPressed, setIsCtrlPressed] = useState<boolean>(false);

  const onEnter = () => setIsHovered(true);
  const onLeave = () => setIsHovered(false);

  useEffect(() => {
    if (typeof window === "undefined" || !isHovered) return;

    const press = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        setIsCtrlPressed(true);
      }
    };

    window.addEventListener("keydown", press);

    return () => window.removeEventListener("keydown", press);
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const press = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        setIsCtrlPressed(false);
      }
    };

    window.addEventListener("keyup", press);

    return () => window.removeEventListener("keyup", press);
  });

  return (
    <span onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {isCtrlPressed ? <a href={url}>{text}</a> : text}
    </span>
  );
};
