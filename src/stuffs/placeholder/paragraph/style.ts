import { createUseStyles } from "react-jss";
import { Color } from "../utils/enum";

interface Size {
  width?: number;
  height?: number;
  space?: number;
}

export default createUseStyles({
  container: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    marginInline: 4,
    maxWidth: ({ width }: Size) => (width ? width : 400),
  },
  row: {
    width: ({ width }: Size) => (width ? width : 400),
    height: ({ height }) => (height ? height : 20),
    backgroundColor: Color.SOLID,
    borderRadius: 2,
  },
  margin: {
    marginBottom: ({ space }) => (space ? space : 8),
  },
  cut: {
    width: ({ width }) => (width ? width * 0.6 : 120),
  },
});
