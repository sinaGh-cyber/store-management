import style from './navbar.module.scss';

import { useThemeMode } from '../../context/themeModeProvider';
import { posableThemeModes } from '../../context/themeModeProvider';

import { FiRefreshCw } from 'react-icons/fi';
import { AiFillBulb } from 'react-icons/ai';
import { AiOutlineBulb } from 'react-icons/ai';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { themeMode, themeModeToggler } = useThemeMode();
  const [isDark, setIsDark] = useState(false);

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
    <nav className={style.navTag}>
      <header className={style.headerTag}></header>

      <section className={style.buttonGroup}>
        <button className={style.NavbarRefreshBtn}>
          {' '}
          <FiRefreshCw id={style.FiRefreshCw} />{' '}
        </button>

        <button
          onClick={OnToggleThemeModeBtnClickHandler}
          className={style.toggleThemeMode}
        >
          {isDark ? <AiFillBulb /> : <AiOutlineBulb />}
        </button>
      </section>
    </nav>
  );
};

export default Navbar;
