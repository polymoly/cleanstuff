import { useEffect, useState } from "react";

export const useConnection = (): boolean => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    const load = () => setIsOnline(navigator.onLine);

    window.addEventListener("load", load);

    return () => window.removeEventListener("load", load);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.addEventListener) return;

    const online = () => setIsOnline(true);

    window.addEventListener("online", online);

    return () => window.removeEventListener("online", online);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.addEventListener) return;

    const offline = () => setIsOnline(false);

    window.addEventListener("offline", offline);

    return () => window.removeEventListener("offline", offline);
  }, []);

  return isOnline;
};
