import { useMemo } from "react";
import { OverlayMenuProps, Shortcut } from "../../types";

interface ShortcutRenderProps {
  shortcut?: Shortcut;
  showShortcut?: OverlayMenuProps["showShortcut"];
}

export const ShortcutRender = ({
  shortcut,
  showShortcut,
}: ShortcutRenderProps) => {
  const shortKey = useMemo(() => {
    const combination = shortcut?.combination;
    if (combination) {
      return `${shortcut?.combination}+${shortcut?.key.toLowerCase()}`;
    }
    return shortcut?.key.toLowerCase();
  }, [shortcut]);

  const shorcutRender =
    shortcut && showShortcut ? (
      showShortcut instanceof Function ? (
        showShortcut(shortcut)
      ) : (
        <div>{shortKey}</div>
      )
    ) : null;

  return <>{shorcutRender}</>;
};
