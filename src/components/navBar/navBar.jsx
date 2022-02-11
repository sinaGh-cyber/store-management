import style from './navbar.module.scss';

import { useThemeMode } from '../../context/themeModeProvider';
import { posableThemeModes } from '../../context/themeModeProvider';

import { FiRefreshCw } from 'react-icons/fi';
import { AiFillBulb } from 'react-icons/ai';
import { AiOutlineBulb } from 'react-icons/ai';
import { useEffect, useState } from 'react';

import {
  useProductsActions,
  useProductsStat,
} from '../../context/productsProvider';

const Navbar = () => {
  const { themeMode, themeModeToggler } = useThemeMode();
  const [isDark, setIsDark] = useState(false);

  const products = useProductsStat();
  const dispatch = useProductsActions();

  console.log(products);

  useEffect(() => {
    if (themeMode === posableThemeModes.DARK) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [themeMode]);

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

export default Navbar;
