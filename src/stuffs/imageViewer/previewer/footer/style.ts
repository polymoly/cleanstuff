import { createUseStyles } from "react-jss";

export default createUseStyles({
  imagePreviewFooter: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    minHeight: 50,
    height: "auto",
    background: "rgba(50,50,50,.6)",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
});
