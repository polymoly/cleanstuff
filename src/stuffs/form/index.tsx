import { createContext, useContext } from "react";
import { useForm, FormProvider, useWatch, Control } from "react-hook-form";

const Context = createContext<Control<Types, object>>({} as any);

export const HeaderProvider = ({ children }: any) => {
  const methods = useForm<Types>({
    defaultValues: defaultValues,
    mode: "onChange",
  });

  return (
    <Context.Provider value={methods.control}>
      <FormProvider {...methods}>{children}</FormProvider>
    </Context.Provider>
  );
};

export const useHeaderFormWatch = (): Types => {
  const control = useContext(Context);
  const headerFormReturn = useWatch({ control }) as Types;
  return headerFormReturn;
};

const defaultValues: Types = {
  type: undefined,
};

export interface Types {
  type?: string;
}
