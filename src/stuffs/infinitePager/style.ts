import { createUseStyles } from "react-jss";

interface IStyles {
  width: number;
  height: number;
  itemSize: number;
}

export default createUseStyles({
  scrollContainer: {
    width: ({ width }: IStyles) => width,
    height: ({ height }) => height,
    overflow: "auto",
  },
  item: {
    height: ({ itemSize }) => itemSize,
    maxHeight: ({ itemSize }) => itemSize,
    width: "100%",
    overflow: "hidden",
  },
  loader: {
    width: "100%",
    minHeight: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
