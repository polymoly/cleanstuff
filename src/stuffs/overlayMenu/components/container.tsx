import React, { ForwardedRef, forwardRef, HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

const Container = forwardRef(
  (
    { children, onClick, onContextMenu, ...rest }: ContainerProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const onClickContainer = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      e.preventDefault();
      onClick?.(e);
    };

    const onContextContainer = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      e.preventDefault();
      onContextMenu?.(e);
    };

    return (
      <div
        ref={ref}
        onClick={onClickContainer}
        onContextMenu={onContextContainer}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export { Container };
