import React, {
  Children,
  cloneElement,
  RefObject,
  useState,
  FunctionComponentElement,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  useRef,
  forwardRef,
} from "react";

interface FormViewProps<P> {
  children: FunctionComponentElement<
    DetailedHTMLProps<InputHTMLAttributes<P>, P>
  >[];
}

export const FormView = <P extends HTMLElement>({
  children,
}: FormViewProps<P>) => {
  const _R = useRef<RefObject<P>[]>([]);
  const ref = useRef<P>(null);

  const C = Children.map(children, (child, i) => {
    return cloneElement(child, {
      ...child.props,
      ref,
    });
  });
  console.log(_R);
  return (
    <div>
      {Children.map(C, (_child, _index) => {
        _R.current.push(_child.ref as RefObject<P>);
        if (_child.type.toString() !== "input") return _child;
        return cloneElement(_child, {
          ..._child.props,
          onKeyDown: (e: KeyboardEvent<P>) => {
            _child.props.onKeyDown && _child.props.onKeyDown(e);
            if (e.key === "Enter") {
              _R.current.push(_child.ref as RefObject<P>);

              if (_R.current) _R.current?.[_index].current?.focus();
            }
          },
        });
      })}
    </div>
  );
};
