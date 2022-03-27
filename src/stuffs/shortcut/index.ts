import { useEffect, useRef } from "react";

type ShortcutOptions = {
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  shortcuts: string | [string, string];
  fn: () => void;
};

const useShortcut = () => {
  const config = useRef<ShortcutOptions[]>([]);

  const create = (options: ShortcutOptions) => {
    config.current.push(options);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const keyLogs: Record<string, boolean> = {};

    const events = ["keydown", "keyup"];

    const listener = (event: KeyboardEvent) => {
      config.current.forEach(({ shortcuts, fn, shift, alt, ctrl }) => {
        if (event.repeat) return;

        const combine = () => {
          const combinations: Record<string, boolean> = {};

          if (alt) {
            combinations.altKey = event.altKey;
          }
          if (shift) {
            combinations.shiftKey = event.shiftKey;
          }
          if (ctrl) {
            combinations.ctrlKey = event.ctrlKey;
          }

          if (Object.keys(combinations).length === 0) {
            return true;
          }

          return Object.values(combinations).every((value) => value);
        };

        const combination = combine();

        if (!combination) return;

        if (event.type === "keydown") {
          if (Array.isArray(shortcuts)) {
            const shifted = shift
              ? [...shortcuts].map((shortcut) => shortcut.toUpperCase())
              : shortcuts;

            if (keyLogs?.[shifted[0]] && event.key === shifted[1]) {
              fn();
            }
            return;
          }

          if ((shift ? shortcuts.toUpperCase() : shortcuts) === event.key) {
            fn();
          }
          keyLogs[event.key] = true;
        }

        if (event.type === "keyup") {
          delete keyLogs[event.key];
        }
      });
    };

    events.forEach((name) =>
      window.addEventListener(name as keyof WindowEventMap, (event) =>
        listener(event as KeyboardEvent)
      )
    );

    return () => {
      events.forEach((name) =>
        window.removeEventListener(name as keyof WindowEventMap, (event) =>
          listener(event as KeyboardEvent)
        )
      );
    };
  }, [config]);

  return create;
};

export { useShortcut };
