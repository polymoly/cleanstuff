import { createContext, RefObject, useState, Children } from "react";
import { FormItem } from "./formItem";

type FormContextType = {
  refs: RefObject<HTMLInputElement>[];
  onAddRef: (ref: RefObject<HTMLInputElement>) => void;
  submit: (e?: React.FormEvent<HTMLFormElement>) => void;
};

const initialContext: FormContextType = {
  refs: [],
  onAddRef: () => {},
  submit: () => {},
};

export const RefsContext = createContext<FormContextType>(initialContext);

type FormProps = JSX.IntrinsicElements["form"];
interface FormViewProps extends FormProps {
  children: JSX.Element | JSX.Element[];
  onSubmit?: (e?: React.FormEvent<HTMLFormElement>) => void;
}

export const FormView = ({ children, onSubmit, ...rest }: FormViewProps) => {
  const [refs, setRefs] = useState<RefObject<HTMLInputElement>[]>([]);

  const onAddRef = (ref: RefObject<HTMLInputElement>) => {
    setRefs((prev) => [...prev, ref]);
  };

  const submit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <RefsContext.Provider value={{ onAddRef, refs, submit }}>
      <form style={{ display: "flex", flex: 1 }} onSubmit={submit} {...rest}>
        {Children.map(children, (child, index) => (
          <FormItem index={index}>{child}</FormItem>
        ))}
      </form>
    </RefsContext.Provider>
  );
};
