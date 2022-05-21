import {
  createContext,
  ReactNode,
  useContext,
  useSyncExternalStore,
} from "react";

type Store<T extends any = any> = {
  [P in keyof T]: any;
};
type ExternalStore<T extends any> = {
  getState: () => T;
  setState: (callback: (state: T) => T) => void;
  subscribe: (listener: Function) => () => boolean;
  reducer: ExternalReducer<T>;
};

type Payload<A> = A extends infer R ? R : A;

type Action<SS = any> = {
  type: string;
  payload?: Payload<SS>;
};

type ExternalReducer<State extends any> = (
  state: Store<State>,
  actions: Action
) => State;

interface CreateStoreProps<S extends any> {
  initialState: S;
  reducer: ExternalReducer<S>;
}

export const createStore = <S extends object>({
  initialState,
  reducer,
}: CreateStoreProps<S>): ExternalStore<S> => {
  let _state = initialState;

  const listeners = new Set<Function>();

  const subscribe = <F extends Function>(listener: F) => {
    listeners.add(listener);

    return () => listeners.delete(listener);
  };

  const setState = (callback: (state: S) => S) => {
    const nextState = callback(_state);
    if (_state !== nextState) {
      _state = nextState;
      listeners.forEach((listener) => listener());
    }
  };

  const getState = () => _state;

  return { subscribe, setState, getState, reducer };
};

const ExternalStoreContext = createContext<ExternalStore<Store>>(
  {} as ExternalStore<Store>
);

interface ExternaStoreProviderProps<P extends any> {
  children: ReactNode;
  store: ExternalStore<Store<P>>;
}

export const ExternalStoreProvider = <P extends any>({
  store,
  children,
}: ExternaStoreProviderProps<P>) => {
  return (
    <ExternalStoreContext.Provider value={store as ExternalStore<Store>}>
      {children}
    </ExternalStoreContext.Provider>
  );
};

type A<S, U> = U extends S ? S[keyof S] : S;

export const useSelector = <S extends object, Selected extends unknown>(
  selector: (state: S) => Selected
) => {
  const { getState, subscribe } = useContext(ExternalStoreContext);
  return useSyncExternalStore(subscribe, () => selector(getState()));
};

export const useDispatch = () => {
  const { setState, reducer } = useContext(ExternalStoreContext);

  const dispatch = <S extends any>(action: Action<S>) => {
    setState((state) => reducer(state, action));
  };

  return dispatch;
};
