import {
  ReactElement,
  Children,
  createContext,
  useContext,
  useState,
} from "react";

type Entry<T extends string> = Record<T, string | number>;

type EntryTrigger<T extends string> = (values: Entry<T>) => void;

type Entries<T extends string = string> = {
  internalValues?: Entry<T>;
  internalOnChange?: EntryTrigger<T>;
};

const InputContext = createContext<Entries>({});

interface InputProps<N extends string> {
  name: N;
}

interface GroupProps<N extends string> {
  children: ReactElement<InputProps<N>>[];
  values?: Entry<N>;
  onChange?: EntryTrigger<N>;
}

const Input = <N extends string>({ name }: InputProps<N>) => {
  const { internalOnChange, internalValues } = useContext(InputContext);

  return (
    <input
      name={name}
      value={internalValues?.[name]}
      onChange={(e) =>
        internalOnChange?.({ ...internalValues, [name]: e.target.value })
      }
    />
  );
};

const Group = <N extends string>({ children, onChange }: GroupProps<N>) => {
  const [internalValues, setInternalValues] = useState<Entry<N>>();

  const internalOnChange = (entries: Entry<N>) => {
    onChange?.(entries);
    setInternalValues(entries);
  };

  return (
    <InputContext.Provider
      value={{ internalOnChange, internalValues: internalValues }}
    >
      {Children.map(children, ({ props }) => (
        <Input name={props.name} key={props.name} />
      ))}
    </InputContext.Provider>
  );
};

Input.Group = Group;

export { Input };
