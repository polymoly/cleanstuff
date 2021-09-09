import { createUseStyles, jss } from "react-jss";

const gradient =
  "linear-gradient(to left,#f7f7f7 0%, rgba(110,110,110,.04) 40%, #f7f7f7 60%, #f7f7f7 100%)";

export default jss
  .createStyleSheet({
    "@global": {
      "@keyframes skeletonRTL": {
        "0%": {
          backgroundPosition: "0% 50%",
        },
        "100%": {
          backgroundPosition: "130% 50%",
        },
      },
    },
  })
  .attach();

export const useStyles = createUseStyles({
  loader: {
    maxWidth: "100%",
    maxHeight: "100%",
    width: ({ width }: any) => (width ? width : 250),
    height: ({ width }: any) => (width ? width : 250),
    background: "#f7f7f7",
    position: "relative",
    overflow: "hidden",
    borderRadius: "50%",
    marginInline: 8,
    marginBottom: ({ space }: any) => (space ? space : 8),
    "&::before": {
      content: '""',
      position: "absolute",
      height: "100%",
      width: "100%",
      background: gradient,
      backgroundRepeat: "no-repeat",
      animationName: "skeletonRTL",
      animationTimingFunction: "ease",
      animationIterationCount: "infinite",
      animationDuration: "1.6s",
      backgroundSize: "400% 100%",
      filter: "blur(5px)",
    },
  },
  inner: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: "50%",
    background: "#fff",
    width: ({ width }: any) => (width ? width * 0.6 : 150),
    height: ({ width }: any) => (width ? width * 0.6 : 150),
    transform: "translate(50px,50px)",
    maskComposite: "subtract",
  },
});
