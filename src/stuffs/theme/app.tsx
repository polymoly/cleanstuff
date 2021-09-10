import { ProvidersList } from "react-principal";
import { StoreThemeProvider } from ".";

const providers = [StoreThemeProvider];

export const App = ({ children }: any) => {
  return <ProvidersList {...{ providers }}>{children}</ProvidersList>;
};
