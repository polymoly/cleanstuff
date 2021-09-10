import { createStore, Provider } from "react-principal";
import reducer from "./reducers";
import { persistKey } from "./enums";
import { initialState, InitialState } from "./initialState";

export const StoreTheme = createStore<InitialState>({
  reducer,
  initialState,
  storage: window.localStorage,
  persistKey: persistKey.THEME,
  mapStateToPersist: (state) => state,
});

export const setStoredtheme = async () => {
  await StoreTheme.setToState();
};

export const StoreThemeProvider = ({ children }: any) => {
  return <Provider store={StoreTheme}>{children}</Provider>;
};
