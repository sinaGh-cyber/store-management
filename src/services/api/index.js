import Axios from 'axios';

export const getAllProductsAPI = () =>
  Axios.get('http://127.0.0.1:8000/products/');

export const putProductApi = (id, productObj) =>
  Axios.put(`http://127.0.0.1:8000/products/${id}`, productObj);

export const deleteProductApi = (id) =>
  Axios.delete(`http://127.0.0.1:8000/products/${id}`);
