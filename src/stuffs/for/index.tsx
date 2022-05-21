import { Fragment, Key, ReactNode } from "react";

interface ForProps<S> {
  list: S[];
  identifier?: keyof S;
  children: ReactNode | ((data: S, index: number) => ReactNode);
}

export function For<S extends object = {}>({
  list,
  children,
  identifier,
}: ForProps<S>) {
  const reactKey = (data: S, index: number) => {
    return (identifier && data[identifier] ? data[identifier] : index) as Key;
  };

  return (
    <Fragment>
      {list.map((data, index) => (
        <Fragment key={reactKey(data, index)}>
          {typeof children === "function" ? children(data, index) : children}
        </Fragment>
      ))}
    </Fragment>
  );
}
