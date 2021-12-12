import { useCallback, RefObject, MouseEvent } from "react";
import { jss, createUseStyles } from "react-jss";

jss
  .createStyleSheet({
    "@global": {
      "@keyframes ripple": {
        to: {
          transform: "scale(4)",
          opacity: 0,
        },
      },
    },
  })
  .attach();

const useStyles = createUseStyles({
  ripple: {
    position: "absolute",
    borderRadius: "50%",
    transform: "scale(0)",
    animation: "ripple 600ms linear",
    backgroundColor: ({ rippleColor }: any) => rippleColor,
  },
});

export const useRipple = <R extends HTMLElement>(
  targetRef: RefObject<HTMLButtonElement>,
  rippleRef: RefObject<R>,
  rippleColor: string = "#ffffff29"
) => {
  const classes = useStyles({ rippleColor } as any);

  const createRipple = useCallback(
    ({ clientX, clientY }: MouseEvent<HTMLButtonElement>) => {
      if (!targetRef.current || !rippleRef.current) return;

      const node = targetRef.current;
      const circle = rippleRef.current;

      const diameter = Math.max(node.clientWidth, node.clientHeight);
      circle.style.width = `${diameter}px`;
      circle.style.height = `${diameter}px`;
      circle.style.left = `${clientX - node.offsetLeft - diameter / 2}px`;
      circle.style.top = `${clientY - node.offsetTop - diameter / 2}px`;

      if (circle) {
        circle.remove();
      }
      node.appendChild(circle);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rippleRef, targetRef]
  );

  return { createRipple, rippleClass: classes.ripple };
};
