import { useEffect } from "react";

export function useEscape(
  handler: (event?: KeyboardEvent) => void,
  canEscape?: boolean
) {
  useEffect(() => {
    if (typeof document === "undefined" || !canEscape) return;

    const listener = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handler(event);
      }
    };

    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handler, canEscape]);
}
