import style from './productsList.module.scss';

import { useThemeMode } from '../../context/themeModeProvider';
import { posableThemeModes } from '../../context/themeModeProvider';

import { useEffect, useState } from 'react';

import {
  useProductsActions,
  useProductsStat,
} from '../../context/productsProvider';

const ProductsList = () => {
    // Theme mode Stat management
  const { themeMode } = useThemeMode();
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (themeMode === posableThemeModes.DARK) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [themeMode]);

//   products Stat management
  const dispatch = useProductsActions();
  const products = useProductsStat();

  useEffect(() => {
    dispatch({ type: 'refresh' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section
        className={`${style.productsList} ${
          isDark ? style.bgDark : style.bgLight
        }`}
      >
        {!products.length && (
          <div className={style.noProducts}>go to shoppings</div>
        )}
      </section>
    </>
  );
};

export default ProductsList;
