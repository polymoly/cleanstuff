import { createUseStyles } from "react-jss";

export default createUseStyles({
  container: {
    display: "flex",
    flex: 1,
    height: "100%",
    flexDirection: "row",
  },

  htmlWrapper: {
    padding: 8,
    display: "flex",
    flex: (isEditorCollapse: any) => (isEditorCollapse ? 0 : 1),
    background: "#222",
    position: "relative",
    transition: "flex 250ms ease-in-out",
  },
  parentWrapper: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100vh",
    width: "100%",
  },
  header: {
    width: "100%",
    maxWidth: "100%",
    height: 60,
    backgroundColor: "#333",
  },
  collapser: {
    width: 25,
    height: 25,
    background: "#111",
    position: "absolute",
    zIndex: 2,
    right: -10,
    top: "50%",
    transform: "translateY(-50%)",
    borderRadius: 4,
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
});
