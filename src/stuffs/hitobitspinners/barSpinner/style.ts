import { createUseStyles, jss } from "react-jss";

interface Props {
  color: string;
  size: number;
  space: number;
  thickness: number;
  count: number;
}

export default jss
  .createStyleSheet({
    "@global": {
      "@keyframes loading": {
        "0%": {
          transform: "scaleY(1)",
        },
        "50%": {
          transform: "scaleY(2)",
        },
        "100%": {
          transform: "scaleY(1)",
        },
      },
    },
  })
  .attach();

export const useStyles = createUseStyles({
  container: {
    width: ({ space, thickness, count }: Props) =>
      thickness * count + space * (count - 1),
    minHeight: ({ size }: Props) => size,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bar: {
    width: ({ thickness }: Props) => thickness,
    height: ({ size }: Props) => size,
    backgroundColor: ({ color }: Props) => color,
    animationName: "loading",
    animationIterationCount: "infinite",
    animationDuration: "1s",
    animationTimingFunction: "cubic-bezier(0.2, 0.68, 0.18, 1.08)",
    animationFillMode: "both",
  },
});
