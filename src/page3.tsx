import React from "react";
import {
  useInDynamicContext,
  withDynamicContext,
} from "./stuffs/motionRouting";

export const Page3 = withDynamicContext(() => {
  const hasDynamicPage3 = useInDynamicContext("page1");
  console.log({ hasDynamicPage3 });

  return <div>Page3</div>;
})("app");
