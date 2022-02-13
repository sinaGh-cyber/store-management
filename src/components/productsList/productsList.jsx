import style from './productsList.module.scss';

import { useThemeMode } from '../../context/themeModeProvider';
import { posableThemeModes } from '../../context/themeModeProvider';

import { useEffect, useState } from 'react';

import { useProductsActions } from '../../context/productsProvider';

const ProductsList = () => {
  const { themeMode } = useThemeMode();
  const [isDark, setIsDark] = useState(false);

  const dispatch = useProductsActions();

  useEffect(() => {
    if (themeMode === posableThemeModes.DARK) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [themeMode]);

  return (
    <>
      <section
        className={`${style.productsList} ${
          isDark ? style.bgDark : style.bgLight
        }`}
      ></section>
    </>
  );
};

export default ProductsList;
