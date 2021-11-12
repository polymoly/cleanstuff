import { createUseStyles } from "react-jss";

export default createUseStyles({
  switch: {
    width: 30,
    height: 30,
    borderRadius: 1,
    border: [1, "solid", "#ddd"],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8f8f8",
    marginInline: 2,
    color: ({ disabled }: any) => (disabled ? "#666" : "#111"),
    cursor: ({ disabled }: any) => (disabled ? "not-allowed" : "pointer"),
  },
  hovering: {
    "&:hover": {
      color: "#1890ff",
      border: [1, "solid", "#1890ff"],
    },
  },
});
