import React, { Children, ReactElement, ReactNode } from "react";

interface AreaProps {
  children: ReactNode;
  areaIndex: number;
}

interface RowProps {
  children: ReactElement<AreaProps>[];
}

interface GridSystemProps {
  children: ReactElement<RowProps>[];
}

const GridSystem = ({ children }: GridSystemProps) => {
  const maxAreaCount = Children.map(children, ({ props }) =>
    Children.count(props.children)
  );

  const areas = Children.map(children, ({ props }, index) =>
    Object.values({
      index: props.children,
    })
  );

  console.log({ areas });

  console.log(Math.max(...maxAreaCount));

  return <div>{children}</div>;
};

const Row = (props: RowProps) => {
  return null;
};

const Area = (props: AreaProps) => {
  return null;
};

GridSystem.Row = Row;
GridSystem.Area = Area;

export type { GridSystemProps };
export { GridSystem };
