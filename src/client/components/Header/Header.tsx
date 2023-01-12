import { useCallback, useContext } from 'react';
import classNames from 'classnames';

import { ThemeContext } from '../../context/theme-context';

import style from './Header.module.scss';

declare type props = {
  isLoading: boolean;
};
const Header = ({ isLoading }: props) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = useCallback(() => {
    const isCurrentDark = theme === 'dark';
    setTheme(isCurrentDark ? 'light' : 'dark');
    localStorage.setItem('default-theme', isCurrentDark ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <header className={style.header}>
      <div className={style.headerContent}>
        <a href="/" className={style.logoSection}>
          <img
            src={'https://freepngimg.com/save/9880-batman-logo-png/1600x1044'}
            alt="logo"
          />
          <span>Header</span>
        </a>
        <div className={style.toggleBtnSection}>
          {!isLoading && (
            <div
              className={classNames(style.toggleCheckbox, 'm-vertical-auto')}
            >
              <input
                className={style.toggleBtnInput}
                type="checkbox"
                name="checkbox"
                onChange={handleThemeChange}
                checked={theme === 'light'}
              />
              <button
                type="button"
                className={style.toggleBtnInputLabel}
                onClick={handleThemeChange}
              ></button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
