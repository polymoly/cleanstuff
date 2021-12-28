import { createUseStyles } from "react-jss";
import { generateIndex } from "reactjs-view-core";

interface StyleProps {
  space?: number;
}

export default createUseStyles<string, StyleProps>(
  {
    [`step`]: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      maxWidth: 800,
      flex: 1,
      width: "100%",
      minHeight: 90,
      paddingBottom: ({ space }) => ((space || 0) > 50 ? (space || 0) + 8 : 58),
      paddingInline: 58,
      paddingTop: 8,
    },
  },
  {
    index: generateIndex("pages"),
  }
);
