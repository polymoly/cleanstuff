import { createUseStyles, jss } from "react-jss";

export default jss
  .createStyleSheet({
    "@global": {
      "@keyframes ripple": {
        to: {
          transform: "scale(4)",
          opacity: 0,
        },
      },
    },
  })
  .attach();

export const useStyles = createUseStyles({
  button: {
    padding: [6, 46],
    background: "#222",
    color: "#fff",
    outline: "none",
    border: "none",
    borderRadius: 4,
    fontSize: 18,
    position: "relative",
    overflow: "hidden",
    transition: "background 400ms",
    cursor: "pointer",
  },
  ripple: {
    position: "absolute",
    borderRadius: "50%",
    transform: "scale(0)",
    animation: "ripple 600ms linear",
    backgroundColor: "rgba(255, 255, 255, 0.16)",
  },
});
