import React from "react";
import { useNavigate } from "react-router-dom";
import { useNotify } from "./stuffs/notify";
import { useObserveElement } from "./stuffs/responsive";

export const Page1 = () => {
  const observe = useObserveElement();
  console.log(observe(200));
  return (
    <div style={{ width: 100, height: 100, background: "red" }}>page 1</div>
  );
};
