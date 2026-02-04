import { createContext } from "react";
import type { InitialState } from "../../types";

const defaultAppState = {
  // ...getFromLocalStorage,
} as InitialState;

const AppStateContext = createContext(defaultAppState);

export default AppStateContext;
