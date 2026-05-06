import { createContext } from "react";

export const ThemeContext = createContext({
  themeMode: "light",
  toggleTheme: () => {},
});

export const ThemeContextProvider = ThemeContext.Provider;
