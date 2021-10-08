import { createUseStyles } from "react-jss";

export default createUseStyles({
  imagePreview: {
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  previewImage: {
    userSelect: "none",
    backgroundSize: "contain",
    cursor: "pointer",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    background: "#ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "fit-content",
    height: "fit-content",
    background: "transparent",
    minWidth: 500,
    minHeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
