import { jss, createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    background: "red",
    height: "100%",
    overflowX: "auto",
  },
  container: {
    maxWidth: "100%",
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit,minmax(240px,1fr))`,
    gridAutoRows: 240,
    gap: 4,
    "& nth-child(1)": {
      gridColumn: "1 / span 2",
    },
  },
});

export default jss
  .createStyleSheet({
    "@global": {
      body: {
        margin: 0,
        padding: 0,
        direction: "",
        fontSize: 14,
        backgroundColor: "#fff",
        height: "100vh",
        "& .ace_scrollbar-v": {
          "&::-webkit-scrollbar": {
            width: 6,
          },

          "&::-webkit-scrollbar-track": {
            background: "#25282c",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(150,150,150,.5)",
          },

          "&::-webkit-scrollbar-thumb:hover": {
            background: "rgba(150,150,150,1)",
          },
        },
      },
      [`*,*::before,*::after`]: {
        boxSizing: "border-box",
      },
    },
  })
  .attach();
