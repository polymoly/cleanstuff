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
  /**
   * @description support press esc to close
   */
  keyboard?: boolean;
  /**
   * @description show fade overlay mask
   */
  mask?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  closeIcon?: ReactNode;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  bodyClassName?: string;
  title?: ReactNode | null;
  children?: ReactNode;
  width?: number;
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
}: ModalProps) => {
  const controls = useAnimation();
  const modalRef = useRef<HTMLDivElement>(null);

  const shouldReduced = useReducedMotion();

  useEffect(() => {
    if (!visible) return;

    controls.start(["maskOpen", "open"]).then(() => onVisible?.());

    return () => controls.stop();
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
            key="mask"
            variants={variants}
            initial="maskClose"
            animate={controls}
            exit="maskExit"
            custom={mask}
          >
            <motion.div
              ref={modalRef}
              variants={variants}
              initial="close"
              animate={controls}
              exit="exit"
              custom={{ width, shouldReduced }}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};
