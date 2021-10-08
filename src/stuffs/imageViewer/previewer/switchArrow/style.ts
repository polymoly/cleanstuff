import { createUseStyles } from "react-jss";

export default createUseStyles({
  switchArrow: {
    position: "absolute",
    right: ({ isPrevious }: any) => (isPrevious ? "auto" : 24),
    left: ({ isPrevious }: any) => (!isPrevious ? "auto" : 24),
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: 28,
    backgroundColor: "rgba(30,30,30,.8)",
    width: 50,
    height: 50,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgba(30,30,30,.7)",
    },
  },
  disable: {
    pointerEvents: "none",
    backgroundColor: "#888",
    cursor: "default",
  },
});
