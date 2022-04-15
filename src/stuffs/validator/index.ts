import { useRef } from "react";

export const useValidator = () => {
  const _valueRef = useRef<number>();

  const validator = (value: number) => {
    _valueRef.current = value;
  };

  const isGreaterThan = (params: number) => {
    if (_valueRef.current === undefined) {
      throw new Error("value is not found");
    }
    return _valueRef.current > params;
  };

  validator.isGreaterThan = isGreaterThan;

  return validator;
};
