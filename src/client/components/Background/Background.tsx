import React, { useCallback, useEffect, useState } from 'react';
import * as style from './Background.module.scss';
import Header from '../Header/Header';
import { ThemeContext } from '../../context/theme-context';
import Footer from '../Footer/Footer';

declare type props = {
  children: React.ReactNode;
};
export default ({ children }: props) => {
  const [isLoading, setLoading] = useState(true);
  const isBrowserDefaultDark = useCallback(() => {
    if (typeof window !== 'undefined') {
      return window?.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }, []);

  const getDefaultTheme = useCallback(() => {
    let localStorageTheme = 'light';
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      localStorageTheme = localStorage.getItem('default-theme') || 'light';
    }

    const browserDefault = isBrowserDefaultDark() ? 'dark' : 'light';
    return localStorageTheme || browserDefault;
  }, []);

  const [theme, setTheme] = useState('light');
  useEffect(() => {
    setTheme(getDefaultTheme());
    setLoading(false);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        <Header isLoading={isLoading} />
        <div className={style.background}>{children}</div>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};
