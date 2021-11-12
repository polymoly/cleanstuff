import { ChangeEvent, useState, KeyboardEvent } from "react";
import useStyles from "./style";

interface GotoProps {
  onChange?: (page?: number) => void;
}

export const Goto = ({ onChange }: GotoProps) => {
  const classes = useStyles();
  const [gotoValue, setGotoValue] = useState<string>("");

  const onGoto = (e: ChangeEvent<HTMLInputElement>) => {
    setGotoValue(e.target.value);
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!isNaN(Number(gotoValue))) {
        onChange?.(Number(gotoValue));
      }
      setGotoValue("");
    }
  };

  return (
    <div className={classes.gotoWrapper}>
      <span>go to</span>
      <input
        type="text"
        className={classes.goto}
        onKeyDown={onEnter}
        value={gotoValue}
        onChange={onGoto}
      />
    </div>
  );
};
