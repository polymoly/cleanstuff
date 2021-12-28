import { ReactNode, useEffect, useState } from "react";
import { View } from "reactjs-view";
import { StepItem } from "./stepItem";
import useStyles from "./style";

export type Step = {
  title: string;
};

export type StepProps = {
  iconBackgroundColor?: string;
  iconActiveBackgroundColor?: string;
  iconTextColor?: string;
  titleColor?: string;
  tailTickness?: number;
  tailColor?: string;
  tailOffset?: number;
  checkFinishedStep?: boolean;
  loadingProgressStep?: boolean;
  titleSize?: number;
  animated?: boolean;
  activeColor?: string;
  itemRender?: (
    node?: JSX.Element,
    current?: number,
    index?: number
  ) => ReactNode;
};

export interface StepConfig extends StepProps {
  steps: Step[];
  current: number;
  onChange?: (current: number) => void;
  stepIndex?: number;
}

const Steps = ({
  steps,
  current = 0,
  onChange,
  stepIndex,
  ...rest
}: StepConfig) => {
  const [space, setSpace] = useState<number>(0);
  const classes = useStyles({ space });

  useEffect(() => {
    onChange?.(current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <View className={classes.step}>
      {steps.map(({ title }, index) => (
        <StepItem
          key={index}
          dataLength={steps?.length}
          stepIndex={stepIndex ? stepIndex + index : index + 1}
          index={index}
          current={current}
          {...{ title, setSpace }}
          {...rest}
        />
      ))}
    </View>
  );
};

export default Steps;
