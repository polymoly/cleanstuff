import { createUseStyles, jss } from "react-jss";

interface Props {
  color: string;
  size: number;
  space: number;
}

export default jss
  .createStyleSheet({
    "@global": {
      "@keyframes fade": {
        "0%": {
          opacity: 0,
        },
        "50%": {
          opacity: 0.8,
        },
        "100%": {
          opacity: 0,
        },
      },
    },
  })
  .attach();

export const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: ({ size, space }) => 3 * size + 6 * space,
  },
  dot: {
    width: ({ size }: Props) => (size ? size : 10),
    height: ({ size }: Props) => (size ? size : 10),
    marginBlock: 0,
    marginInline: ({ space }) => (space ? space : 4),
    background: ({ color }) => color,
    borderRadius: ` 50%`,
    opacity: 0,
    animationName: "fade",
    animationDuration: "1s",
    animationIterationCount: "infinite",
    "&:nth-child(1)": {
      animationDelay: `0s`,
    },
    "&:nth-child(2)": {
      animationDelay: `0.1s`,
    },
    "&:nth-child(3)": {
      animationDelay: `0.2s`,
    },
  },
});
