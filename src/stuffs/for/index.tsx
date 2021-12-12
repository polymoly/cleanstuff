import { Fragment, Key, ReactNode } from "react";

interface ForProps<S> {
  list: S[];
  primary?: keyof S;
  children: ReactNode | ((data: S, index: number) => ReactNode);
}

export function For<S extends any = {}>({
  list,
  children,
  primary,
}: ForProps<S>) {
  return (
    <Fragment>
      {list.map((data, index) => (
        <Fragment
          key={(primary && data[primary] ? data[primary] : index) as Key}
        >
          {typeof children === "function" ? children(data, index) : children}
        </Fragment>
      ))}
    </Fragment>
  );
}
