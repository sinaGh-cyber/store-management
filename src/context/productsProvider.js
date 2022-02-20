import { createContext, useContext, useReducer } from 'react';
import {
  getAllProductsAPI,
  putProductApi,
  deleteProductApi,
} from '../services/api/index';
import _ from 'lodash';

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

    case 'filter':
      return data;

    case 'sort':
      return data;

    case 'search':
      return data;

    default: {
      throw Error('unknown action in reducer');
    }
  }
};

const ProductsProvider = ({ children }) => {
  const initData = {
    filtered: [],
    unfiltered: [],
    searched: [],
    currentMode: 'unfiltered',
  };
  const [products, dispatch] = useReducer(reduce, initData);

  const asyncDispatch = ({ type, id, data }) => {
    switch (type) {
      case 'refresh': {
        getAllProductsAPI()
          .then((res) => {
            const productsClone = { ...products };
            productsClone.unfiltered = res.data;
            productsClone.filtered = res.data;
            productsClone.searched = res.data;
            productsClone.currentMode = 'unfiltered';
            dispatch({ type: type, data: productsClone });
          })
          .catch((err) => {
            throw err;
          });
        return true;
      }

      case 'increase': {
        const productsClone = { ...products };
        const currentUnfilteredProductIndex =
          productsClone.unfiltered.findIndex((product) => product.id === id);

        const currentSearchedProductIndex = productsClone.searched.findIndex(
          (product) => product.id === id
        );

        const currentFilteredProductIndex = productsClone.filtered.findIndex(
          (product) => product.id === id
        );
        const currentProductClone = {
          ...productsClone.unfiltered[currentUnfilteredProductIndex],
        };
        currentProductClone.quantity++;
        putProductApi(id, currentProductClone)
          .then((res) => {
            if (res.status < 300 && res.status > 199) {
              productsClone.unfiltered[currentUnfilteredProductIndex] =
                currentProductClone;

              productsClone.filtered[currentFilteredProductIndex] =
                currentProductClone;

              productsClone.searched[currentSearchedProductIndex] =
                currentProductClone;

              dispatch({ type: type, data: productsClone });
            }
          })
          .catch((err) => {
            throw err;
          });

        return true;
      }

      case 'decrease': {
        const productsClone = { ...products };
        const currentUnfilteredProductIndex =
          productsClone.unfiltered.findIndex((product) => product.id === id);

        const currentSearchedProductIndex = productsClone.searched.findIndex(
          (product) => product.id === id
        );

        const currentFilteredProductIndex = productsClone.filtered.findIndex(
          (product) => product.id === id
        );
        const currentProductClone = {
          ...productsClone.unfiltered[currentUnfilteredProductIndex],
        };
        currentProductClone.quantity--;
        putProductApi(id, currentProductClone)
          .then((res) => {
            if (res.status < 300 && res.status > 199) {
              productsClone.unfiltered[currentUnfilteredProductIndex] =
                currentProductClone;
              productsClone.filtered[currentFilteredProductIndex] =
                currentProductClone;
              productsClone.searched[currentSearchedProductIndex] =
                currentProductClone;
              dispatch({ type: type, data: productsClone });
            }
          })
          .catch((err) => {
            throw err;
          });

        return true;
      }

      case 'delete': {
        const productsClone = { ...products };
        deleteProductApi(id)
          .then((res) => {
            if (res.status < 300 && res.status > 199) {
              const newUnfilteredProductsArray = products.unfiltered.filter(
                (product) => {
                  return product.id !== id;
                }
              );
              const newFilteredProductsArray = products.filtered.filter(
                (product) => {
                  return product.id !== id;
                }
              );
              const newSearchedProductsArray = products.searched.filter(
                (product) => {
                  return product.id !== id;
                }
              );

              productsClone.unfiltered = newUnfilteredProductsArray;
              productsClone.filtered = newFilteredProductsArray;
              productsClone.searched = newSearchedProductsArray;
              dispatch({ type, data: productsClone });
            }
          })
          .catch((error) => {
            throw error;
          });
        return true;
      }

      case 'filter': {
        const productsClone = { ...products };
        productsClone.filtered = products.unfiltered;
        if (!data.filterVal) {
          productsClone.currentMode = 'unfiltered';
        } else {
          productsClone.currentMode = 'filtered';
          productsClone.filtered = productsClone.unfiltered.filter(
            (product) => {
              return product.availableSizes.indexOf(data.filterVal) !== -1;
            }
          );
        }

        if (data.sortVal === 'lowest') {
          productsClone.unfiltered = _.orderBy(
            productsClone.unfiltered,
            ['price'],
            ['asc']
          );
          productsClone.filtered = _.orderBy(
            productsClone.filtered,
            ['price'],
            ['asc']
          );
          productsClone.searched = _.orderBy(
            productsClone.searched,
            ['price'],
            ['asc']
          );
        } else {
          productsClone.unfiltered = _.orderBy(
            productsClone.unfiltered,
            ['price'],
            ['desc']
          );
          productsClone.filtered = _.orderBy(
            productsClone.filtered,
            ['price'],
            ['desc']
          );
          productsClone.searched = _.orderBy(
            productsClone.searched,
            ['price'],
            ['desc']
          );
        }

        dispatch({ type, data: productsClone });

        return true;
      }
      case 'sort': {
        let productsClone = { ...products };
        if (data === 'lowest') {
          productsClone.unfiltered = _.orderBy(
            productsClone.unfiltered,
            ['price'],
            ['asc']
          );
          productsClone.filtered = _.orderBy(
            productsClone.filtered,
            ['price'],
            ['asc']
          );
          productsClone.searched = _.orderBy(
            productsClone.searched,
            ['price'],
            ['asc']
          );
        } else {
          productsClone.unfiltered = _.orderBy(
            productsClone.unfiltered,
            ['price'],
            ['desc']
          );
          productsClone.filtered = _.orderBy(
            productsClone.filtered,
            ['price'],
            ['desc']
          );
          productsClone.searched = _.orderBy(
            productsClone.searched,
            ['price'],
            ['desc']
          );
        }
        dispatch({ type, data: productsClone });
        return true;
      }

      case 'search': {
        const productsClone = { ...products };
        if (data === '') {
          return true;
        } else {
          const filteredProducts = products.filtered.filter((product) =>
            product.title.toLowerCase().includes(data.toLowerCase())
          );
          productsClone.searched = filteredProducts;
          productsClone.currentMode = 'searched';
          dispatch({ type, data: productsClone });
          return true;
        }
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
