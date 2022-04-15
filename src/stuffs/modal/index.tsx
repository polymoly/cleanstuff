import {
  motion,
  AnimatePresence,
  useAnimation,
  useReducedMotion,
} from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";
import { variants } from "./variants";
import { useOnClickOutside } from "./hooks/useClickOutside";
import { Portal } from "./portal";
import { CSSProperties } from "styled-components";
import classes from "./base.module.scss";
import classNames from "classnames";
import { Title } from "./title";
import { useEscape } from "./hooks/useEscape";
import { useLockContainerScroll } from "./hooks/useLockContainerScroll";

interface ModalProps {
  visible?: boolean;
  onClose?: () => void;
  afterClose?: () => void;
  onVisible?: () => void;
  getContainer?: HTMLElement;
  keyboard?: boolean;
  mask?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  closeIcon?: ReactNode;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  bodyClassName?: string;
  title?: ReactNode | null;
  footer?: ReactNode | null;
  children?: ReactNode;
  width?: number;
  centered?: boolean;
  delay?: number;
  modalRender?: (node: ReactNode) => ReactNode;
}

export const Modal = ({
  visible,
  afterClose,
  onVisible,
  onClose,
  getContainer,
  keyboard = true,
  mask = true,
  maskClosable = true,
  closable = true,
  width,
  bodyStyle,
  children,
  closeIcon,
  modalRender,
  title,
  wrapperClassName,
  bodyClassName,
  wrapperStyle,
  centered,
  footer,
  delay,
}: ModalProps) => {
  const controls = useAnimation();
  const modalRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  const shouldReduced = useReducedMotion();

  useEffect(() => {
    if (!visible) return;
    const openVars = ["maskOpen", "open"];

    const open = () => controls.start(openVars).then(() => onVisible?.());

    if (!delay) {
      open();
      return;
    }

    const timer = setTimeout(() => {
      open();
    }, delay);

    return () => {
      controls.stop();
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls, visible]);

  useOnClickOutside(modalRef, () => {
    if (onClose && maskClosable) {
      onClose();
    }
  });

  useEscape(() => onClose?.(), keyboard);

  useLockContainerScroll(visible);

  return (
    <Portal container={getContainer}>
      <AnimatePresence key="modal" onExitComplete={() => afterClose?.()}>
        {visible && (
          <motion.div
            ref={maskRef}
            key="mask"
            variants={variants}
            initial="maskClose"
            animate={controls}
            exit="maskExit"
            custom={mask}
            style={{ background: "red" }}
          >
            <motion.div
              ref={modalRef}
              variants={variants}
              initial="close"
              animate={controls}
              exit="exit"
              custom={{ width, shouldReduced, centered }}
              className={classNames(classes["modal-body"], wrapperClassName)}
              style={wrapperStyle}
            >
              {title && (
                <Title
                  closable={closable}
                  closeIcon={closeIcon}
                  onClose={onClose}
                >
                  {title}
                </Title>
              )}
              <div
                className={classNames(classes["modal-content"], bodyClassName)}
                style={bodyStyle}
              >
                {modalRender ? modalRender(children) : children}
              </div>
              {footer && footer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};
