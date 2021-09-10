import { TOGGLE_THEME } from "./types";
import { createReducer } from "react-principal";
import { InitialState } from "./initialState";

export default createReducer<InitialState>({
  [TOGGLE_THEME]: (state) => ({
    ...state,
    theme: state.theme === "light" ? "dark" : "light",
  }),
});
