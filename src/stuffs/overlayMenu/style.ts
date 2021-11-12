import { createUseStyles } from "react-jss";
import { MaxSize } from "./types";

interface DOMStylesProps {
  maxSize?: MaxSize;
}

export default createUseStyles({
  container: {
    width: "fit-content",
    height: "fit-content",
  },
  menu: {
    position: "fixed",
    minWidth: 200,
    width: "auto",
    height: "auto",
    maxWidth: ({ maxSize }: DOMStylesProps) =>
      maxSize ? maxSize[0] : undefined,
    maxHeight: ({ maxSize }: DOMStylesProps) =>
      maxSize ? maxSize[1] : undefined,
    background: "#f5f5f5",
    zIndex: 999,
    boxShadow: "0px 1px 4px rgba(0,0,0,.2)",
    borderRadius: 4,
    overflow: ({ maxSize }: DOMStylesProps) => (maxSize ? "auto" : "hidden"),
  },
});
