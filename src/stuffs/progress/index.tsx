import { Tabs, TabsProps } from "antd";
import { Children } from "react";

const { TabPane } = Tabs;

export const Tabbar = ({ children }: TabsProps) => {
  return (
    <div>
      {Children.map(children, (child) => (
        <TabPane>{child}</TabPane>
      ))}
    </div>
  );
};
