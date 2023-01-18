import classNames from 'classnames';
import style from './AwesomeInput.module.scss';
import React from 'react';

declare type props = {
  placeholder: string;
  moreClassNames?: string;
  onChange?: () => void;
};
export default React.forwardRef(
  ({ placeholder, moreClassNames, onChange }: props, ref) => (
    <input
      ref={ref as React.MutableRefObject<HTMLInputElement>}
      onChange={onChange}
      placeholder={placeholder}
      className={classNames(style.input, moreClassNames)}
    />
  ),
);
