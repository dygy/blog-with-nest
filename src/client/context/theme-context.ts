import { createContext } from 'react';

declare type contextType = {
  theme: string;
  setTheme: (theme: string) => void;
};
export const ThemeContext = createContext<contextType>({
  theme: '',
  setTheme: (theme: string) => {},
});
