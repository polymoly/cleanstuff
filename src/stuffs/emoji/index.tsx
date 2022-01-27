import React from "react";
import emojis from "./emojis.json";

export const Emoji = () => {
  return (
    <div>
      {emojis.map(({ emoji }) => (
        <span style={{ fontSize: 24, margin: 4 }}>{emoji}</span>
      ))}
    </div>
  );
};
