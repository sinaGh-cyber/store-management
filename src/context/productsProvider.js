import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from 'react';
import {
  getAllProductsAPI,
  putProductApi,
  deleteProductApi,
} from '../services/api/index';

const productsContext = createContext(undefined);
const productsContextDispatcher = createContext(undefined);

let availableProducts = [];

const reduce = async (stat, { type, id }) => {
  switch (type) {
    case 'refresh': {
      let receivedProducts;
      try {
        receivedProducts = await getAllProductsAPI();
        receivedProducts = await receivedProducts.data;
        availableProducts = [...receivedProducts];
      } catch (err) {
        throw err;
      } finally {
        return receivedProducts;
      }
    }

    case 'decrease': {
      let res;
      try {
        availableProducts[id - 1].quantity--;
        res = await putProductApi(id, availableProducts[id - 1]);
      } catch (err) {
        throw err;
      } finally {
        if (res.status < 300 && res.status > 199) {
          return availableProducts;
        } else {
          availableProducts[id - 1].quantity++;
          return stat;
        }
      }
    }
    case 'delete': {
      try {
        const res = await deleteProductApi(id);

        if (res.status < 300 && res.status > 199) {
          availableProducts = availableProducts.filter(
            (product) => product.id !== id
          );
        }
      } catch (err) {
        throw err;
      } finally {
        return availableProducts;
      }
    }
    default: {
      throw Error('there is no product in list');
    }
  }
};

const ProductsProvider = ({ children }) => {
  const initData = new Promise((resolve) => {
    resolve([]);
  });
  const [products, dispatch] = useReducer(reduce, initData);
  const [extractedProductsArray, setExtractedProductsArray] = useState([]);

  useEffect(() => {
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
