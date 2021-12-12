import { createUseStyles } from "react-jss";
import { css, Spacing, Unit } from ".";

interface Props extends Partial<Spacing> {
  fontSize?: number;
  onPress?: () => void;
  spacingUnit?: Unit;
}

export const useStyles = createUseStyles<string, Props>(
  {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      outline: "none",
      border: "none",
      background: "#1890ff",
      color: "#fff",
      marginTop: ({ mt, my, spacingUnit }) =>
        my ? css(my, spacingUnit) : mt ? css(mt, spacingUnit) : undefined,
      marginBottom: ({ mb, my, spacingUnit }) =>
        my ? css(my, spacingUnit) : mb ? css(mb, spacingUnit) : undefined,
      marginLeft: ({ ml, mx, spacingUnit }) =>
        mx ? css(mx, spacingUnit) : ml ? css(ml, spacingUnit) : undefined,
      marginRight: ({ mr, mx, spacingUnit }) =>
        mx ? css(mx, spacingUnit) : mr ? css(mr, spacingUnit) : undefined,
      paddingTop: ({ pt, py, spacingUnit }) =>
        py ? css(py, spacingUnit) : pt ? css(pt, spacingUnit) : undefined,
      paddingBottom: ({ pb, py, spacingUnit }) =>
        py ? css(py, spacingUnit) : pb ? css(pb, spacingUnit) : undefined,
      paddingLeft: ({ pl, px, spacingUnit }) =>
        px ? css(px, spacingUnit) : pl ? css(pl, spacingUnit) : undefined,
      paddingRight: ({ pr, px, spacingUnit }) =>
        px ? css(px, spacingUnit) : pr ? css(pr, spacingUnit) : undefined,
      margin: ({ m, spacingUnit }) => (m ? css(m, spacingUnit) : undefined),
      padding: ({ p, spacingUnit }) => (p ? css(p, spacingUnit) : undefined),
      fontSize: ({ fontSize }) => fontSize || 14,
      cursor: ({ onPress }) => (onPress ? "pointer" : "default"),
    },
    disabled: {},
  },
  {
    name: "super",
  }
);
