import { ReactNode, Children, ReactElement, Key } from "react";

type Entity<T> = {
  [P in keyof T]-?: T[P] extends keyof T ? keyof T : T;
};

export interface ColumnProps<T> {
  name: keyof Entity<T>;
  dataIndex?: string;
  render?: (value: T[keyof T], records: T) => ReactNode;
}

interface TableProps<T> {
  dataSource: T[];
  children: ReactElement<ColumnProps<T>> | ReactElement<ColumnProps<T>>[];
}

export function Table<T extends { key: string }>({
  dataSource,
  children,
}: TableProps<T>) {
  const s = Children.map(children, ({ props: { name } }) => {
    return (
      dataSource.find((entry) =>
        Object.keys(entry).some((key) => key === name)
      ) && <th key={name as Key}>{name}</th>
    );
  });
  return (
    <table style={{ width: 500 }}>
      <thead>
        <tr>{s}</tr>
      </thead>
      <tbody>
        {dataSource.map((entry) => (
          <tr key={entry.key}>
            {Children.map(children, ({ props: { name, render } }) => (
              <td key={name as Key}>
                {render ? render(entry[name], entry) : entry[name]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
