import React, { ReactNode, useEffect, useRef, useState } from "react";

interface TooltipProps {
  children: ReactNode;
}

export const Tooltip = ({ children }: TooltipProps) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<DOMRect>();

  useEffect(() => {
    if (!outerRef.current) return;
    const element = outerRef.current;

    const observer = new ResizeObserver(([entry]) => {
      setPosition(entry.target.getBoundingClientRect());
    });

    observer.observe(element, { box: "border-box" });

    return () => observer.unobserve(element);
  }, [outerRef]);

  return (
    <div
      ref={outerRef}
      style={{
        width: "fit-content",
        height: "fit-content",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      {position && (
        <div
          style={{
            width: 100,
            height: 30,
            position: "fixed",
            top: (position?.top || 0) - 34,
            left: (position?.left || 0) + (position?.width || 0) / 2 - 50,
            background: "#555",
          }}
        />
      )}
      {children}
    </div>
  );
};
