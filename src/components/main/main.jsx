import style from './main.module.scss';

import {
  useThemeMode,
  posableThemeModes,
} from '../../context/themeModeProvider';
import { useState, useEffect } from 'react';
import {
  useProductsActions,
  useProductsStat,
} from '../../context/productsProvider';

const Main = () => {
  const { themeMode } = useThemeMode();
  const [isDark, setIsDark] = useState(false);

  const products = useProductsStat();
  const dispatch = useProductsActions();

  useEffect(() => {
    if (themeMode === posableThemeModes.DARK) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [themeMode]);

  useEffect(() => {
    dispatch({ type: 'refresh' });
  }, []);

  console.log(products);

  return (
    <main
      className={`${style.mainTag} ${isDark ? style.bgDark : style.bgLight}`}
    ></main>
  );
};

export default Main;
