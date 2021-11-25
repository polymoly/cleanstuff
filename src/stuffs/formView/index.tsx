import { createContext, RefObject, useState } from "react";
import { FormProvider, FormProviderProps } from "react-hook-form";

type RecordRefs = Record<number, RefObject<HTMLInputElement>>;

type FormContextType = {
  refs: RecordRefs;
  storeRef: (ref: RefObject<HTMLInputElement>, index: number) => void;
  submit: (e?: React.FormEvent<HTMLFormElement>) => void;
};

const initialContext: FormContextType = {
  refs: [],
  storeRef: () => {},
  submit: () => {},
};

export const RefsContext = createContext<FormContextType>(initialContext);

interface FormControlledProviderProps extends FormProviderProps {
  onSubmit?: (e?: React.FormEvent<HTMLFormElement>) => void;
}

export const FormControlledProvider = ({
  onSubmit,
  children,
  ...methods
}: FormControlledProviderProps) => {
  const [refs, setRefs] = useState<RecordRefs>({});

  const storeRef = (ref: RefObject<HTMLInputElement>, index: number) => {
    setRefs((prev) => ({ ...prev, [index]: ref }));
  };

  const submit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <FormProvider {...methods}>
      <RefsContext.Provider value={{ storeRef, refs, submit }}>
        <form style={{ display: "flex", flex: 1 }} onSubmit={submit}>
          {children}
        </form>
      </RefsContext.Provider>
    </FormProvider>
  );
};
