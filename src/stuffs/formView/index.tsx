import {
  createContext,
  RefObject,
  useState,
  Children,
  cloneElement,
} from "react";

export const RefsContext = createContext<RefObject<HTMLInputElement>[]>([]);

type FormProps = JSX.IntrinsicElements["form"];
interface FormViewProps extends FormProps {
  children: JSX.Element | JSX.Element[];
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const FormView = ({ children, onSubmit, ...rest }: FormViewProps) => {
  const [refs, setRefs] = useState<RefObject<HTMLInputElement>[]>([]);

  const onAddRef = (ref: RefObject<HTMLInputElement>) => {
    setRefs((prev) => [...prev, ref]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <RefsContext.Provider value={refs}>
      <form
        style={{ display: "flex", flex: 1 }}
        onSubmit={handleSubmit}
        {...rest}
      >
        {Children.map(children, (child, index) => {
          const isInput = child.props?.children?.type === "input";
          return isInput
            ? cloneElement(child, {
                ...child.props,
                onAddRef,
                index,
                onSubmit,
              })
            : child;
        })}
      </form>
    </RefsContext.Provider>
  );
};
