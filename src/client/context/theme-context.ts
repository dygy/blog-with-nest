import { createContext } from 'react';

export const ThemeContext = createContext({
  theme: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: (theme: string) => {},
});
