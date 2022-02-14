import style from './product.module.scss';

import { useProductsActions } from '../../context/productsProvider';

const Product = ({ isDark, product }) => {
  const dispatch = useProductsActions();

  return (
    <div
      className={`${style.product} ${isDark ? style.bgDark : style.bgLight}`}
    >
      <div className={style.productInfo}>
          <p className={style.productName} >Product name: {product.title} </p>
          <p className={style.productPrice} >price: {product.price}</p>
          <span className={style.productQuantity} >{product.quantity}</span>
      </div>
      <div className={style.productManagement}>
          <button className={style.delete}></button>
          <button className={style.increase}></button>
          <button className={style.decrease}></button>
      </div>
    </div>
  );
};

export default Product;
