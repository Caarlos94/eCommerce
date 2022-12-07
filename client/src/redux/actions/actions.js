import Productos from '../../info/info.js';
export const GET_PRODUCTS = 'GET_PRODUCTS';

const result = Productos;

export const getProducts = () => {
  return { type: GET_PRODUCTS, payload: result };
};
