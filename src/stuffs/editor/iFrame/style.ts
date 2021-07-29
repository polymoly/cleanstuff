import { createUseStyles } from "react-jss";

export default createUseStyles({
  iframe: {
    display: "block",
    overflow: "hidden",
    [`img, *[href],button`]: {
      pointerEvents: "none",
      display: "inline-block",
    },
  },
});
