import classNames from "classnames";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { View, Text } from "reactjs-view";
import { Step, StepProps } from "..";
import useStyles from "./style";

type StepItemConfig = Step & StepProps;

interface StepItemProps extends StepItemConfig {
  stepIndex?: number;
  current?: number;
  index?: number;
  dataLength?: number;
  setSpace?: Dispatch<SetStateAction<number>>;
}

export const StepItem = ({
  title,
  stepIndex,
  checkFinishedStep,
  loadingProgressStep,
  tailOffset = 0,
  titleColor,
  titleSize,
  iconTextColor,
  current = 0,
  index = 0,
  dataLength = 0,
  itemRender,
  setSpace,
  animated,
  ...rest
}: StepItemProps) => {
  const classes = useStyles(rest);
  const [stepWidth, setStepWidth] = useState<number>(0);

  const isLast = useMemo(() => {
    return dataLength - 1 === index;
  }, [dataLength, index]);

  const controlledCurrent = useMemo(() => {
    if (current < 0) {
      return 0;
    }
    if (current > dataLength - 1) {
      return index + 1;
    }
    return current;
  }, [current, dataLength, index]);

  const StepContent = (
    <>
      <View
        className={classNames(
          classes["step-item-icon"],
          controlledCurrent >= index && classes["active-icon"],
          animated && classes["animated"]
        )}
      >
        {controlledCurrent >= index && checkFinishedStep ? (
          <span>&times;</span>
        ) : (
          <Text size={14} theme="regular" color={iconTextColor || "#000"}>
            {stepIndex}
          </Text>
        )}
      </View>
      <View
        className={classes["step-item-title"]}
        onLayout={({
          nativeEvent: {
            layout: { height },
          },
        }) => setSpace?.(height)}
      >
        <Text
          className={classes["step-item-text"]}
          size={titleSize || 14}
          numberOfLines={2}
          color={titleColor || "#000"}
          style={{ marginInline: 4 }}
        >
          {title}
        </Text>
      </View>
    </>
  );

  return (
    <View
      className={classNames(classes["step-item"], isLast && classes["isLast"])}
      onLayout={({
        nativeEvent: {
          layout: { width },
        },
      }) => setStepWidth(width)}
    >
      <View className={classes["step-item-container"]}>
        {itemRender ? itemRender(StepContent, current, index) : StepContent}

        {!isLast && (
          <View
            className={classNames(
              classes["step-item-tail"],
              controlledCurrent >= index + 1 && classes["active-tail"],
              animated && classes["animated-tail"]
            )}
            style={{
              width: stepWidth - (66 + tailOffset * 2),
              insetInline: 50 + tailOffset,
            }}
          />
        )}
      </View>
    </View>
  );
};
