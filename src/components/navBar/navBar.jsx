import style from './navbar.module.scss';

import { useThemeMode } from '../../context/themeModeProvider';
import { posableThemeModes } from '../../context/themeModeProvider';

import { FiRefreshCw } from 'react-icons/fi';
import { AiFillBulb } from 'react-icons/ai';
import { AiOutlineBulb } from 'react-icons/ai';
import { useState } from 'react';


const Navbar = () => {

  const {themeMode, themeModeToggler} = useThemeMode();
  const [isDark, setIsDark] = useState(false);

  
  if(themeMode === posableThemeModes.DARK) setIsDark(true);

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
