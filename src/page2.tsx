import React from "react";
import { useNavigate } from "react-router-dom";
import { Page3 } from "./page3";
import {
  useInDynamicContext,
  withDynamicContext,
} from "./stuffs/motionRouting";
import { useNotify } from "./stuffs/notify";

export const Page2 = () => {
  const { inDynamicContext, state } = useInDynamicContext("app");

  console.log({ inDynamicContext, state });

  return <div>{state.gholi === 123 ? "123" : "gholi"}</div>;
};
