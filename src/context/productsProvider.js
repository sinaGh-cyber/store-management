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

// this reducer could be just return data in any case but for future scalability I wrote it in this why.
const reduce = (stat, { type, id, data }) => {
  switch (type) {
    case 'refresh':
      return data;

    case 'increase':
      return data;

    case 'decrease':
      return data;

    case 'delete':
      return data;

    default: {
      throw Error('unknown action in reducer');
    }
  }
};

const ProductsProvider = ({ children }) => {
  const initData = [];
  const [products, dispatch] = useReducer(reduce, initData);

  const asyncDispatch = ({ type, id }) => {
    switch (type) {
      case 'refresh': {
        getAllProductsAPI()
          .then((res) => {
            dispatch({ type: type, data: res.data });
          })
          .catch((err) => {
            throw err;
          });
        return;
      }
      case 'increase': {
        const currentProductIndex = products.findIndex(
          (product) => product.id === id
        );
        const currentProductClone = { ...products[currentProductIndex] };
        currentProductClone.quantity++;
        putProductApi(id, currentProductClone)
          .then((res) => {
            if (res.status < 300 && res.status > 199) {
              const productsClone = [...products];
              productsClone[currentProductIndex].quantity++;

              dispatch({ type: type, data: productsClone });
            }
          })
          .catch((err) => {
            throw err;
          });

        return;
      }

      case 'decrease': {
        const currentProductIndex = products.findIndex(
          (product) => product.id === id
        );
        const currentProductClone = { ...products[currentProductIndex] };
        currentProductClone.quantity--;
        putProductApi(id, currentProductClone)
          .then((res) => {
            if (res.status < 300 && res.status > 199) {
              const productsClone = [...products];
              productsClone[currentProductIndex].quantity--;

              dispatch({ type: type, data: productsClone });
            }
          })
          .catch((err) => {
            throw err;
          });

        return;
      }

      case 'delete': {
        deleteProductApi(id)
          .then((res) => {
            if (res.status < 300 && res.status > 199) {
              const newProductsArray = products.filter((product) => {
                return product.id !== id;
              });
              dispatch({ type, data: newProductsArray });
            }
          })
          .catch((error) => {
            throw error;
          });
        return;
      }
      default: {
        throw Error('unknown action in asyncDispatch');
      }
    }
  };

  return (
    <productsContext.Provider value={products}>
      <productsContextDispatcher.Provider value={asyncDispatch}>
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
