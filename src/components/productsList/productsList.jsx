import style from './productsList.module.scss';

import WithTheme from '../../hoc/withTheme/withTheme';

import Product from '../product/product';

import { useEffect, useState } from 'react';

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
        {!!products.length && (
          <div className={style.ListLength}>
            All: <span>{products.length}</span>{' '}
          </div>
        )}

        {!products.length && (
          <div className={style.noProducts}>go to shoppings</div>
        )}
        {!!products.length &&
          products.map((product) => {
            return (
              <Product key={product.id} product={product} />
            );
          })}
      </section>
    </>
  );
};

export default WithTheme(ProductsList);
