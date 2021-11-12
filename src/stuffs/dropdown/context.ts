import { createContext } from "react";
import { ItemEvents } from "./types";

export const OverlayContext = createContext<Partial<ItemEvents>>([
  () => null,
  () => null,
  () => null,
]);
