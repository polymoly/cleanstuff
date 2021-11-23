import { createUseStyles, jss } from "react-jss";

interface Props {
  size: number;
  color: string;
}

jss
  .createStyleSheet({
    "@global": {
      "@keyframes rotate": {
        "100%": {
          transform: "rotate(360deg)",
        },
      },
      "@keyframes dash": {
        "0%": {
          strokeDasharray: "1, 200",
          strokeDashoffset: 0,
        },
        "50%": {
          strokeDasharray: "89, 200",
          strokeDashoffset: "-35px",
        },
        "100%": {
          strokeDasharray: "89, 200",
          strokeDashoffset: "-124px",
        },
      },
    },
  })
  .attach();

export const useStyles = createUseStyles({
  loader: {
    position: "relative",
    margin: "0 auto",
    width: ({ size }: Props) => size,
    "&:before": {
      content: "''",
      display: "block",
      paddingTop: " 100%",
    },
  },
  circular: {
    animation: "rotate 2s linear infinite",
    height: "100%",
    transformOrigin: "center center",
    width: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  },
  path: {
    strokeDasharray: "1, 200",
    strokeDashoffset: 0,
    animation: "dash 1.5s ease-in-out infinite",
    strokeLinecap: "round",
    stroke: ({ color }) => color,
  },
});
