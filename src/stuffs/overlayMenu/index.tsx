import {
  MenuKey,
  OverlayMenu as OverlayMenuTyps,
  OverlayMenuProps,
  Trigger,
} from "./types";
import useStyles from "./style";
import { Children, useRef, useState } from "react";
import { useCycle, AnimatePresence, useReducedMotion } from "framer-motion";
import { Client, useMouseClient } from "./hooks/useMouseClient";
import { useKeyPressed } from "../hooks/useKeyPressed";
import { Overlay } from "./components/overlay";
import { Container } from "./components/container";
import { useRestriction } from "./hooks/useRestriction";
import { MenuItem } from "./components/menuItem";

export const OverlayMenu = ({
  children,
  trigger = "context",
  strictBounding = true,
  menu,
  maxSize,
  menuClassName,
  menuStyle,
  showShortcut = true,
}: OverlayMenuProps) => {
  const classes = useStyles({ maxSize } as any);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const client = useMouseClient(containerRef, trigger);
  const [{ x, y }, setPos] = useState<Client>({ x: client.x, y: client.y });
  const [isVisible, toggleVisibility] = useCycle(false, true);
  const [isDestory, setIsDestory] = useState<boolean>(false);
  const shouldReduced = useReducedMotion();
  const { h, v } = useRestriction(
    overlayRef,
    isVisible,
    client,
    strictBounding
  );

  const destroy = (): void => {
    if (isVisible) {
      setIsDestory(true);
    }
  };

  const onTrigger = (triggerType: Trigger) => {
    if (trigger !== triggerType) {
      if (!isDestory) {
        destroy();
      }
      return;
    }
    if (isDestory) {
      setIsDestory(false);
    }
    toggleVisibility();
    setPos(client);
  };

  const onClick = () => onTrigger("click");

  const onContextMenu = () => onTrigger("context");

  useKeyPressed("Escape", destroy);

  const onClickMenu = () => {
    destroy();
  };

  return (
    <Container
      ref={containerRef}
      className={classes.container}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <AnimatePresence onExitComplete={toggleVisibility}>
        {isVisible && !isDestory && (
          <Overlay
            key="overlay"
            ref={overlayRef}
            client={client}
            strictBounding={strictBounding}
            className={classes.menu}
            initial={{
              left: !isVisible ? 0 : shouldReduced ? x : x - h,
              top: !isVisible ? 0 : shouldReduced ? y : y - v,
              scale: 0,
              transformOrigin: "0 0",
              opacity: 0,
            }}
            animate={{
              left: !isVisible ? undefined : shouldReduced ? x : x - h,
              top: !isVisible ? undefined : shouldReduced ? y : y - v,
              scale: 1,
              transformOrigin: "0 0",
              opacity: 1,
            }}
            exit={{
              left: x,
              top: y,
              scale: 0,
              transformOrigin: "0 0",
              opacity: 0,
            }}
            transition={{
              type: "keyframes",
              ease: "easeInOut",
              duration: 0.2,
              delay: 0.1,
            }}
          >
            {Array.isArray(menu)
              ? menu?.map(({ key, ...rest }) => (
                  <div key={key} onClick={onClickMenu}>
                    <MenuItem
                      key={key}
                      showShortcut={showShortcut}
                      isVisible={isVisible}
                      className={menuClassName}
                      style={menuStyle}
                      {...rest}
                    />
                  </div>
                ))
              : Children.map(menu?.props.children, (child, index) => (
                  <div onClick={onClickMenu}>{child}</div>
                ))}
          </Overlay>
        )}
      </AnimatePresence>
      {children}
    </Container>
  );
};
