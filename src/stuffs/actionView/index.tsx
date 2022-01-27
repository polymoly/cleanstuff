import classNames from "classnames";
import { View, ViewProps } from "reactjs-view";
import { useInteractions } from "reactjs-view-core";
import { withObserve } from "../responsive/withObserve";

type Interactions = {
  whenHovered?: string;
  whenActive?: string;
};

interface ActionViewProps extends ViewProps {
  interactions?: Interactions;
}

const ActionView = ({
  children,
  interactions,
  className,
  ...rest
}: ActionViewProps) => {
  const { eventHandlers, isActive, isHovered } = useInteractions();

  return (
    <View
      {...rest}
      {...eventHandlers()}
      className={classNames(
        className,
        isHovered &&
          (!interactions?.whenActive ? true : !isActive) &&
          interactions?.whenHovered,
        isActive && interactions?.whenActive
      )}
    >
      {children}
    </View>
  );
};

export default ActionView;