import style from './navbar.module.scss';

import { FiRefreshCw } from 'react-icons/fi';
import { AiFillBulb } from 'react-icons/ai';
import { AiOutlineBulb } from 'react-icons/ai';


const Navbar = () => {
  return (
    <nav className={style.navTag}>
      <header className={style.headerTag}></header>

      <section className={style.buttonGroup}>
        <button className={style.NavbarRefreshBtn}>
          {' '}
          <FiRefreshCw id={style.FiRefreshCw} />{' '}
        </button>

        <button className={style.toggleThemeMode}></button>
      </section>
    </nav>
  );
};

export default Navbar;
