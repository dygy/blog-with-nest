import React from 'react';
import * as style from './Background.module.scss';

declare type backgroundProps = {
  children: React.ReactNode;
};
export default ({ children }: backgroundProps) => {
  return <div className={style.background}>{children}</div>;
};
