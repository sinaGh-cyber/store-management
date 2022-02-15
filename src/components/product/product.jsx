import style from './product.module.scss';

import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';

import { useProductsActions } from '../../context/productsProvider';

const Product = ({ isDark, product }) => {
  // conditional inline styling for decreaseBtn
  const decreaseBtnStyle =
    product.quantity > 1 && !isDark ? {} : { color: 'red' };

  const dispatch = useProductsActions();

  return (
    <div
      className={`${style.product} ${isDark ? style.bgDark : style.bgLight}`}
    >
      <div className={style.productInfo}>
        <p className={style.productName}>Product name: {product.title} </p>
        <p className={style.productPrice}>price: {product.price}</p>
        <span className={style.productQuantity}>{product.quantity}</span>
      </div>
      <div className={style.productManagement}>
        <button
          className={`${style.decrease} ${
            product.quantity <= 1 ? style.toBeDeleted : null
          }`}
        >
          {product.quantity > 1 ? <AiOutlineMinus /> : <AiFillDelete />}
        </button>
        <button className={style.increase}>
          {' '}
          <AiOutlinePlus />{' '}
        </button>
        <button className={style.delete}>Delete</button>
      </div>
    </div>
  );
};

export default Product;
