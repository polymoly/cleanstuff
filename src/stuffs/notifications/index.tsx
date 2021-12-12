import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, useCycle, motion } from "framer-motion";

interface NotifyProps {
  component?: any;
}

const Context = createContext<any>({ notify: () => null, config: () => null });

export const NotifyProvider = ({ children }: any) => {
  const [isOpen, toggle] = useCycle(false, true);
  const [component, setComponent] = useState<JSX.Element | null>(null);

  const notify = useCallback(
    (content: any) => {
      setComponent(content?.content);
      if (!isOpen) {
        toggle();
      }
      function x() {
        console.log("fs");
      }
    },
    [isOpen, toggle]
  );

  useEffect(() => {
    if (!isOpen) return;
    const timeout = setTimeout(() => {
      toggle();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isOpen, toggle]);

  return (
    <Context.Provider value={notify}>
      <AnimatePresence exitBeforeEnter>
        {isOpen && <Notify component={component} />}
      </AnimatePresence>
      {children}
    </Context.Provider>
  );
};

const Portal = ({ children }: { children: ReactNode }) => {
  return createPortal(children, document.body);
};

const NotifyTemplate = (props: NotifyProps) => {
  return (
    <motion.div
      initial={{
        width: 300,
        height: 50,
        background: "red",
        position: "fixed",
        top: 10,
        right: -320,
      }}
      animate={{
        right: 10,
        transition: {
          type: "spring",
          duration: 0.5,
          bounce: 0.25,
        },
      }}
      exit={{
        right: -320,
      }}
    >
      {props?.component}
    </motion.div>
  );
};

export const useNotify = () => {
  const notify = useContext(Context);

  return notify;
};

export const Notify = (props: NotifyProps) => {
  return (
    <Portal>
      <NotifyTemplate {...props} />
    </Portal>
  );
};
