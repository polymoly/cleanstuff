import { createUseStyles, jss } from "react-jss";

const gradient =
  "linear-gradient(to left,#f7f7f7 0%, rgba(80,80,80,.04) 40%, #f7f7f7 60%, #f7f7f7 100%)";

export default jss
  .createStyleSheet({
    "@global": {
      "@keyframes skeletonRTL": {
        "0%": {
          right: "-100%",
        },
        "100%": {
          right: "100%",
        },
      },
    },
  })
  .attach();

export const useStyles = createUseStyles({
  loader: {
    maxWidth: "100%",
    maxHeight: "100%",
    width: ({ width }: any) => (width ? width : 200),
    height: ({ height }: any) => (height ? height : 20),
    background: "#f7f7f7",
    position: "relative",
    overflow: "hidden",
    borderRadius: 4,
    marginInline: 8,
    "&::before": {
      content: '""',
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundImage: gradient,
      backgroundRepeat: "no-repeat",
      animationName: "skeletonRTL",
      animationTimingFunction: "ease-in-out",
      animationIterationCount: "infinite",
      animationDuration: "1.7s",
      filter: "blur(7px)",
    },
  },
  avatarWrapper: {
    direction: "rtl",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: ({ space }: any) => (space ? space : 16),
  },
  avatar: {
    width: ({ height }: any) => (height ? height : 30),
    height: ({ height }: any) => (height ? height : 30),
    borderRadius: ({ avatar }: any) => (avatar === "circle" ? "50%" : 4),
    background: "#f7f7f7",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundImage: gradient,
      backgroundRepeat: "no-repeat",
      animationName: "skeletonRTL",
      animationTimingFunction: "ease-in-out",
      animationIterationCount: "infinite",
      animationDuration: "1.7s",
      filter: "blur(7px)",
    },
  },
  container: {
    display: "flex",
    width: "fit-content",
    flexDirection: ({ inline }: any) => (inline ? "row" : "column"),
    alignItems: "center",
    justifyContent: "center",
  },
});
