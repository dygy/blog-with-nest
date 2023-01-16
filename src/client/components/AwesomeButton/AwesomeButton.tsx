import classNames from 'classnames';
import style from './AwesomeButton.module.scss';

declare type props = {
  label: string;
  moreClassNames?: string;
  onClick: () => void;
};
export default ({ label, moreClassNames, onClick }: props) => (
  <button
    onClick={onClick}
    className={classNames(style.addButton, moreClassNames)}
  >
    {label}
  </button>
);
