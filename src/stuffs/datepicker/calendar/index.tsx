import { forwardRef } from "react";
import { createUseStyles } from "react-jss";
import { Cell } from "./cell";
import { MotionProps, motion } from "framer-motion";
import { useDate, useDateCallback } from "../provider";

const useStyle = createUseStyles({
  calendar: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    padding: 8,
    direction: "rtl",
    flexDirection: "column",
    position: "absolute",
    right: 0,
    top: 0,
    height: "100%",
    overflow: "hidden",
  },
  grid: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(7,minmax(55px,1fr))",
    gridTemplateRows: "repeat(6,minmax(30px, 1fr))",
    justifyItems: "center",
  },
});

const days = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

const data = [...Array.from({ length: 30 }, (_, i) => i + 1)];

export const Calendar = forwardRef<HTMLDivElement>((props, ref) => {
  const classes = useStyle();
  const { onChangeDay } = useDateCallback();
  const { day } = useDate();

  const select = (day: number) => {
    onChangeDay(day);
  };

  return (
    <div className={classes.calendar} ref={ref} {...props}>
      <div className={classes.grid}>
        {days.map((day, index) => (
          <Cell key={index} label={day} />
        ))}
        {data.map((dayValue, index) => (
          <Cell
            key={index}
            label={dayValue}
            isSelect={dayValue === day}
            onSelect={() => select(dayValue)}
          />
        ))}
      </div>
    </div>
  );
});
