import React from 'react';
import * as style from './Background.module.scss';
import useTheme, { themes } from '../../hooks/useTheme';

declare type backgroundProps = {
  children: React.ReactNode;
};
export default ({ children }: backgroundProps) => {
  const { theme } = useTheme();
  return (
    <div
      className={
        theme === themes.dark ? style.backgroundDark : style.background
      }
    >
      {children}
    </div>
  );
};
