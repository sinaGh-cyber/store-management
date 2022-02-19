import style from './productsList.module.scss';

import WithTheme from '../../hoc/withTheme/withTheme';

import Product from '../product/product';

import { useEffect } from 'react';

import {
  useProductsActions,
  useProductsStat,
} from '../../context/productsProvider';

const ProductsList = ({isDark}) => {

  //   products State management
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
        {!!products[products.currentMode].length && (
          <div className={style.ListLength}>
            All: <span>{products[products.currentMode].length}</span>{' '}
          </div>
        )}

        {!products[products.currentMode].length && (
          <div className={style.noProducts}>go to shoppings</div>
        )}
        {!!products[products.currentMode].length &&
          products[products.currentMode].map((product) => {
            return (
              <Product key={product.id} product={product} />
            );
          })}
      </section>
    </>
  );
};

export default WithTheme(ProductsList);
