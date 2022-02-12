import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from 'react';
import { getAllProductsAPI } from '../services/api/index';

const productsContext = createContext(undefined);
const productsContextDispatcher = createContext(undefined);

let availableProducts;

const reduce = async (stat, { type, id }) => {
  switch (type) {
    case 'refresh': {
      let products = await getAllProductsAPI();
      products = await products.data;
      availableProducts = [...products];
      return products;
    }
    default: {
      throw Error('there is no product in list');
    }
  }
};
const initData = 0;

const ProductsProvider = ({ children }) => {
  const [products, dispatch] = useReducer(reduce, initData);
  const [extractedProductsArray, setExtractedProductsArray] = useState(false);

  useEffect(() => {
    products &&
      products.then((data) => {
        const Array = data.map((product) => {
          return product;
        });
        setExtractedProductsArray(Array);
      });
  }, [products]);

  return (
    <productsContext.Provider value={extractedProductsArray}>
      <productsContextDispatcher.Provider value={dispatch}>
        {children}
      </productsContextDispatcher.Provider>
    </productsContext.Provider>
  );
};

const useProductsStat = () => {
  const provider = useContext(productsContext);
  if (provider !== undefined) return provider;
  throw Error('ProductsProvider Context issue');
};

const useProductsActions = () => {
  const provider = useContext(productsContextDispatcher);
  if (provider !== undefined) return provider;
  throw Error('productsContextDispatcher issue');
};

export default ProductsProvider;

export { useProductsActions, useProductsStat };
