import { useEffect } from "react";
import { Shortcut } from "../types";

export const useShortCut = (
  shortcut?: Shortcut,
  callback?: () => void,
  isVisible?: boolean
) => {
  useEffect(() => {
    if (typeof window === "undefined" || !isVisible) return;

    const onShortcut = (e: KeyboardEvent) => {
      if (!shortcut) return;
      if (shortcut.combination === "ctrl") {
        if (
          e.ctrlKey &&
          !e.altKey &&
          !e.shiftKey &&
          e.key === shortcut.key.trim().toLowerCase()
        ) {
          e.preventDefault();
          callback?.();
        }
        return;
      }
      if (shortcut.combination === "alt") {
        if (
          !e.ctrlKey &&
          e.altKey &&
          !e.shiftKey &&
          e.key === shortcut.key.trim().toLowerCase()
        ) {
          e.preventDefault();
          callback?.();
        }
        return;
      }
      if (e.key === shortcut.key.trim().toLowerCase()) {
        e.preventDefault();
        callback?.();
      }
    };

    window.addEventListener("keydown", onShortcut);

    return () => window.removeEventListener("keydown", onShortcut);
  }, [callback, isVisible, shortcut]);
};
