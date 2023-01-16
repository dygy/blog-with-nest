import style from './Switch.module.scss';

declare type props = {
  checked: boolean;
  onChange: () => void;
  wrapperClassnames: string;
};
export default ({ checked, onChange, wrapperClassnames }: props) => (
  <div className={wrapperClassnames}>
    <input
      className={style.toggleBtnInput}
      type="checkbox"
      name="checkbox"
      onChange={onChange}
      checked={checked}
    />
    <button
      type="button"
      className={style.toggleBtnInputLabel}
      onClick={onChange}
    ></button>
  </div>
);
