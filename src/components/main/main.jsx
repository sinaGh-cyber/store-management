import style from './main.module.scss';

import {
  useThemeMode,
  posableThemeModes,
} from '../../context/themeModeProvider';
import { useState, useEffect } from 'react';

const Main = () => {
  const { themeMode } = useThemeMode();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (themeMode === posableThemeModes.DARK) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [themeMode]);

  return (
    <main
      className={`${style.mainTag} ${isDark ? style.bgDark : style.bgLight}`}
    ></main>
  );
};

export default Main;
