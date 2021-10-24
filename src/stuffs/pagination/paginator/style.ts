import { createUseStyles } from "react-jss";

export default createUseStyles({
  paginator: {
    width: 30,
    height: 30,
    background: ({ isActive }: any) => (isActive ? "teal" : "#f2f2f2"),
    border: ({ isActive }: any) =>
      isActive ? "1px solid teal" : "1px solid #ddd",
    borderRadius: 1,
    marginInline: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: ({ isActive }: any) => (isActive ? "#fff" : "#111"),
    cursor: "pointer",
  },
});
