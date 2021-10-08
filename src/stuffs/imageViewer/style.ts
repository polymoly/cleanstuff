import { createUseStyles } from "react-jss";

type Size = {
  width: number;
  height: number;
};

export default createUseStyles({
  container: {
    width: ({ width }: Size) => (width ? width : "100%"),
    height: ({ height }: Size) => (height ? height : "100%"),
    background: "#ccc",
    overflow: "hidden",
  },
  cardImage: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#ccc",
  },
});
