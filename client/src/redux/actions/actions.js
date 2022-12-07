export const GET_PRODUCTS = 'GET_PRODUCTS';
// <<<<<<< HEAD

// export const getProducts = () => {
//   return function (dispatch) {
//     return fetch('https://supra-sports-default-rtdb.firebaseio.com/.json')
//       .then((response) => response.json())
//       .then((data) => dispatch({ type: GET_PRODUCTS, payload: data }));
//   };
// };
// =======
export const SEARCHxNAME = 'SEARCHxNAME';

// export const getProducts = () => {

//     return{ type: GET_PRODUCTS ,
//             payload:  Productos
//         }
// };

export const getProducts = () => {
  return function (dispatch) {
    return fetch('https://supra-sports-default-rtdb.firebaseio.com/.json')
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_PRODUCTS, payload: data }));
  };
};

export const searchXname = (name) => {
  return { type: SEARCHxNAME, payload: name };
};
// >>>>>>> development
