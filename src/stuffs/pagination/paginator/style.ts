import { createUseStyles } from "react-jss";

export default createUseStyles({
  paginator: {
    width: 30,
    height: 30,
    background: "#f2f2f2",
    border: ({ isActive }: any) =>
      isActive ? "1px solid #1890ff" : "1px solid #ddd",
    borderRadius: 1,
    marginInline: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: ({ isActive }: any) => (isActive ? "#1890ff" : "#111"),
    cursor: "pointer",
  },
});
