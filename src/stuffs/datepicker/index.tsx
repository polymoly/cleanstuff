import { createUseStyles } from "react-jss";
import { Calendar } from "./calendar";
import { DatePickerFooter } from "./footer";
import { DatePickerHeader } from "./header";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import moment from "moment-jalaali";
import { useDate } from "./provider";

const useStyle = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    background: "#f6f6f6",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    borderRadius: 5,
    width: "fit-content",
    minWidth: 400,
    height: "auto",
    fontFamily: "vazir",
    position: "relative",
  },
  wrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "200px",
    padding: 8,
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
  },
});

export const DatePicker = () => {
  const classes = useStyle();
  const AnimatedCalendar = motion(Calendar);
  const [isCalendar, toggle] = useCycle(true, false);

  const onChange = () => {
    toggle();
  };

  return (
    <div className={classes.container}>
      <DatePickerHeader onClick={onChange} />
      <div className={classes.wrapper}>
        <AnimatePresence initial>
          {isCalendar && (
            <AnimatedCalendar
              initial={{ opacity: 1 }}
              animate={{
                opacity: isCalendar ? 1 : 0,
              }}
              exit={{ opacity: 0 }}
              transition={{
                type: "tween",
                duration: 0.25,
                ease: "easeIn",
              }}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!isCalendar && (
            <motion.div
              initial={{
                width: "100%",
                height: "100%",
                opacity: 0,
                position: "absolute",
                right: 0,
                top: 0,
                overflow: "hidden",
                background: "#f6f6f6",
                padding: 16,
              }}
              animate={{
                opacity: isCalendar ? 0 : 1,
              }}
              exit={{ opacity: 0 }}
              transition={{
                type: "tween",
                duration: 0.2,
                ease: "backIn",
              }}
            >
              month picker
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <DatePickerFooter />
    </div>
  );
};
