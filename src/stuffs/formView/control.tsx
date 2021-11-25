import { cloneElement, useContext, useEffect, useRef } from "react";
import { Controller, ControllerProps } from "react-hook-form";
import { RefsContext } from ".";

interface ControlProps extends Omit<ControllerProps, "render"> {
  children: JSX.Element;
  index: number;
  nextIndex: number;
}

export const Control = ({
  children,
  index,
  nextIndex,
  ...rest
}: ControlProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { refs, storeRef, submit } = useContext(RefsContext);

  useEffect(() => {
    if (!inputRef.current) return;

    storeRef(inputRef, index);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Controller
      {...rest}
      render={({ field }) =>
        cloneElement<JSX.IntrinsicElements["input"]>(children, {
          ...children.props,
          ...field,
          tabIndex: index,
          ref: inputRef,
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            children.props.onKeyDown?.(e);
            if (e.key === "Enter") {
              e.preventDefault();
              refs?.[nextIndex]?.current?.focus();

              if (Object.keys(refs).length <= 1) {
                refs?.[nextIndex]?.current?.blur();
                submit();
              }
              delete refs?.[nextIndex];
            }
          },
        })
      }
    />
  );
};
