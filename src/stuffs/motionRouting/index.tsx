import { ComponentType, createContext, useContext } from "react";

type IncludeState<U> = {
  [K in keyof U]: NonNullable<U>[K];
};

type DynamicState<T extends any> = T extends object ? IncludeState<T> : any;

type DynamicContext<T extends any> = {
  key: string;
  state?: DynamicState<T>;
};

type UseInDynamicContext<T> = {
  inDynamicContext: boolean;
  state: DynamicState<T>;
};

const Context = createContext<DynamicContext<any>>({
  key: "",
  state: () => null,
});

export const withDynamicContext =
  <P extends object = {}>(Component: ComponentType<P>) =>
  <State extends any = any>(key: string, state?: DynamicState<State>) =>
  (props: P) =>
    (
      <Context.Provider value={{ key, state }}>
        <Component {...props} />
      </Context.Provider>
    );

export const useInDynamicContext = <T extends any = any>(
  contextKey: string
): UseInDynamicContext<T> => {
  const { key, state } = useContext(Context);

  const inDynamicContext = !key ? false : contextKey.trim() === key.trim();

  return {
    inDynamicContext,
    state,
  };
};
