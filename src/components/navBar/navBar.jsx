import style from './navbar.module.scss';

import WithTheme from '../../hoc/withTheme/withTheme';

import { FiRefreshCw } from 'react-icons/fi';
import { AiFillBulb } from 'react-icons/ai';
import { AiOutlineBulb } from 'react-icons/ai';

import { useProductsActions } from '../../context/productsProvider';

const Navbar = ({ isDark, themeModeToggler }) => {
  // products context
  const dispatch = useProductsActions();

  // handlers

  const OnToggleThemeModeBtnClickHandler = () => {
    themeModeToggler();
  };

  return (
    <nav className={`${style.navTag} ${isDark ? style.bgDark : style.bgLight}`}>
      <header className={style.headerTag}>Product Management</header>

      <section className={style.buttonGroup}>
        <button
          className={style.NavbarRefreshBtn}
          onClick={() => {
            dispatch({ type: 'refresh' });
          }}
        >
          {' '}
          <FiRefreshCw id={style.FiRefreshCw} />{' '}
        </button>

        <button
          onClick={OnToggleThemeModeBtnClickHandler}
          className={style.toggleThemeModeBtn}
        >
          {isDark ? <AiOutlineBulb /> : <AiFillBulb />}
        </button>
      </section>
    </nav>
  );
};

export default WithTheme(Navbar);
