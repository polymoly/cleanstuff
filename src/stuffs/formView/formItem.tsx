import { cloneElement, useContext, useEffect, useRef } from "react";
import { RefsContext } from ".";

interface FormItemProps {
  children: JSX.Element;
  readonly onAddRef?: (ref: React.RefObject<HTMLInputElement>) => void;
  readonly index?: number;
  readonly onSubmit?: (e?: React.FormEvent<HTMLFormElement>) => void;
}

export const FormItem = ({
  children,
  onAddRef,
  onSubmit,
  index = 0,
}: FormItemProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const refs = useContext(RefsContext);

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
          children.props.onBlur?.();
          onSubmit?.();
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
