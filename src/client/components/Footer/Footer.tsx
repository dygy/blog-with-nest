import { FC } from 'react';
import style from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footerContent}>
        &copy; {new Date().getFullYear()} <span>Label</span>
      </div>
    </footer>
  );
};

export default Footer;
