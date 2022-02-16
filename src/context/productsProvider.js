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

let productsClone = [];

const reduce = async (stat, { type, id }) => {
  switch (type) {
    case 'refresh': {
      let receivedProducts;
      try {
        receivedProducts = await getAllProductsAPI();
        receivedProducts = await receivedProducts.data;
        productsClone = [...receivedProducts];
      } catch (err) {
        throw err;
      } finally {
        return receivedProducts;
      }
    }

    case 'increase': {
      let res;
      const currentProductIndex = productsClone.findIndex(
        (product) => product.id === id
      );
      try {
        productsClone[currentProductIndex].quantity++;
        res = await putProductApi(id, productsClone[currentProductIndex]);
      } catch (err) {
        throw err;
      } finally {
        if (res.status < 300 && res.status > 199) {
          return productsClone;
        } else {
          productsClone[currentProductIndex].quantity--;
          return stat;
        }
      }
    }
    case 'decrease': {
      let res;
      const currentProductIndex = productsClone.findIndex(
        (product) => product.id === id
      );
      try {
        productsClone[currentProductIndex].quantity--;
        res = await putProductApi(id, productsClone[currentProductIndex]);
      } catch (err) {
        throw err;
      } finally {
        if (res.status < 300 && res.status > 199) {
          return productsClone;
        } else {
          productsClone[currentProductIndex].quantity++;

          return stat;
        }
      }
    }
    case 'delete': {
      try {
        const res = await deleteProductApi(id);

        if (res.status < 300 && res.status > 199) {
          productsClone = productsClone.filter(
            (product) => product.id !== id
          );
        }
      } catch (err) {
        throw err;
      } finally {
        return productsClone;
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
