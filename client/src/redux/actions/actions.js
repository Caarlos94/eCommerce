export const GET_PRODUCTS = 'GET_PRODUCTS';

export const getProducts = () => {
  return function (dispatch) {
    return fetch('https://supra-sports-default-rtdb.firebaseio.com/.json')
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_PRODUCTS, payload: data }));
  };
};
