import { ComponentType, useState } from "react";

type TArgs = {
  onChange?: (value?: string) => void;
  value?: string | undefined;
};

type PropsWithoutChange<P> = "onChange" extends keyof P
  ? Pick<P, Exclude<keyof P, "onChange">>
  : P;
type PropsWithoutValue<P> = "value" extends keyof P
  ? Pick<P, Exclude<keyof P, "value">>
  : P;

type PropsWithArgs<P> = PropsWithoutChange<PropsWithoutValue<P>> & TArgs;

export const former = <P extends object = {}>(
  Instance: ComponentType<PropsWithArgs<P>>
) => {
  return (props: P) => {
    const [formValue, setFormValue] = useState<string | undefined>(undefined);

    const onChange = (value?: string) => {
      setFormValue(value);
    };

    return <Instance {...props} value={formValue} onChange={onChange} />;
  };
};
