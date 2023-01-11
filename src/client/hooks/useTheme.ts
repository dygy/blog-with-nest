import { Dispatch, SetStateAction, useEffect, useState } from 'react';
type themeType = 'dark' | 'light' | null;
export const themes: {
  dark: themeType;
  light: themeType;
} = {
  dark: 'dark',
  light: 'light',
};

export default () => {
  const [theme, setTheme]: [themeType, Dispatch<SetStateAction<themeType>>] =
    useState(themes.light);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme as themeType);
    }
  }, []);

  return {
    theme,
    toggleTheme,
  };
};
