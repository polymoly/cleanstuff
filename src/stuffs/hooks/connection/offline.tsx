import { ReactNode } from "react";
import { useConnection } from "./useConnection";

interface OfflineProps {
  children: ReactNode | ReactNode[];
}

export const Offline = ({ children }: OfflineProps) => {
  const isOnline = useConnection();

  return <>{!isOnline ? children : null}</>;
};
