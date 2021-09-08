import { jss } from "react-jss";

export default jss
  .createStyleSheet({
    "@global": {
      body: {
        margin: 0,
        padding: 0,
        direction: "rtl",
        overflowY: "hidden",
        fontSize: 14,
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
