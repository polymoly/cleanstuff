import { ComponentType } from "react";
import {
  FormProvider,
  Controller,
  useForm,
  useWatch,
  FieldValues,
} from "react-hook-form";

type PickFormValues<P> = Pick<P, Exclude<keyof P, "onFormChange">>;

type FormReturn<P> = "onFormChange" extends keyof P ? PickFormValues<P> : P;

type FormEntries = {
  onFormChange: (...value: any[]) => void;
};

type FormProps<P> = FormReturn<P> & FormEntries;

export interface ComponentValue<U> {
  formValue?: U[keyof U];
}

export const useFormValue = <T extends FieldValues>() => {
  return useWatch({}) as ComponentValue<T>;
};

export const withForm = <
  P extends object = {},
  U extends FieldValues = FieldValues
>(
  Component: ComponentType<FormProps<P>>
) => {
  return (props: FormProps<P>) => {
    const methods = useForm<ComponentValue<U>>({
      mode: "onChange",
      defaultValues: undefined,
    });

    return (
      <FormProvider {...methods}>
        <Controller
          control={methods.control}
          name="formValue"
          render={({ field }) => (
            <Component {...props} onFormChange={field.onChange} />
          )}
        />
      </FormProvider>
    );
  };
};
