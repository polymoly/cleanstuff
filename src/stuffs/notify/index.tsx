import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence } from "framer-motion";
import { NotifyContainer } from "./notifyContainer";
import { useDetectRouteChange } from "./useDetectRouteChange";

interface NotifyProviderProps {
  children: ReactNode;
}

type ProgressOptions = {
  color?: string;
  direction?: "toRight" | "toLeft";
  placement?: "top" | "bottom";
  thickness?: number;
};

type Notify = {
  content?: string | ReactNode;
  /**
   * @description in seconds
   */
  duration?: number;
  /**
   * @description in seconds
   */
  delay?: number;
  notifyIcon?: ReactNode;
  progressbar?: boolean | ProgressOptions;
  onClose?: () => void;
};

type Type = "success" | "error" | "warn" | "info";

type NotifyType = {
  type?: Type;
};

type NotifyContextProps = {
  success(content: Notify): void;
  error(content: Notify): void;
  info(content: Notify): void;
  warn(content: Notify): void;
};

type NotifyState = Notify & NotifyType;

export interface NotifyProps extends NotifyState {}

const defaultNotifyValues: NotifyContextProps = {
  success: () => null,
  error: () => null,
  info: () => null,
  warn: () => null,
};

const isNotifyContentExists = (data?: NotifyState) => {
  if (!data || Object.keys(data || {}).length === 0) {
    return false;
  }
  return true;
};

const NotifyContext = createContext<NotifyContextProps>(defaultNotifyValues);
const ClosingContext = createContext<{
  onClose: () => void;
  trigger: () => void;
}>({ onClose: () => null, trigger: () => null });

const Notifier = (notify: NotifyProps) => {
  const closingRef = useRef<() => void>();

  const { duration, onClose: notifyClose } = useMemo(() => notify, [notify]);
  const { onClose, trigger } = useContext(ClosingContext);

  const storeCloseFunction = () => {
    if (!closingRef.current) {
      closingRef.current = notifyClose;
    }
  };

  const handleClose = () => {
    storeCloseFunction();
    onClose();
  };

  useEffect(() => {
    if (!isNotifyContentExists(notify)) return;
    storeCloseFunction();
    const timeout = setTimeout(handleClose, (duration || 5) * 1000);

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notify]);

  const shouldRender = isNotifyContentExists(notify);

  const onExitComplete = () => {
    trigger();
    notifyClose?.();
  };

  return (
    <AnimatePresence
      initial
      exitBeforeEnter
      onExitComplete={onExitComplete}
      presenceAffectsLayout
    >
      {shouldRender && (
        <NotifyContainer {...notify} handleClose={handleClose} />
      )}
    </AnimatePresence>
  );
};

export const NotifyProvider = ({ children }: NotifyProviderProps) => {
  const [notify, setNotify] = useState<NotifyState | undefined>(undefined);
  const shouldTrigger = useRef<boolean>(true);
  const handleDelay = useRef<NodeJS.Timeout>();

  const trigger = () => {
    shouldTrigger.current = true;
  };

  const onNotify = (content: Notify, type: Type) => {
    if (shouldTrigger.current) {
      if (!isNotifyContentExists(notify)) {
        if (content?.delay) {
          handleDelay.current = setTimeout(() => {
            setNotify({ ...content, type });
          }, content.delay * 1000);

          return;
        }

        setNotify({ ...content, type });
      }
      shouldTrigger.current = false;
    }
  };

  const success = (content: Notify) => {
    onNotify(content, "success");
  };

  const error = (content: Notify) => {
    onNotify(content, "error");
  };

  const info = (content: Notify) => {
    onNotify(content, "info");
  };

  const warn = (content: Notify) => {
    onNotify(content, "warn");
  };

  const onClose = () => {
    if (handleDelay.current) {
      clearTimeout(handleDelay.current);
    }
    setNotify(undefined);
  };

  const value: NotifyContextProps = {
    success,
    error,
    info,
    warn,
  };

  return (
    <NotifyContext.Provider {...{ value }}>
      <ClosingContext.Provider value={{ onClose, trigger }}>
        <Notifier {...notify} />
      </ClosingContext.Provider>
      {children}
    </NotifyContext.Provider>
  );
};

export const useInNotifyContext = () => {
  return typeof NotifyContext !== "undefined";
};

export const useNotify = () => {
  return useContext(NotifyContext);
};
