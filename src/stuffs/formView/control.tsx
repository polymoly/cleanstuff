import { cloneElement, useContext, useEffect, useRef } from "react";
import { Controller, ControllerProps } from "react-hook-form";
import { RefsContext } from ".";

interface ControlProps extends Omit<ControllerProps, "render"> {
  children: JSX.Element;
  selfIndex: number | string;
  targetIndex: number | string;
}

export const Control = ({
  children,
  selfIndex,
  targetIndex,
  ...rest
}: ControlProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { refs, storeRef, submit } = useContext(RefsContext);

  useEffect(() => {
    if (!inputRef.current) return;

    storeRef(inputRef, Number(selfIndex));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Controller
      {...rest}
      render={({ field }) =>
        cloneElement<JSX.IntrinsicElements["input"]>(children, {
          ...children.props,
          ...field,
          tabIndex: selfIndex,
          ref: inputRef,
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            children.props.onKeyDown?.(e);
            if (e.key === "Enter") {
              e.preventDefault();
              refs?.[Number(targetIndex)]?.current?.focus();

              if (Object.keys(refs).length <= 1) {
                refs?.[Number(targetIndex)]?.current?.blur();
                submit();
              }
              delete refs?.[Number(targetIndex)];
            }
          },
        })
      }
    />
  );
};
