import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { getAllProductsAPI } from '../services/api/index';

const productsContext = createContext(undefined);
const productsContextDispatcher = createContext(undefined);

const reduce = async (stat, { type, id }) => {
  if (type === 'refresh') {
    let products = await getAllProductsAPI();
    products = await products.data;
    return products;
  } else {
    return { result: 'there is no product in list' };
  }
};
const initData = {};

const ProductsProvider = ({ children }) => {
  const [products, dispatch] = useReducer(reduce, initData);

  return (
    <productsContext.Provider value={products}>
      <productsContextDispatcher.Provider value={dispatch}>
        {children}
      </productsContextDispatcher.Provider>
    </productsContext.Provider>
  );
};

const useProductsStat = () => {
  const provider = useContext(productsContext);
  if (provider) return provider;
  throw Error('ProductsProvider Context issue');
};

const useProductsActions = () => {
  const provider = useContext(productsContextDispatcher);
  if (provider) return provider;
  throw Error('productsContextDispatcher issue');
};

export default ProductsProvider;

export { useProductsActions, useProductsStat };