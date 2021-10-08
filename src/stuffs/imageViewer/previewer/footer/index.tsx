import { memo } from "react";
import { FooterProps } from "../../utility/types";
import useStyles from "./style";

export const Footer = memo(({ footer }: FooterProps) => {
  const classes = useStyles();

  return <div className={classes.imagePreviewFooter}>{footer}</div>;
});
