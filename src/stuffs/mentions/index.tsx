import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type Mentionable = {
  title: string;
  url?: string;
};

interface MentionProps {
  dataList?: Mentionable[];
  highlight?: boolean;
  clickable?: boolean;
  prefix?: string;
}

export const Mention = ({ dataList, prefix = "@" }: MentionProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>("");

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const element = contentRef.current;

    const observer = new MutationObserver((a) => {
      const text = element?.innerHTML;

      const replaced = text.replace(/@\w+/g, (match) => `<h3>${match}</h3>`);
      setText(replaced);
    });

    observer.observe(element, {
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [contentRef, prefix]);

  return (
    <div
      ref={contentRef}
      style={{
        width: 300,
        height: 300,
        background: "#ccc",
        outline: "none",
      }}
      contentEditable
    >
      {text}
    </div>
  );
};
