import Axios from 'axios';

export const getAllProductsAPI = () =>
  Axios.get('http://127.0.0.1:8000/products/');

