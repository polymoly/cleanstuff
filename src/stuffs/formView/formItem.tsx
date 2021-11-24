import { cloneElement, useContext, useEffect, useRef } from "react";
import { RefsContext } from ".";

interface FormItemProps {
  children: JSX.Element;
  index: number;
}

export const FormItem = ({ children, index }: FormItemProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { refs, onAddRef, submit } = useContext(RefsContext);

  useEffect(() => {
    if (!inputRef.current) return;

    onAddRef?.(inputRef);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return cloneElement<JSX.IntrinsicElements["input"]>(children, {
    ...children.props,
    ref: inputRef,
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
      children.props.onKeyDown?.(e);
      if (e.key === "Enter") {
        e.preventDefault();
        if (refs.length - 1 === index) {
          refs[index].current?.blur();
          submit?.();
          return;
        }
        refs[index + 1]?.current?.focus();
      }
    },
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      children.props.onSubmit?.(e);
    },
  });
};
