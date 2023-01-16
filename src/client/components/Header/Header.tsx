import { useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { ThemeContext } from '../../context/theme-context';

import style from './Header.module.scss';
import AwesomeButton from '../AwesomeButton/AwesomeButton';
import Switch from '../Switch/Switch';

declare type props = {
  isLoading: boolean;
};

const Header = ({ isLoading }: props) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const router = useRouter();

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
          {router.asPath !== '/add' && (
            <AwesomeButton
              onClick={() => {
                router.push('/add');
              }}
              label={'+'}
            />
          )}
          {!isLoading && (
            <Switch
              checked={theme === 'light'}
              onChange={handleThemeChange}
              wrapperClassnames={classNames(
                style.toggleCheckbox,
                'm-vertical-auto',
              )}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
