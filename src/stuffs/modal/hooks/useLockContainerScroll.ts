import { useLayoutEffect } from "react";
import classes from "../lock.module.scss";

export function useLockContainerScroll(canLock?: boolean) {
  useLayoutEffect(() => {
    if (typeof document === "undefined" || !canLock) {
      return;
    }

    document.body.classList.add(classes.lock);

    return () => {
      document.body.classList.remove(classes.lock);
    };
  }, [canLock]);
}
